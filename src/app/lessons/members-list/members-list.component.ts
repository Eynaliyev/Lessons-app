import { Component, Input } from '@angular/core';

@Component({
	
	selector: 'members-list',
	templateUrl: 'members-list.component.html'
}) 
export class MembersListComponent {
	@Input() lesson;
	@Input() students;
	@Input() currentLang;
	ngOnInit(){
		//console.log('students in members-list', this.students);
	}
	add(){

	}
	edit(){

	}
	delete(){
		
	}
}