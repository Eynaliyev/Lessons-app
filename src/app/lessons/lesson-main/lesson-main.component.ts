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
	activityJournal = [[[]]];
	finalJournal;
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
				let grades = activityJournal.journalScoreList;
				let emptyGradesList = [];
				for(var i = 0; i < dates.length; i++){
					emptyGradesList.push(0);
				}
				//console.log('empty grades list ', emptyGradesList);
				//console.log('activity journal before adding students: ', this.activityJournal);
				// setting defaults
				students.forEach((student, index) => {
					//let studentArra = [student];
					//console.log(typeof studentArra, typeof this.activityJournal[0]);
					let fullStudent = [student].concat(emptyGradesList);
					//console.log('empty list: ', emptyGradesList, 'fullStudent: ', fullStudent);
					this.activityJournal[0].push([fullStudent]);
				});
				// adding dates
				console.log('activity journal after adding students: ', this.activityJournal);
				dates.forEach((date, index) => {
					this.activityJournal.push([date]);
				});
				console.log('activity journal after adding dates: ', this.activityJournal);
				grades.forEach(grade => {
					// finding a date index
					let relevantDates = dates.filter(date => {
						return date.id = grade.scheduleId;
					});
					//console.log('relevant Dates: ', relevantDates);
					let dateIndex;
					if(relevantDates.length != 0){
						dateIndex = relevantDates[0];
					} else { dateIndex = -1;}
					let xIndex = dates.indexOf(dateIndex);
					//console.log('xIndex = ', xIndex);
					// NEEDS TO BE FIXE TO REFLECT THE CHANGES IN DATA STRUCTURE
					// finding a student index
					let relevantStudents = students.filter(student => {
						return student.studentId = grade.studentIdForScore;
					});
					//console.log('relevant students: ', relevantStudents);
					//doing this because studentIds are not unique for some reason
					let studentIndex;
					if(relevantStudents.length != 0){
						studentIndex = relevantStudents[0];
					} else { studentIndex = -1;}
					//console.log('studentIndex: ', studentIndex);
					let yIndex = students.indexOf(studentIndex);
					//console.log('yIndex = ', yIndex);

					// putting the grade where it belongs
					if(xIndex != -1 && yIndex != -1){
						//console.log('found someone: ', this.activityJournal[0][yIndex + 1][xIndex][xIndex + 1]);
						this.activityJournal[0][yIndex + 1][xIndex][xIndex+1] = grade;
					} else {
						//console.log("grade: ", 'did not find a dates index: ', grade.scheduleId, 'and did not find a student index: ', grade.studentIdForScore, yIndex);
					}
				});
				console.log('activity journal in lesson-main: ', this.activityJournal);
			});
			this.lessonService.getFinalJournal(id)
			.then(finalJournal => {
				this.finalJournal = finalJournal.journalResultList;
				console.log('final journal in lesson-main: ', this.finalJournal);
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
	goToEdit(){
		console.log('setting sub state to edit');
		this.setSubState('journal-edit');
	}
}