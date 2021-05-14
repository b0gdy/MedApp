import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Consultation } from '../_models/consultation';
import { Pacient } from '../_models/pacient';
import { PacientMember } from '../_models/pacientMember';
import { ConsultationService } from '../_services/consultation.service';
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

  constructor(private pacientAccountService: PacientAccountService, private pacientService: PacientService, 
    private pacientMemberService: PacientMemberService, private consultationService: ConsultationService) {
    this.pacientAccountService.currentPacient$.pipe(take(1)).subscribe(pacient => this.pacient = pacient)
   }

  ngOnInit(): void {
    this.loadPacient();
    this.loadPacientMember();
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

}
