import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Consultation } from '../_models/consultation';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  baseUrl = 'https://localhost:5001/api/'
  consultations: Consultation[] = [];


  constructor(private http: HttpClient) { }

  getConsultations() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    if (this.consultations.length > 0) return of(this.consultations);
    return this.http.get<Consultation[]>(this.baseUrl + 'Consultation', options).pipe(
      map(consultations => {
        this.consultations = consultations;
        return consultations;
      })
    );
  }

  getConsultation(id: number) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    const consultation = this.consultations.find(x => x.id === id);
    if (consultation !== undefined) return of(consultation);
    return this.http.get<Consultation>(this.baseUrl + 'Consultation/' + id, options);
  }

  editConsultation(consultation: Consultation) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    let payload = {
      id: consultation.id,
      treatment: consultation.treatment,
      medicId: consultation.medicId,
      pacientId: consultation.pacientId,
    };
    let url = (this.baseUrl + 'Consultation');
    return this.http.put<Consultation>(url, payload, options).pipe(
      map(() => {
        const index = this.consultations.indexOf(consultation);
        this.consultations[index] = consultation;
      })
    )
  }

  createConsultation(model: any) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    let payload = {
      treatment: model.treatment,
      medicId: model.medicId,
      pacientId: model.pacientId,
    };
    let url = (this.baseUrl + 'Consultation');
    return this.http.post<Consultation>(url, payload, options).pipe(
      map((consultation: Consultation) => {
        const index = this.consultations.indexOf(consultation);
        this.consultations[index] = consultation;
      })
    )
    // return this.http.post<Consultation>(url, model);
  }

}
