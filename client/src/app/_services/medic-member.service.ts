import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedicMember } from '../_models/medicMember';

@Injectable({
  providedIn: 'root'
})
export class MedicMemberService {
  baseUrl = 'https://localhost:5001/api/'
  medicMember: MedicMember;

  constructor(private http: HttpClient) { }

  getMedicMember(userName: string) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    return this.http.get<MedicMember>(this.baseUrl + 'Medic/' + userName, options).pipe(
      map(medicMember => {
        this.medicMember = medicMember;
        return medicMember;
      })
    );
  }

}
