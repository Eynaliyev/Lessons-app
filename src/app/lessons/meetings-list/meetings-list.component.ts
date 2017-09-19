import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {LessonService} from '../../shared/lesson.service';

@Component({

	selector: 'meetings-list',
	templateUrl: 'meetings-list.component.html'
})
export class MeetingsListComponent{
	@Input() lesson;
	@Input() topics;
	@Input() currentLang;
	showIconList= false;
	constructor(private lessonService: LessonService) {}
  editTopic(topic) {
	  this.lessonService.editTopic.next(topic);
    this.showIconList = !this.showIconList;
  }


}
