import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Appointment } from '../_models/appointment';
import { Medic } from '../_models/medic';
import { MedicMember } from '../_models/medicMember';
import { Pacient } from '../_models/pacient';
import { AppointmentService } from '../_services/appointment.service';
import { MedicAccountService } from '../_services/medic-account.service';
import { MedicMemberService } from '../_services/medic-member.service';
import { MedicService } from '../_services/medic.service';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-medic-appointments-list',
  templateUrl: './medic-appointments-list.component.html',
  styleUrls: ['./medic-appointments-list.component.css']
})
export class MedicAppointmentsListComponent implements OnInit {
  medicMember: MedicMember;
  appointments: Appointment[];
  medic: Medic;
  currentDate: number = Date.now();

  constructor(private medicAccountService: MedicAccountService, private medicService: MedicService, 
    private medicMemberService: MedicMemberService, private appointmentService: AppointmentService) {
    this.medicAccountService.currentMedic$.pipe(take(1)).subscribe(medic => this.medic = medic)
   }

  ngOnInit(): void {
    this.loadMedic();
    this.loadMedicMember();
  }

  loadMedic() {
    this.medicService.getMedic(this.medic.id).subscribe(medic => {
      this.medic = medic;
    })
  }

  loadMedicMember() {
    this.medicMemberService.getMedicMember(this.medic.userName).subscribe(medicMember => {
      this.medicMember = medicMember;
      this.appointments = [...this.medicMember.appointments];
    })
  }

}
