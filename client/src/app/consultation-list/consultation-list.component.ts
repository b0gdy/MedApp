import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Consultation } from '../_models/consultation';
import { Medic } from '../_models/medic';
import { MedicMember } from '../_models/medicMember';
import { Pacient } from '../_models/pacient';
import { PacientMember } from '../_models/pacientMember';
import { ConsultationService } from '../_services/consultation.service';
import { MedicAccountService } from '../_services/medic-account.service';
import { MedicMemberService } from '../_services/medic-member.service';
import { MedicService } from '../_services/medic.service';
import { PacientMemberService } from '../_services/pacient-member.service';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.css']
})
export class ConsultationListComponent implements OnInit {
  medicMember: MedicMember;
  consultations: Consultation[];
  medic: Medic;
  model: any = {};
  pacient: Pacient;
  pacientMember: PacientMember;
  searched: boolean;
  consultation: Consultation;

  constructor(private medicAccountService: MedicAccountService, private medicService: MedicService, 
    private medicMemberService: MedicMemberService, private consultationService: ConsultationService,
    private pacientService: PacientService, private pacientMemberService: PacientMemberService,
    private toastr: ToastrService) {
    this.medicAccountService.currentMedic$.pipe(take(1)).subscribe(medic => this.medic = medic)
   }

  ngOnInit(): void {
    // this.loadMedicMember();
    // this.loadConsultations();
    this.searched = false;
  }

  loadMedicMember() {
    this.medicMemberService.getMedicMember(this.medic.userName).subscribe(medicMember => {
      this.medicMember = medicMember;
      this.consultations = [...this.medicMember.consultations];
    })
  }

  loadConsultations() {
    this.consultationService.getConsultations().subscribe(consultations => {
      this.consultations = consultations;
    })
  }

  search(form: NgForm) {
    // this.pacientMember.userName = this.model.userName;
    // console.log("pacientMember.userName = ", this.pacientMember.userName);
    console.log("model.userName = ", this.model.userName);
    this.searched = true;
    // this.loadMedicMember()
    // this.loadConsultations();
    this.pacientMemberService.getPacientMember(this.model.userName).subscribe(pacientMember => {
      this.pacientMember = pacientMember;
      if (this.pacientMember == null) {
        this.toastr.error('Username incorect!');
      } else {
        this.toastr.success('Pacient găsit!');
        this.consultations = [...this.pacientMember.consultations];
      }
    })
  }

}
