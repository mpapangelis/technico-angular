import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyownerService {

  http = inject(HttpClient);

  getUsers(){
    const url = 'http://localhost:8080/Technico/resources/propertyOwner/findAll';
    return this.http.get(url);
  }

  createUser(data: any){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    const url = "http://localhost:8080/Technico/resources/propertyOwner/create";

    return this.http.post(url, JSON.stringify(data), {headers: headers})
      .pipe(
        retry(1),
        catchError(error => throwError(() => 'Something is wrong...'))
      )
  }

  softDeleteUser(userId: number){
    const url = `http://localhost:8080/Technico/resources/propertyOwner/softDelete/${userId}`;
    console.log(`Soft delete URL: ${url}`);
    return this.http.delete(url, { responseType: 'text'})//perimenei os apantisi json alla to api girnaei ena row opote to blepei os string
      .pipe(
        retry(1),
        catchError((error) => {
          console.error('Error during soft delete:', error);
          return throwError(() => 'Something went wrong during deletion.');
        })
      )
  }

  updateUser(userId: number, data: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `http://localhost:8080/Technico/resources/propertyOwner/update/${userId}`;

    return this.http.put(url, JSON.stringify(data), { headers: headers })
      .pipe(
        retry(1),
        catchError((error) => {
          console.error(`Error updating user with ID ${userId}:`, error);
          return throwError(() => `Something went wrong while updating the user.`)
        })
      );
  }

  getUserById(userId: number) {
    const url = `http://localhost:8080/Technico/resources/propertyOwner/${userId}`;
    return this.http.get(url)
      .pipe(
        retry(1),
        catchError((error) => {
          console.error(`Error fetching user with ID ${userId}`, error);
          return throwError(() => `Something went wrong while fetching the user.`);
        })
      )
  }
}
