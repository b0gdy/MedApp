import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PacientMember } from '../_models/pacientMember';

@Injectable({
  providedIn: 'root'
})
export class PacientMemberService {
  baseUrl = 'https://localhost:5001/api/'
  pacientMember: PacientMember;

  constructor(private http: HttpClient) { }

  getPacientMember(userName: string) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    return this.http.get<PacientMember>(this.baseUrl + 'Pacient/' + userName, options).pipe(
      map(pacientMember => {
        this.pacientMember = pacientMember;
        return pacientMember;
      })
    );
  }

}
