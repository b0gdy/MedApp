import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Consultation } from '../_models/consultation';
import { Medic } from '../_models/medic';
import { Pacient } from '../_models/pacient';
import { ConsultationService } from '../_services/consultation.service';
import { MedicService } from '../_services/medic.service';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-consultation-detail',
  templateUrl: './consultation-detail.component.html',
  styleUrls: ['./consultation-detail.component.css']
})
export class ConsultationDetailComponent implements OnInit {
  consultation: Consultation;
  cons$: Observable<Consultation>;
  id: number;
  medicines: string[] = [];
  pacient: Pacient;
  medic: Medic;

  constructor(private consultationService: ConsultationService,
              private route: ActivatedRoute,
              private router: Router,
              private pacientService: PacientService,
              private medicService: MedicService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          //this.consultation = this.consultationService.getConsultation(this.id);
          this.consultationService.getConsultation(this.id).subscribe(consultation => {
            console.log("subscribeStart");
            this.consultation = consultation;
            this.medicines = this.consultation.treatment.split("; ");
            console.log(this.medicines);
            console.log("subscribeFinish");
            this.loadMedic();
            this.loadPacient();
          })
        }
      );
      console.log("id", this.id);
      console.log("consultation", this.consultation);
      console.log("medicines", this.medicines);
      // this.getConsultation()
      // this.loadMedicines();
  }

  loadPacient() {
    this.pacientService.getPacient(this.consultation.pacientId).subscribe(pacient => {
      this.pacient = pacient;
    })
  }

  loadMedic() {
    this.medicService.getMedic(this.consultation.medicId).subscribe(medic => {
      this.medic = medic;
    })
  }
  
  // getConsultation() {
  //   this.consultationService.getConsultation(this.id).subscribe(consultation => {
  //     this.consultation = consultation;
  //     this.medicines = this.consultation.treatment.split("; ");
  //     //console.log(this.medicines);
  //     return this.medicines;
  //   })
  // }

  // loadMedicines() {
  //   console.log("id = ", this.id);
  //   this.medicines = this.getConsultation();
  //   this.medicines.forEach(function (medicine) {
  //     console.log("medicine = ", medicine);
  //   });
  //   console.log("medicines = ", this.medicines);
  // }

}
