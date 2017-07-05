import { Component, Input } from '@angular/core';

@Component({
	selector: 'e-journal',
	templateUrl: 'e-journal.component.html'
}) 
export class EJournalComponent {
	@Input() lesson;
	@Input() currentState;
	@Input() currentLang;
	@Input() subState;
	@Input() activityJournal;
	ngOnInit(){
		console.log('currentState is: ', this.currentState);
	}
}