import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Pacient } from '../_models/pacient';
import { PacientMember } from '../_models/pacientMember';
import { PacientAccountService } from '../_services/pacient-account.service';
import { PacientMemberService } from '../_services/pacient-member.service';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-pacient-detail',
  templateUrl: './pacient-detail.component.html',
  styleUrls: ['./pacient-detail.component.css']
})
export class PacientDetailComponent implements OnInit {
  pacient: Pacient;
  pacientMember: PacientMember;

  constructor(private pacientAccountService: PacientAccountService, private pacientService: PacientService, 
    private pacientMemberService: PacientMemberService) {
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
    })
  }

}
