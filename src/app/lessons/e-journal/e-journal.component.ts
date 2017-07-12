import { Component, Input, Output, EventEmitter } from '@angular/core';

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
	@Input() finalJournal;
	@Output() edit: new EventEmitter(); 
	ngOnInit(){
		console.log('currentState is: ', this.currentState);
	}
	goToEdit(){
		this.edit.emit('edit-journal');
	}
}