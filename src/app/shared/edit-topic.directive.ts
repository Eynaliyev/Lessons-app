import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appEditTopic]'
})
export class EditTopicDirective {

  constructor( private elementRef: ElementRef, renderer: Renderer2) {
    renderer.setStyle(this.elementRef, 'background', 'red');
  }

}
