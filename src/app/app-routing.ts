import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { LessonMainComponent } from './lessons/lesson-main/lesson-main.component';
import { AuthComponent } from './shared/auth.component';
import { AuthGuard } from './shared/auth.guard';
const appRoutes: Routes = [
	
	{
		path: 'user-profile',
		component: UserProfileComponent,
		canActivate: [AuthGuard]
	},	
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'lesson/:id',
		component: LessonMainComponent,
		canActivate: [AuthGuard]
	},
	
	{
		path: '#',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	},
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	},
	{
		path: 'AdministrationSystemView',
		component: AuthComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);




