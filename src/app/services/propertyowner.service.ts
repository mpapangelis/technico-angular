import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyownerService {

  http = inject(HttpClient);

  //url = 'https://reqres.in/api/users/1';

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
}
