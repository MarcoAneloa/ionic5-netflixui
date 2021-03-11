import { Directive, Input, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { DomController, isPlatform } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective {
  @Input('appHideHeader') header: any;
  private headerHeight = isPlatform('ios') ? 44 : 56;
  private children: any;

  constructor(private renderer: Renderer2, private domCtrl: DomController) { }

  ngAfterViewInit(): void {
    this.header = this.header.el;
    this.children = this.header.children;
    console.log('ngAfterViewInit');
    console.log(this.header);
    console.log(this.children);
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    console.log('HostListener');
    const scrollTop: number = $event.detail.scrollTop;
    console.log(scrollTop);
    if (scrollTop < 0) {
      return;
    }

    let newPosition = -scrollTop / 2;
    console.log(newPosition);

    if (newPosition < -this.headerHeight) {
      newPosition = -this.headerHeight;
    }

    console.log(newPosition);

    let newOpacity = 1 - (newPosition / -this.headerHeight);

    console.log(newOpacity);

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.header, 'top', newPosition + 'px');
      for (let c of this.children) {
        this.renderer.setStyle(c, 'opacity', newOpacity);
      }
    });
  }
}
