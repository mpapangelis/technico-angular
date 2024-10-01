import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyownerService } from '../services/propertyowner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
  
  updateUserForm!: FormGroup;
  userId!: number;
  answer: any;

  fb = inject(FormBuilder);
  service = inject(PropertyownerService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      vat: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getUserById(this.userId).subscribe({
      next: (user: any) => {
        this.updateUserForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.userName,
          phoneNumber: user.phoneNumber,
          address: user.address,
          vat: user.vat,
          password: user.password
        });
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });

    
  }

  updateUser(): void {
    if (this.updateUserForm.valid) {
      const firstName = this.updateUserForm.get('firstName')?.value;
      const lastName = this.updateUserForm.get('lastName')?.value;
      const email = this.updateUserForm.get('email')?.value;
      const username = this.updateUserForm.get('username')?.value;
      const phoneNumber = this.updateUserForm.get('phoneNumber')?.value;
      const address = this.updateUserForm.get('address')?.value;
      const vat = this.updateUserForm.get('vat')?.value;

      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Email:', email);
      console.log('Username:', username);
      console.log('Phone Number:', phoneNumber);
      console.log('Address:', address);
      console.log('VAT:', vat);
 
      const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: username,
        phoneNumber: phoneNumber,
        address: address,
        vat: vat,
      };
 
      this.service.updateUser(this.userId, formData).subscribe({
        next: response => {
          this.answer = response;
          console.log('User updated successfully:', response);
          this.router.navigate(['/home']);
        },
        error: err => console.error(`Something is wrong... ${err}`)
      });
 
    } else {
      console.error('Form is invalid');
    }
    
  }
}
