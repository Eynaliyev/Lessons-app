import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
	
	selector: 'lesson-sub-header',
	templateUrl: 'lesson-sub-header.component.html'
}) 
export class LessonSubHeaderComponent implements OnChanges {
	@Input () currentState: string;
	@Input() lesson;
	@Input () states;
	@Input() currentLang;
	@Input() subState;

	@Output() 
	select = new EventEmitter();

	// event emitting method that changes the state in the parent component of lesson-main 
	// it gets called from nav buttons that control the in-page navigation
	navSelectSub(value){
		this.subState = value;
		console.log('currentSubState in subheader: ', this.subState);
		this.select.emit(value);
	}

	ngOnChanges(changes){
		console.log(changes);
	}
}