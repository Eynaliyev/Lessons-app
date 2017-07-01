import { Component, OnInit } from '@angular/core';
import { Lesson } from '../shared/lesson.model';
import { University } from '../shared/university.model';
import { LessonService } from '../shared/lesson.service';
import { HelperService } from '../shared/helper.service';
import { UniversityService } from '../shared/university.service';
import { Router } from '@angular/router';
import { UniversityAsideComponent } from '../universities/university-aside/university-aside.component';
import { UserService } from '../shared/user.service';
import { NavButtonDirective } from '../shared/nav-button.directive';
declare var $: any;

@Component({
	selector: 'my-dashboard',
	templateUrl: 'dashboard.component.html',
	styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit { 
	lesson: any;
	currentModule;
	lessons: Lesson[] = [];
	oldLessons: Lesson[];
	lessonPageCounter = 0;
	private user;
	allLessons: Lesson[] = [];
	loading: Boolean;
	orgId;
	currentLang;
	university: University

	constructor(
		private userService: UserService,
		private lessonService: LessonService,
		private universityService: UniversityService,
		private helperService: HelperService,
		private router: Router) {
	}

	ngOnInit(): void {
	// the version with the real api
		// getting user's org info
		this.userService.getCurrentUser().then(user => { 
			this.user = user;
			//console.log('current user in dashboard component: ', this.user)
			this.universityService.getUniversityById(this.user.structure.id)
			.then(university => {
				this.university = university;
				console.log('this university', this.university);
			});
			//console.log('current modules: ', this.modules);
			this.userService.getCurrentLanguage().subscribe(currentLang => {
				console.log('currentLanguage: ', currentLang);
				this.currentLang = currentLang;
			});
		});
	}
	loadMoreLessons(mods?, counter?){
		console.log('loadMoreLessons called:');
		if(counter){ this.lessonPageCounter = counter};
		// need to have a counter starting at one to know how may times it was activated
		this.loading = true;
		if(mods){
			// we are just requesting things with other filters
			//setting counter to one because we are filtering universities
			this.lessonPageCounter = 1;
			this.lessonService.getLessons(this.lessonPageCounter, mods).then(lessons => {
				this.lessons = lessons;
				this.loading = false;
			});
		} else {
			this.lessonPageCounter++;
			this.lessonService.getLessons(this.lessonPageCounter)
			.then(lessons => {
				this.lessons = this.lessons.concat(lessons);
				this.allLessons = this.allLessons.concat(lessons);
				console.log("lessons list in the dashboard:", this.lessons);
				this.loading = false;
			});	
		}
	}
	gotoInfo(lesson: Lesson): void { 
		let link = ['/lesson', lesson.id];
		this.router.navigate(link);
	}
}