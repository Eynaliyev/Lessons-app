import './custom-extensions';
import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http} from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';
import { LoadersCssModule } from 'angular2-loaders-css';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { DropdownModule } from "ngx-dropdown";
import { Ng2TableModule } from 'ng2-table/ng2-table';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule} from "angular2-perfect-scrollbar";

// services
import { SpinnerService } from "./core/spinner/spinner.service";
import { UserService } from './shared/user.service';
import { UniversityService } from './shared/university.service';
import { StudentService } from './shared/student.service';
import { HelperService } from './shared/helper.service';
import { TeacherService } from './shared/teacher.service';
import { LessonService } from './shared/lesson.service';
//Shared and app-level Components
import { SpinnerComponent } from "./core/spinner/spinner.component";
import { AuthComponent } from './shared/auth.component';
import { InitializeDropdown } from './shared/my-dropdown.directive';
import { HeaderComponent } from './shared/header.component';
import { CustomMasonryComponent } from './shared/custom-masonry.component';
import { routing } from './app-routing';
import { RemainderPercentagePipe } from './shared/remainder-percentage.pipe';
import { CapitalizePipe } from './shared/capitalize.pipe';
import { FirstLettersPipe } from './shared/firstletters.pipe';
import { AuthGuard } from './shared/auth.guard';
import { SearchPipe } from './shared/search.pipe';
import { TranslatePipe } from './shared/translate.pipe';
import { SortPipe } from './shared/sort.pipe';

import { DashboardComponent } from './dashboard/dashboard.component';
// University components
import { UniversityAsideComponent } from './universities/university-aside/university-aside.component';

// Lesson Components
import { LessonMainComponent } from './lessons/lesson-main/lesson-main.component';
import { LessonAboutComponent } from './lessons/lesson-about/lesson-about.component';
import { LessonHeaderComponent } from './lessons/lesson-header/lesson-header.component';
import { LessonSubHeaderComponent } from './lessons/lesson-sub-header/lesson-sub-header.component';
import { FinalJournalComponent } from './lessons/final-journal/final-journal.component';
import { CourseWorkJournalComponent } from './lessons/course-work-journal/course-work-journal.component';
import { IndependentWorkJournalComponent } from './lessons/independent-work-journal/independent-work-journal.component';
import { JournalAddComponent } from './lessons/journal-add/journal-add.component';
import { JournalEditComponent } from './lessons/journal-edit/journal-edit.component';
import { EJournalComponent } from './lessons/e-journal/e-journal.component';
import { ActivityJournalComponent } from './lessons/activity-journal/activity-journal.component';
import { MeetingsListComponent } from './lessons/meetings-list/meetings-list.component';
import { MeetingsPostPanelComponent } from './lessons/meetings-post-panel/meetings-post-panel.component';
import { MembersListComponent } from './lessons/members-list/members-list.component';
import { MeetingFilesComponent } from './lessons/meeting-files/meeting-files.component';
import { MeetingComponent } from './lessons/meeting/meeting.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserBioComponent } from './user/user-bio/user-bio.component';
import { UserMainInfoComponent } from './user/user-main-info/user-main-info.component';
import { UserContactComponent } from './user/user-contact/user-contact.component';
import { UserDocsComponent } from './user/user-docs/user-docs.component';
import { UserHeaderComponent } from './user/user-header/user-header.component';
import { DefaultImage } from './shared/default-image.directive';
import { NavButtonDirective } from './shared/nav-button.directive';
import { PopupDirective } from './shared/popup.directive';
import { AsideTriggerDirective } from './shared/aside-trigger.directive';
import { LoaderComponent } from './shared/loader.component'
import { FilterByUniDirective } from './shared/filter-by-uni.directive';
import { SelectModule } from 'ng-select';
import { LessonsListComponent } from './lessons/lessons-list/lessons-list.component';
import { EditTopicDirective } from './shared/edit-topic.directive';
import {LangButtonDirective} from "./shared/lang-button.directive";
import {StudentChartsComponent} from "./shared/student-charts.component";
import {TeacherChartsComponent} from "./shared/teacher-charts.component";
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		ModalModule.forRoot(),
		routing,
	    MultiselectDropdownModule,
		SelectModule,
		DropdownModule,
		LoadersCssModule,
		Ng2TableModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
	],
	declarations: [
    LangButtonDirective,
		InitializeDropdown,
		AppComponent,
		AuthComponent,
		CustomMasonryComponent,
		HeaderComponent,
		RemainderPercentagePipe,
		CapitalizePipe,
		FirstLettersPipe,
		DashboardComponent,
		UniversityAsideComponent,
		LessonMainComponent,
		LessonHeaderComponent,
		LessonSubHeaderComponent,
		LessonAboutComponent,
		FinalJournalComponent,
		IndependentWorkJournalComponent,
		CourseWorkJournalComponent,
		JournalAddComponent,
		JournalEditComponent,
		EJournalComponent,
		ActivityJournalComponent,
		MeetingsListComponent,
		MeetingsPostPanelComponent,
		MembersListComponent,
		MeetingComponent,
		MeetingFilesComponent,
		UserProfileComponent,
		UserBioComponent,
		UserMainInfoComponent,
		UserContactComponent,
		UserDocsComponent,
		UserHeaderComponent,
		DefaultImage,
		NavButtonDirective,
		PopupDirective,
		AsideTriggerDirective,
		LoaderComponent,
		FilterByUniDirective,
		SpinnerComponent,
		SearchPipe,
		TranslatePipe,
		SortPipe,
		LessonsListComponent,
		EditTopicDirective,
    StudentChartsComponent,
    TeacherChartsComponent
	],
	providers: [
		AuthGuard,
		UniversityService,
		UserService,
		HelperService,
		StudentService,
		TeacherService,
		SpinnerService,
		LessonService
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
