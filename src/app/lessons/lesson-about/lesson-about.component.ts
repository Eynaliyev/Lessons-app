import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	
	selector: 'lesson-about',
	templateUrl: 'lesson-about.component.html'
}) 
export class LessonAboutComponent {
	@Input() lesson;
	@Input() currentLang;
	@Output() 
	select = new EventEmitter();

	// event emitting method that changes the state in the parent component of lesson-main 
	// it gets called from nav buttons that control the in-page navigation
	navSelect(value){
		this.select.emit(value)
	}
}