import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Medic } from '../_models/medic';

@Injectable({
  providedIn: 'root'
})
export class MedicService {
  baseUrl = 'https://localhost:5001/api/'
  medics: Medic[] = [];


  constructor(private http: HttpClient) { }

  getMedics() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    if (this.medics.length > 0) return of(this.medics);
    return this.http.get<Medic[]>(this.baseUrl + 'Medic', options).pipe(
      map(medics => {
        this.medics = medics;
        return medics;
      })
    );
  }

  getMedic(id: number) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    const medic = this.medics.find(x => x.id === id);
    if (medic !== undefined) return of(medic);
    return this.http.get<Medic>(this.baseUrl + 'Medic/' + id, options);
  }

  editMedic(medic: Medic) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    let payload = {
      id: medic.id,
      username: medic.userName,
      firstName: medic.firstName,
      lastName: medic.lastName,
    };
    let url = (this.baseUrl + 'Medic');
    return this.http.put<Medic>(url, payload, options).pipe(
      map(() => {
        const index = this.medics.indexOf(medic);
        this.medics[index] = medic;
      })
    )
  }

}
