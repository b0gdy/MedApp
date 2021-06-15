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
import { MedicMemberService } from '../_services/medic-member.service';
import { MedicService } from '../_services/medic.service';
import { PacientAccountService } from '../_services/pacient-account.service';
import { PacientMemberService } from '../_services/pacient-member.service';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-pacient-consultations-list',
  templateUrl: './pacient-consultations-list.component.html',
  styleUrls: ['./pacient-consultations-list.component.css']
})
export class PacientConsultationsListComponent implements OnInit {
  pacientMember: PacientMember;
  consultations: Consultation[];
  pacient: Pacient;
  searched: boolean;
  medic: Medic;
  model: any = {};
  medicMember: MedicMember;

  constructor(private pacientAccountService: PacientAccountService, private pacientService: PacientService, 
    private pacientMemberService: PacientMemberService, private consultationService: ConsultationService,
    private medicService: MedicService, private medicMemberService: MedicMemberService,
    private toastr: ToastrService) {
    this.pacientAccountService.currentPacient$.pipe(take(1)).subscribe(pacient => this.pacient = pacient)
   }

  ngOnInit(): void {
    // this.loadPacient();
    // this.loadPacientMember();
    this.searched = false;
  }

  loadPacient() {
    this.pacientService.getPacient(this.pacient.id).subscribe(pacient => {
      this.pacient = pacient;
    })
  }

  loadPacientMember() {
    this.pacientMemberService.getPacientMember(this.pacient.userName).subscribe(pacientMember => {
      this.pacientMember = pacientMember;
      this.consultations = [...this.pacientMember.consultations];
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
    this.medicMemberService.getMedicMember(this.model.userName).subscribe(response => {
      this.medicMember = response;
      if (this.medicMember == null) {
        this.toastr.error('Username incorect!');
      } else {
        this.toastr.success('Medic găsit!');
        this.consultations = [...this.medicMember.consultations];
      }
    })
  }

}
