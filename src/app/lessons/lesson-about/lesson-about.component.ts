import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({

	selector: 'lesson-about',
	templateUrl: 'lesson-about.component.html'
})
export class LessonAboutComponent  implements  OnInit{
	@Input() lesson;
	@Input() currentLang;
	@Output()
	select = new EventEmitter();

	// event emitting method that changes the state in the parent component of lesson-main
	// it gets called from nav buttons that control the in-page navigation
	navSelect(value) {
		this.select.emit(value)
	}
	ngOnInit() {
    setTimeout((console.log(this.lesson)),3000);
  }
}
