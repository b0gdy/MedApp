import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Medic } from '../_models/medic';
import { MedicMember } from '../_models/medicMember';
import { User } from '../_models/user';
import { MedicAccountService } from '../_services/medic-account.service';
import { MedicMemberService } from '../_services/medic-member.service';
import { MedicService } from '../_services/medic.service';

@Component({
  selector: 'app-medic-detail',
  templateUrl: './medic-detail.component.html',
  styleUrls: ['./medic-detail.component.css']
})
export class MedicDetailComponent implements OnInit {
  medic: Medic;
  medicMember: MedicMember;

  constructor(private medicAccountService: MedicAccountService, private medicService: MedicService, 
    private medicMemberService: MedicMemberService) {
    this.medicAccountService.currentMedic$.pipe(take(1)).subscribe(medic => this.medic = medic)
   }

  ngOnInit(): void {
    this.loadMedicMember();
  }

  loadMedicMember() {
    this.medicMemberService.getMedicMember(this.medic.userName).subscribe(medicMember => {
      this.medicMember = medicMember;
    })
  }

}
