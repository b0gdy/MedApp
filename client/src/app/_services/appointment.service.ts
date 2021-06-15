import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from '../_models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl = 'https://localhost:5001/api/'
  appointments: Appointment[] = [];


  constructor(private http: HttpClient) { }

  getAppointments() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    if (this.appointments.length > 0) return of(this.appointments);
    return this.http.get<Appointment[]>(this.baseUrl + 'Appointment', options).pipe(
      map(appointments => {
        this.appointments = appointments;
        return appointments;
      })
    );
  }

  getAppointment(id: number) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    const appointment = this.appointments.find(x => x.id === id);
    if (appointment !== undefined) return of(appointment);
    return this.http.get<Appointment>(this.baseUrl + 'Appointment/' + id, options);
  }

  editAppointment(appointment: Appointment) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    let payload = {
      id: appointment.id,
      date: appointment.date,
      medicId: appointment.medicId,
      pacientId: appointment.pacientId,
    };
    let url = (this.baseUrl + 'Appointment');
    return this.http.put<Appointment>(url, payload, options).pipe(
      map(() => {
        const index = this.appointments.indexOf(appointment);
        this.appointments[index] = appointment;
      })
    )
  }

  createAppointment(model: any) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    let payload = {
      date: model.date,
      medicId: model.medicId,
      pacientId: model.pacientId,
    };
    let url = (this.baseUrl + 'Appointment');
    return this.http.post<Appointment>(url, payload, options).pipe(
      map((appointment: Appointment) => {
        const index = this.appointments.indexOf(appointment);
        this.appointments[index] = appointment;
      })
    )
  }

  registerAppointment(model: any) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    let options = {headers: headers};
    let payload = {
      date: model.date,
      medicId: model.medicId,
      pacientId: model.pacientId,
    };
    let url = (this.baseUrl + 'AppointmentMember/register');
    return this.http.post<Appointment>(url, payload, options).pipe(
      map((appointment: Appointment) => {
        const index = this.appointments.indexOf(appointment);
        this.appointments[index] = appointment;
      })
    )
  }

}
