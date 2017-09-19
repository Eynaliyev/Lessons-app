// 1 - we get the user
// we get the unversity of the aside
// we get a list of lessons / fennler
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Lesson } from '../../shared/lesson.model';

declare var $:any;
declare var Masonry:any;
declare var imagesLoaded:any;
@Component({
	selector: 'lessons-list',
	templateUrl: 'lessons-list.component.html'
})
export class LessonsListComponent implements OnInit {
	@Input() loading: boolean;
	@Input() currentLang;
	@Output() loadMore = new EventEmitter<any>();
	@Input() lessons;
	@Output() gotoInfo = new EventEmitter<Lesson>();

	ngOnInit() {
		// get students list by lessonid from a test back end
		// initial query to only ask for the first page
		this.loadMoreLessons();
		console.log('current language in lesson list: ', this.currentLang);
	}
	loadMoreLessons(){
		this.loadMore.emit();
	}
	ngOnChanges(changes){
		// console.log(changes);
/*		$(document).ready(function(){
			console.log('masonry working');
			// init Isotope
			var grid = document.querySelector('.grid');

			var msnry = new Masonry( grid, {
			  itemSelector: '.grid-item',
			  columnWidth: '.grid-sizer',
			  percentPosition: true
			});

			imagesLoaded( grid ).on( 'progress', function() {
			  // layout Masonry after each image loads
			  msnry.layout();
			});
		});*/
	}
	goInfo(lesson: Lesson){
		console.log(lesson);
		this.gotoInfo.emit(lesson);
	}
}
