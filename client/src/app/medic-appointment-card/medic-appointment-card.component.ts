import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../_models/appointment';
import { Medic } from '../_models/medic';
import { Pacient } from '../_models/pacient';
import { MedicService } from '../_services/medic.service';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-medic-appointment-card',
  templateUrl: './medic-appointment-card.component.html',
  styleUrls: ['./medic-appointment-card.component.css']
})
export class MedicAppointmentCardComponent implements OnInit {
  @Input() appointment: Appointment;
  medic: Medic;
  pacient: Pacient;
  date: String;
  dateAux: String;
  hour: String;
  currentDate: String;

  constructor(private medicService: MedicService, private pacientService: PacientService) { }

  ngOnInit(): void {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    console.log("currentDate  = ", this.currentDate);
    this.loadMedic();
    this.loadPacient();
    this.dateAux = this.appointment.date.substr(this.appointment.date.length - 16);
    console.log("dateAux= ", this.dateAux);
    this.date = this.dateAux.substr(0, 10);
    console.log("date = ", this.date);
    this.hour = this.dateAux.substr(this.dateAux.length - 5);
    console.log("hour = ", this.hour);
  }

  loadMedic() {
    this.medicService.getMedic(this.appointment.medicId).subscribe(medic => {
      this.medic = medic;
    })
  }

  loadPacient() {
    this.pacientService.getPacient(this.appointment.pacientId).subscribe(pacient => {
      this.pacient = pacient;
    })
  }

}
