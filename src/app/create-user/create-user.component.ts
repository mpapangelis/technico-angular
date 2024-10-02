import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyownerService } from '../services/propertyowner.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit{

  createUserForm!: FormGroup;

  fb = inject(FormBuilder);
  service = inject(PropertyownerService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  answer: any;
  
  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required]],
      vat: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$")]]
    });
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

  createUser(): void {
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
        next: response => {
          this.answer = response;
          this.router.navigate(['/home']);
        },
        error: err => console.error(`Something is wrong... ${err}`),
      });

    } else {
     console.error('Form is invalid');
    }
  }

}
