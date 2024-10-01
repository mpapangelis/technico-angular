import { Routes } from '@angular/router';
import { PropertyownerComponent } from './propertyowner/propertyowner.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

export const routes: Routes = [
    { path: 'home', component: PropertyownerComponent },
    { path: 'create-user', component: CreateUserComponent },
    { path: 'update-user/:id', component: UpdateUserComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];
