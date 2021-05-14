import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pacient } from '../_models/pacient';

@Injectable({
  providedIn: 'root'
})
export class PacientService {
  baseUrl = 'https://localhost:5001/api/'
  pacients: Pacient[] = [];


  constructor(private http: HttpClient) { }

  getPacients() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    if (this.pacients.length > 0) return of(this.pacients);
    return this.http.get<Pacient[]>(this.baseUrl + 'Pacient', options).pipe(
      map(pacients => {
        this.pacients = pacients;
        return pacients;
      })
    );
  }

  getPacient(id: number) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    const pacient = this.pacients.find(x => x.id === id);
    if (pacient !== undefined) return of(pacient);
    return this.http.get<Pacient>(this.baseUrl + 'Pacient/' + id, options);
  }

  editPacient(pacient: Pacient) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    let payload = {
      id: pacient.id,
      username: pacient.userName,
      firstName: pacient.firstName,
      lastName: pacient.lastName,
      gender: pacient.gender,
      birthDate: pacient.birthDate,
    };
    let url = (this.baseUrl + 'Pacient');
    return this.http.put<Pacient>(url, payload, options).pipe(
      map(() => {
        const index = this.pacients.indexOf(pacient);
        this.pacients[index] = pacient;
      })
    )
  }

}
