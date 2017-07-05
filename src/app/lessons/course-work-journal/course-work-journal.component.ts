import { Component, Input } from '@angular/core';

@Component({
	
	selector: 'course-work-journal',
	templateUrl: 'course-work-journal.component.html'
}) 
export class CourseWorkJournalComponent {
	@Input() lesson;
	@Input() currentLang;
}