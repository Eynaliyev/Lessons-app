import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Lesson} from '../../shared/lesson.model';

@Component({

	selector: 'lesson-header',
	templateUrl: 'lesson-header.component.html'
})
export class LessonHeaderComponent implements OnInit{
	@Input () currentState: string;
	@Input() lesson;
	@Input () states;
	@Input() currentLang;
	@Input() subState;

	@Output()
	select = new EventEmitter();
	@Output()
	updateSubState = new EventEmitter();
	// event emitting method that changes the state in the parent component of lesson-main
	// it gets called from nav buttons that control the in-page navigation
  ngOnInit() {
    console.log(this.lesson);
  }
	navSelect(value){
		this.currentState = value;
		if(value === 'meeting'){
			this.emitSubState('topics');
		}/* I don't know why it's not working
		if(value === 'journal-tab'){
			this.emitSubState('activity');
		}*/
		console.log('currentState in header: ', this.currentState);
		this.select.emit(value);
	}
	emitSubState(value){
		this.subState = value;
		console.log('subState in header: ', this.subState);
		this.updateSubState.emit(value);
	}
}
