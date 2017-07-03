//custom pipe for getting the first letters of a string containing multiple words
// used in teachers-list, teacher-grade-panel and student-gade-panel
import { Pipe } from '@angular/core';
 
@Pipe({
	name : "firstletters"
})
 
export class FirstLettersPipe{
	transform(value){
		console.log('value in first letters: ', value);
		let res: string  = "";
		res = value.split(" ").map(item => {return item[0]}).join('');
		console.log('value in res letters: ', res);
		return res;
	}
}