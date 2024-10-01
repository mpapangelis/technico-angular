import { Component, inject, OnInit } from '@angular/core';
import { PropertyownerService } from '../services/propertyowner.service';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from "../create-user/create-user.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-propertyowner',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, CommonModule, CreateUserComponent],
  templateUrl: './propertyowner.component.html',
  styleUrl: './propertyowner.component.css'
})
export class PropertyownerComponent implements OnInit{

  service = inject(PropertyownerService);
  router = inject(Router);
  users: User[] = [];

  ngOnInit():void {
    this.service.getUsers().subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: err => console.error(`Something is wrong... ${err}`),
      complete: () => console.log('Data Fetch completed...')
    });

  }

  deleteUser(userId: number): void{
    if (confirm('Are you sure you want to delete this user?')){
      this.service.softDeleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== userId);
        },
        error: err => console.error(`Error deleting user: ${err}`)
      });
    }
  }

  editUser(userId: number): void {
    this.router.navigate(['/update-user', userId]);
  }
}