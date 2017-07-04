
import { Component, Input } from '@angular/core';

@Component({
	selector: 'activity-journal',
	templateUrl: 'activity-journal.component.html'
}) 
export class ActivityJournalComponent {
	@Input() lesson;
	@Input() journal;
	@Input() currentLang;
	ngOnInit(){
	}
}