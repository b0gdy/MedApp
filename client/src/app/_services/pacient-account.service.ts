import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pacient } from '../_models/pacient';

@Injectable({
  providedIn: 'root'
})
export class PacientAccountService {
  baseUrl = 'https://localhost:5001/api/'
  private currentPacientSource = new ReplaySubject<Pacient>(1);
  currentPacient$ = this.currentPacientSource.asObservable();

  constructor(private http: HttpClient) { }

  loginPacient(model: any){
    return this.http.post(this.baseUrl + 'PacientAccount/login', model).pipe(
      map((response: Pacient) => {
        const pacient = response;
        if (pacient) {
          localStorage.setItem('pacient', JSON.stringify(pacient));
          localStorage.setItem('token', pacient.token);
          this.currentPacientSource.next(pacient);
        }
      })
    )
  }

  registerPacient(model: any){
    return this.http.post(this.baseUrl + 'PacientAccount/register', model).pipe(
      map((pacient: Pacient) => {
        if (pacient) {
          localStorage.setItem('pacient', JSON.stringify(pacient));
          localStorage.setItem('token', pacient.token)
          this.currentPacientSource.next(pacient);
        }
      })
    )
  }

  setCurrentPacient(pacient: Pacient) {
    this.currentPacientSource.next(pacient);
  }

  logoutPacient() {
    localStorage.removeItem('pacient');
    this.currentPacientSource.next(null);
  }
}
