import { Component, Input } from '@angular/core';

@Component({
	
	selector: 'final-journal',
	templateUrl: 'final-journal.component.html'
}) 
export class FinalJournalComponent {
	@Input() lesson;
	@Input() currentLang;
	@Input() finalJournal;
	columns = ['Istirakcilar', 'Orta qiymet', 'Devamiyyet', 'Serbest is', 'Kurs isi', 'Imtahana qeder', 'Imtahan', 'Yekun bal', 'Yekun'];
	rows = [];
	ngOnInit(){
		
		for(var j = 0; j < this.finalJournal.length; j++){
			this.rows.push(this.finalJournal[j]);
		}/*
		for(var i in this.finalJournal[0]){
			this.columns.push(i);
		}*/
		console.log('rows, columns, activity journal: ', this.rows, this.columns);
	}
}