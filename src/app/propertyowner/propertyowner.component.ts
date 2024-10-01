import { Component, inject, OnInit } from '@angular/core';
import { PropertyownerService } from '../services/propertyowner.service';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-propertyowner',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './propertyowner.component.html',
  styleUrl: './propertyowner.component.css'
})
export class PropertyownerComponent implements OnInit{

  service = inject(PropertyownerService);
  users: User[] = [];

  createUserForm!: FormGroup;

  fb = inject(FormBuilder);

  answer: any;

  ngOnInit():void {
    this.service.getUsers().subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: err => console.error(`Something is wrong... ${err}`),
      complete: () => console.log('Data Fetch completed...')
    });

    this.createUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      vat: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get firstName(){
    return this.createUserForm.get('firstName');
  }
  get lastName(){
    return this.createUserForm.get('lastName');
  }
  get email(){
    return this.createUserForm.get('email');
  }
  get username(){
    return this.createUserForm.get('username');
  }
  get phoneNumber(){
    return this.createUserForm.get('phoneNumber');
  }
  get address(){
    return this.createUserForm.get('address');
  }
  get vat(){
    return this.createUserForm.get('vat');
  }
  get password(){
    return this.createUserForm.get('password');
  }

  createUser(){
    if (this.createUserForm.valid) {
  
      const firstName = this.createUserForm.get('firstName')?.value;
      const lastName = this.createUserForm.get('lastName')?.value;
      const email = this.createUserForm.get('email')?.value;
      const username = this.createUserForm.get('username')?.value;
      const phoneNumber = this.createUserForm.get('phoneNumber')?.value;
      const address = this.createUserForm.get('address')?.value;
      const vat = this.createUserForm.get('vat')?.value;
      const password = this.createUserForm.get('password')?.value;

      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Email:', email);
      console.log('Username:', username);
      console.log('Phone Number:', phoneNumber);
      console.log('Address:', address);
      console.log('VAT:', vat);
      console.log('Password:', password);

      const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: username,
        phoneNumber: phoneNumber,
        address: address,
        vat: vat,
        password: password
      };

      this.service.createUser(formData).subscribe({
        next: response => this.answer = response,
        error: err => console.error(`Something is wrong... ${err}`),
      });

    } else {
     console.error('Form is invalid');
    }
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
}