import { Component, Input, OnChanges } from '@angular/core';

@Component({
	
	selector: 'meeting',
	templateUrl: 'meeting.component.html'
}) 
export class MeetingComponent implements OnChanges {
	@Input() lesson;
	@Input() topics;
	@Input() currentLang;
	@Input() currentState;

	ngOnChanges(){
		console.log(this.currentState);
	}

}