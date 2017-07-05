
import { Component, Input } from '@angular/core';

@Component({
	selector: 'activity-journal',
	templateUrl: 'activity-journal.component.html'
}) 
export class ActivityJournalComponent {
	@Input() lesson;
	@Input() activityJournal;
	@Input() currentLang;
	ngOnInit(){
		console.log('activity journal: ', this.activityJournal);
	}
}