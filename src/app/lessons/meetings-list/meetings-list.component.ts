import { Component, Input } from '@angular/core';

@Component({
	
	selector: 'meetings-list',
	templateUrl: 'meetings-list.component.html'
}) 
export class MeetingsListComponent {
	@Input() lesson;
	@Input() topics;
	@Input() currentLang;

}