
import { Component, Input } from '@angular/core';

@Component({
	selector: 'activity-journal',
	templateUrl: 'activity-journal.component.html'
}) 
export class ActivityJournalComponent {
	@Input() lesson;
	@Input() activityJournal;
	@Input() currentLang;
	rows;
	columns;
	ngOnInit(){
		this.rows = this.activityJournal[0].slice(1, 6);
		this.columns = this.activityJournal.slice(1, 9);
		console.log('rows, columns, activity journal: ', this.rows, this.columns);
	}
}