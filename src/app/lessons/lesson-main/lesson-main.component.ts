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
	activityJournal;
	topics;
	materials;
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
			this.lessonService.getActivityJournal(id)
			.then(activityJournal => {
				//this.journal = activityJournal;
				console.log('activityJournal in this lesson: ', activityJournal, this.activityJournal);
				let students = activityJournal.journalStudentList;
				let dates = activityJournal.journalScheduleList;
				let grades = activityJournal.journalScireList
				students.forEach((student, index) => this.activityJournal[index][0] = student);
				dates.forEach((date, index) => this.activityJournal[0][index] = date);
				grades.forEach(grade => {
					let xIndex = dates.indexOf(dates.filter(date => date.id = grade.scheduleId));
					let yIndex = students.indexOf(students.filter(student => student.studentId = grade.studentIdForScore));
					this.activityJournal[yIndex][xIndex] = grade;
				});
				console.log('activity journal in lesson-main: ', this.activityJournal);
			});
			this.lessonService.getTopics(id)
			.then(topics => {
				this.topics = topics;
				console.log(' topics in this lesson: ', topics);
			});
			this.lessonService.getMaterials(id)
			.then(materials => {
				this.materials = materials;
				console.log(' materials in this lesson: ', materials);
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