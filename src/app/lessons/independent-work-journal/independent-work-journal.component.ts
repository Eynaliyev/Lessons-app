import { Component, Input } from '@angular/core';

@Component({
	
	selector: 'independent-work-journal',
	templateUrl: 'independent-work-journal.component.html'
}) 
export class IndependentWorkJournalComponent {
	@Input() lesson;
	@Input() currentLang;
}