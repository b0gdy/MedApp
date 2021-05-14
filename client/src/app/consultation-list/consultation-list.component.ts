import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Consultation } from '../_models/consultation';
import { Medic } from '../_models/medic';
import { MedicMember } from '../_models/medicMember';
import { ConsultationService } from '../_services/consultation.service';
import { MedicAccountService } from '../_services/medic-account.service';
import { MedicMemberService } from '../_services/medic-member.service';
import { MedicService } from '../_services/medic.service';

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.css']
})
export class ConsultationListComponent implements OnInit {
  medicMember: MedicMember;
  consultations: Consultation[];
  medic: Medic;
  

  constructor(private medicAccountService: MedicAccountService, private medicService: MedicService, 
    private medicMemberService: MedicMemberService, private consultationService: ConsultationService) {
    this.medicAccountService.currentMedic$.pipe(take(1)).subscribe(medic => this.medic = medic)
   }

  ngOnInit(): void {
    this.loadMedicMember();
  }

  loadMedicMember() {
    this.medicMemberService.getMedicMember(this.medic.userName).subscribe(medicMember => {
      this.medicMember = medicMember;
      this.consultations = [...this.medicMember.consultations];
    })
  }

}
