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
	@Input() subState;

	ngOnChanges(){
		console.log(this.currentState);
	}

}