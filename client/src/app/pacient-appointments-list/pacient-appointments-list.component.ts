import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Appointment } from '../_models/appointment';
import { Pacient } from '../_models/pacient';
import { PacientMember } from '../_models/pacientMember';
import { AppointmentService } from '../_services/appointment.service';
import { PacientAccountService } from '../_services/pacient-account.service';
import { PacientMemberService } from '../_services/pacient-member.service';
import { PacientService } from '../_services/pacient.service';


@Component({
  selector: 'app-pacient-appointments-list',
  templateUrl: './pacient-appointments-list.component.html',
  styleUrls: ['./pacient-appointments-list.component.css']
})
export class PacientAppointmentsListComponent implements OnInit {
  pacientMember: PacientMember;
  appointments: Appointment[];
  pacient: Pacient;

  constructor(private pacientAccountService: PacientAccountService, private pacientService: PacientService, 
    private pacientMemberService: PacientMemberService, private appointmentService: AppointmentService) {
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
      this.appointments = [...this.pacientMember.appointments];
    })
  }

}
