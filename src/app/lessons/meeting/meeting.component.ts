import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LessonService} from '../../shared/lesson.service';
@Component({
	selector: 'meeting',
	templateUrl: 'meeting.component.html'
})
export class MeetingComponent implements OnChanges , OnInit{
	@Input() lesson;
	@Input() materials;
	@Input() currentLang;
	@Input() currentState;
	@Input() subState;
  topics: any ;
  topic: any;
constructor(private route: ActivatedRoute, private  lessonService: LessonService) {}
	ngOnChanges() {
		console.log(this.currentState);
	}
	ngOnInit() {
	  this.route.params.subscribe((params) => {
	    let id = params['id'];
      this.lessonService.getTopics(id)
        .then(topics => {
          this.topics = topics;
          console.log(' topics in this lesson: ', topics);
        });
    });
    this.lessonService.editTopic.subscribe((topicForEdit) => {
      if (topicForEdit === 'cancelEdit') {
        this.topic = undefined;
      } else {
        this.topic = topicForEdit
      }
    } );
  }


}
