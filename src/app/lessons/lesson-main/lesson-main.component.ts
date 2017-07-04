import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Lesson } from '../../shared/lesson.model';
import { LessonService } from '../../shared/lesson.service';
import { UserService } from '../../shared/user.service';

@Component({
	selector: 'lesson-main',
	templateUrl: 'lesson-main.component.html'
}) 
export class LessonMainComponent implements OnInit, OnChanges {
	lesson: '';
	currentLang;
	currentState;
	subState;
	students;
	teachers;
	journal;
	topics;
	states = ['lesson-about', 'members-list', 'meeting', 'e-journal', 'final-journal', 'journal-add', 'journal-edit', 'meeting-files']

	constructor(
		private lessonService: LessonService,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService) {}

	ngOnInit(): void {
		this.currentState ="lesson-about";	
		this.route.params.forEach((params: Params) => {
			let id = +params['id'];
			// getting the lesson by its id from the server
			this.lessonService.getLessonById(id)
			.then(lesson => {
				this.lesson = lesson;
				console.log('this lesson: ', lesson);
			});
			this.lessonService.getJournal(id)
			.then(journal => {
				this.journal = journal;
				console.log('journal in this lesson: ', journal);
			});
			this.lessonService.getTopics(id)
			.then(topics => {
				this.topics = topics;
				console.log(' topics in this lesson: ', topics);
			});
			this.lessonService.getStudentsByLesson(id)
			.then(students => {
				this.students = students;
				console.log('students in the lesson: ', students);
			});
			this.lessonService.getTeachersByLesson(id)
			.then(teachers => {
				this.teachers = teachers;
				console.log('teachers in the lesson: ', teachers);
			});
			this.userService.getCurrentLanguage().subscribe(currentLang => {
				console.log('currentLanguage: ', currentLang);
				this.currentLang = currentLang;
			});
		}); 
	}
	setCurrentState (event) {
		this.currentState = event;
		console.log('current state: ', this.currentState);
	}
	setSubState(event){
		this.subState = event;
		console.log('current sub state: ', this.subState);
	}
	ngOnChanges(changes){
		console.log(changes);
	}
}