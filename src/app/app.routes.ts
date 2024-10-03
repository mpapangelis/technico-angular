import { Routes } from '@angular/router';
import { PropertyownerComponent } from './propertyowner/propertyowner.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'property-owner', component: PropertyownerComponent },
    { path: 'create-user', component: CreateUserComponent },
    { path: 'update-user/:id', component: UpdateUserComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];
