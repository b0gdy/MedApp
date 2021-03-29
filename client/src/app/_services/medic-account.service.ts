import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Medic } from '../_models/medic';

@Injectable({
  providedIn: 'root'
})
export class MedicAccountService {
  baseUrl = 'https://localhost:5001/api/'
  private currentMedicSource = new ReplaySubject<Medic>(1);
  currentMedic$ = this.currentMedicSource.asObservable();

  constructor(private http: HttpClient) { }

  loginMedic(model: any){
    return this.http.post(this.baseUrl + 'MedicAccount/login', model).pipe(
      map((response: Medic) => {
        const medic = response;
        if (medic) {
          localStorage.setItem('medic', JSON.stringify(medic));
          localStorage.setItem('token', medic.token);
          this.currentMedicSource.next(medic);
        }
      })
    )
  }

  registerMedic(model: any){
    return this.http.post(this.baseUrl + 'MedicAccount/register', model).pipe(
      map((medic: Medic) => {
        if (medic) {
          localStorage.setItem('medic', JSON.stringify(medic));
          localStorage.setItem('token', medic.token)
          this.currentMedicSource.next(medic);
        }
        // return medic;
      })
    )
  }

  setCurrentMedic(medic: Medic) {
    this.currentMedicSource.next(medic);
  }

  logoutMedic() {
    localStorage.removeItem('medic');
    this.currentMedicSource.next(null);
  }
}
