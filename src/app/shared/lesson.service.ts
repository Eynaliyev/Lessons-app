import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import '../rxjs-extensions';

import { Lesson, Language, Employee, Topic, Participant } from './lesson.model';
import { UserService } from './user.service';
import  * as Rx from 'rxjs/Rx'
import {Subject} from "rxjs/Subject";
@Injectable()
export class LessonService {
	private lessonsUrl = 'app/lessons'; // URL to web api
	private realLessonsUrl;
	private headers = new Headers({'Content-Type': 'application/json'});
	private realLessonByIdUrl;
	private realDepartmentByIdUrl;
	private realFacultyByIdUrl;
	private realSpecialtyByIdUrl;
	private realLessonStatsUrl;
	private uniLogoUrl;
	private uniCoverUrl;
	private searchUrl;
	private subModulesList: string = '';
	public lessons: ReplaySubject<any> = new ReplaySubject(1);

	constructor(private http: Http,
		private userService: UserService) { }
	/// connect to the real api
	getLessons(page, subModules?): Promise<any> {
		if(subModules){ this.subModulesList = subModules};
		return this.userService.getToken().then(token => {
			console.log('current user token: ', token);

/*
	 		this.realLessonsUrl = `http://192.168.1.78:8082/UnibookHsisInfoRest/education/subjectGroup?token=${token}&studentId=0&employeeId=0&orgId=0&semesterId=1000033&groupId=0&code=&facultyId=0&page=${page}&pageSize=50`;
*/
	      this.realLessonsUrl = 'http://192.168.1.78:8082/UnibookEMS/course?token=' + token;
				console.log('getting real lessons list from', this.realLessonsUrl);
			return this.http.get(this.realLessonsUrl)
			.toPromise()
			.then(response => {
				console.log('lessons-list response.json().data', response.json().data);
				return this.mapLessons(response, token);
			})
			.catch(this.handleError);
		});
	}
	getLessonById2(id): Observable<any> {
	  return Rx.Observable.fromPromise(this.userService.getToken())
      .flatMap((token) => this.http.get(`http://192.168.1.78:8082/UnibookEMS/course/${id}?token=${token}`))
      .map((response) => this.toLessonDetail(response.json().data));
  }

	getLessonById(id): Promise<any> {
		return this.userService.getToken().then(token => {
			/*this.realLessonByIdUrl = `http://192.168.1.78:8082/UnibookHsisInfoRest/education/subjectInfo?token=${token}&subjectId=${id}`;*/
      this.realLessonByIdUrl =   `http://192.168.1.78:8082/UnibookEMS/course/${id}?token=${token}`;
			console.log('realLessonByIdURL', this.realLessonByIdUrl);
			return this.http.get(this.realLessonByIdUrl)
			.toPromise()
			.then(response => {
				console.log('response.json().data for getting Lesson by id', response.json().data);
				return this.toLessonDetail(response.json().data);
			})
            .catch(this.handleError);
		});
	}
	getStudentsByLesson(id){
		return this.userService.getToken().then(token =>{
			let studentsByLessonUrl = `http://192.168.1.78:8082/UnibookHsisInfoRest/education/studentBySubject?token=${token}&subjectId=${id}`;
			console.log('studentsByLessonUrl', studentsByLessonUrl);
			return this.http.get(studentsByLessonUrl)
			.toPromise()
			.then(response => {
				console.log('response.json().data for students by Lesson id', response.json().data);
				return this.mapParticipants(response);
			})
            .catch(this.handleError);
		});
	}
	getTeachersByLesson(id){
		return this.userService.getToken().then(token =>{
			let teachersByLessonUrl = `http://atis.edu.az/UnibookHsisInfoRest/education/employeeBySubject?token=${token}&subjectId=${id}`;
			console.log('teachersByLessonUrl', teachersByLessonUrl);
			return this.http.get(teachersByLessonUrl)
			.toPromise()
			.then(response => {
				console.log('response.json().data for teachers by Lesson id', response.json().data);
				return response.json().data;
			})
            .catch(this.handleError);
		});
	}
	getTopics(id) {
		return this.userService.getToken().then(token => {
		  const date = new Date().getFullYear();
			const topicsUrl = `http://192.168.1.78:8082/UnibookEMS/schedule?token=${token}&meetingStartDate=${date}-09-01&meetingEndDate=${date + 1}-09-01&eduLangId=0&eduTypeId=1000140&semestrId=0&orgId=&courseId=${id}`;
			console.log('studentsByLessonUrl', topicsUrl);
			return this.http.get(topicsUrl)
			.toPromise()
			.then(response => {
				console.log('response.json().data for topics by Lesson id', response.json().data);
				return this.mapTopics(response);
			})
            .catch(this.handleError);
		});
	}
	getMaterials(id){
		return this.userService.getToken().then(token =>{
			let materialUrl = `http://192.168.1.78:8082/UnibookHsisInfoRest/education/subjectTopicDoc?token=${token}&subjectId=${id}`;
			console.log('materialUrl', materialUrl);
			return this.http.get(materialUrl)
			.toPromise()
			.then(response => {
				console.log('response.json().data for journal by Lesson id', response.json().data);
				return response.json().data;
			})
            .catch(this.handleError);
		});

	}
	getActivityJournal(id){
		return this.userService.getToken().then(token =>{
			let journalUrl = `http://192.168.1.78:8082/UnibookHsisInfoRest/education/journal?token=${token}&subjectId=${id}&pageNum=1`;
			console.log('activityJournalUrl', journalUrl);
			return this.http.get(journalUrl)
			.toPromise()
			.then(response => {
				console.log('response.json().data for activity journal by Lesson id', response.json().data);
				return response.json().data;
			})
            .catch(this.handleError);
		});
	}
	getFinalJournal(id){
		return this.userService.getToken().then(token =>{
			let finalJournalUrl = `http://192.168.1.78:8082/UnibookHsisInfoRest/education/journalResult?token=${token}&subjectId=${id}&pageNum=1`
			console.log('finalJournalUrl', finalJournalUrl);
			return this.http.get(finalJournalUrl)
			.toPromise()
			.then(response => {
				console.log('response.json().data for final journal by Lesson id', response.json().data);
				return response.json().data;
			})
            .catch(this.handleError);
		});
	}
	mapLessons(response:Response, token: string): Lesson[]{
		//console.log('data in mapLessons: ', data);
		// The response of the API hwith the results
		if(response.json().data.lenght === 0) {
			return [];
		} else {
		   return response.json().data.map(lesson => this.toLesson(lesson, token));
		}
	}
	// I'm passing in data in json
	mapLanguages(data){
		//console.log('data in mapLanguages: ', data);
		// The response of the API hwith the results
		if(data.lenght === 0) {
			return [];
		} else {
		   return data.map(language => this.toLanguage(language));
		}
	}
	mapEmployees(data){
		//console.log('data in mapEmployees: ', data);
	   // The response of the API hwith the results
	   if(data.lenght === 0) {
			return [];
	   } else {
		   return data.map(employee => this.toEmployee(employee));
	   }
	}
	mapParticipants(response){
		//console.log('data in mapParitcipants: ', data);
	   // The response of the API hwith the results
	   if(response.json().data.lenght === 0) {
			return [];
	   } else {
		   return response.json().data.map(participant => this.toParticipant(participant));
	   }
	}
	mapTopics(response){
		//console.log('data in mapParitcipants: ', data);
	   // The response of the API hwith the results
	   if(response.json().data.lenght === 0) {
			return [];
	   } else {
		   return response.json().data.map(topic => this.toTopic(topic));
	   }
	}
	// the mapping function used in the dashboard because there's less information and inconsistent variable names
	toLesson(r:any, token): Lesson{
		//iterate thorugh the properties of the object
		//if null, add empty to the property including the .value or whatever
		let obj = this.setDefaults(r);
		let lesson = <Lesson>({
			id: obj.id,
			name: obj.eduPlanSubject.value,
			studentCount: 0,
			language: obj.eduLang.value,
			year: '2017',
			semester: obj.semestr.value
		});
		//console.log('lesson in toLesson: ', lesson);
		return lesson;
	}
	toLanguage(language): Language{
		//console.log('language in toLanguage: ', language);
		let res = {
			name: language.languageName.value
		};
		return res;

	}
	toEmployee(employee): Employee{
		//console.log('employee in employee: ', language);
		let res = {
			name: employee.name
		};
		return res;
	}
	toTopic(topic): Topic{
		let obj = this.setDefaults(topic);
		let res = {
		    name: obj.title,
		    date: obj.start,
		    time: obj.time
		};
		return res;
	}
	toParticipant(participant): Participant{
		let obj = this.setDefaults(participant);
		let res = {
			name: obj.studentName,
			status: obj.status,
			specialty: obj.orgName,
			group: obj.groupName
		};
		return res;
	}
	// to Uni mapping function that's used in the detail view
	toLessonDetail(r: any) {
		// iterate thorugh the properties of the object
		// if null, add empty to the property including the .value or whatever
		// console.log("response in toLessonDetail: ", r);

	/*	const languages = this.mapLanguages(r.language);
		const employees = this.mapEmployees(r.employee);*/
	console.log(r.eduLang.value);
	console.log('-----------------------------------')
	  const lesson = {
			name: r.eduPlanSubject.value,
			info: r.note,
      employees: r.teachers,
      students: r.students,
      languages: r.eduLang.value,

		};
		 console.log('lesson in toLessonDetail: ', lesson);
		return lesson;
	}
	// setting default values to object properties in case
	// might have to convert into a promise
	setDefaults(obj) {
		//console.log('setting defaults in: ', obj)
		//array of properties  in Lessons that require
		//for now, no properties that need their data set
		let simpleProperties = ['about', 'name'];
		//let simpleProperties = ["name", "about", "address"]
		// let's only check for properties that we care about
		for (var i = 0; i < simpleProperties.length; i++){
			let property = simpleProperties[i];
		// if the obj.propert in array of the ones we need value fo
			if (obj[property] === null && simpleProperties.indexOf(property) > -1 ) {
				//console.log(property, "equal null");
				obj[property] = {az : null};
			}
		}
		//console.log('object after setting defaults: ', obj)
		return obj;
	}
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
	editTopic = new Subject();
}
