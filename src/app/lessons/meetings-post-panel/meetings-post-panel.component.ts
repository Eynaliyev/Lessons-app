import {Component, Input, OnInit} from '@angular/core';
import {LessonService} from "../../shared/lesson.service";

@Component({

	selector: 'meetings-post-panel',
	templateUrl: 'meetings-post-panel.component.html'
})
export class MeetingsPostPanelComponent implements  OnInit{
	@Input() lesson;
	@Input() currentLang;
	@Input() topic;
	constructor(private lessonService: LessonService){}
	ngOnInit() {
  }
  cancelEditing() {
	  this.lessonService.editTopic.next('cancelEdit');
  }
}
