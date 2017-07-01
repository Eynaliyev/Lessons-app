import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import '../rxjs-extensions';

import { Lesson } from './lesson.model';
import { UserService } from './user.service';

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
		return this.userService.getToken().then(token =>{
			console.log('current user token: ', token);	

	 		this.realLessonsUrl = `http://192.168.1.78:8082/UnibookHsisInfoRest/education/subjectGroup?token=${token}&studentId=0&employeeId=0&orgId=0&semesterId=1000033&groupId=0&code=&facultyId=0&page=${page}&pageSize=50`;
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
	getLessonById(id): Promise<any> {
		return this.userService.getToken().then(token =>{
			this.realLessonByIdUrl = `http://192.168.1.78:8082/UnibookHsisInfoRest/education/subjectTopic?token=${token}&subjectId=${id}`;		
			console.log('realLessonByIdURL', this.realLessonByIdUrl);
			return this.http.get(this.realLessonByIdUrl)
			.toPromise()
			.then(response => {
				console.log('response.json().data for getting Lesson by id', response.json().data);
				return this.toLessonDetail(response.json().data, token);
			})
            .catch(this.handleError);
		});
	}
	mapLessons(response:Response, token: string): Lesson[]{
	   // The response of the API hwith the results
	   if(response.json().data.lenght === 0) {
			return [];
	   } else {
		   return response.json().data.map(lesson => this.toLesson(lesson, token));
	   }
	}
	// the mapping function used in the dashboard because there's less information and inconsistent variable names
	toLesson(r:any, token: any): Lesson{
		//iterate thorugh the properties of the object
		//if null, add empty to the property including the .value or whatever
		let obj = this.setDefaults(r);
		let uni = <Lesson>({
			id: obj.id,
			name: obj.subject.value,
			studentCount: obj.studentCount,
			language: obj.eduLang.value,
			year: obj.eduYear.value,
			semester: obj.semester.value
		});
		return uni;
	}
	//to Uni mapping function that's used in the detail view
	toLessonDetail(r:any, token: any): Lesson{
		//iterate thorugh the properties of the object
		//if null, add empty to the property including the .value or whatever
		let obj = this.setDefaults(r);
		/* we'll use empty one before we map it further*/
		let uni;
		/*
		let uni = <Lesson>({
			id: obj.id,
			name: obj.name,
			info: obj.about,
			studentCount: obj.studentCount,
			teacherCount: obj.employeeCount,
			street: obj.address,
			imgUrl: `http://192.168.1.78:8082/UnibookHsisRest/structures/${obj.id}/logo?token=${token}`,
			coverImgUrl: `http://192.168.1.78:8082/UnibookHsisRest/structures/${obj.id}/cover?token=${token}`,	
			rektorName: obj.rectorName,
			buildingCount: obj.structureInfo.buildingCount,
			commonArea: obj.structureInfo.commonArea,
			eduLabArea: obj.structureInfo.eduLabArea,
			sportArea: obj.structureInfo.sportArea,
			campusArea: obj.structureInfo.campusArea,
			pcCount: obj.structureInfo.pcCount,
			departmentCount: obj.fakulteCount
		});*/
		return uni;
	}
	// setting default values to object properties in case 
	// might have to convert into a promise
	setDefaults(obj) {
		//console.log('setting defaults in: ', obj)
		//array of properties  in Lessons that require 
		//for now, no properties that need their data set
		let simpleProperties = [];
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
}