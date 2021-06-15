import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../_models/appointment';
import { Medic } from '../_models/medic';
import { Pacient } from '../_models/pacient';
import { MedicService } from '../_services/medic.service';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-pacient-appointment-card',
  templateUrl: './pacient-appointment-card.component.html',
  styleUrls: ['./pacient-appointment-card.component.css']
})
export class PacientAppointmentCardComponent implements OnInit {
  @Input() appointment: Appointment;
  pacient: Pacient;
  medic: Medic;
  date: String;
  dateAux: String;
  hour: String 

  constructor(private pacientService: PacientService, private medicService: MedicService) { }

  ngOnInit(): void {
    this.loadMedic();
    this.loadPacient();
    this.dateAux = this.appointment.date.substr(this.appointment.date.length - 16);
    this.date = this.dateAux.substr(0, 10);
    this.hour = this.dateAux.substr(this.dateAux.length - 5);
  }

  loadPacient() {
    this.pacientService.getPacient(this.appointment.pacientId).subscribe(pacient => {
      this.pacient = pacient;
    })
  }

  loadMedic() {
    this.medicService.getMedic(this.appointment.medicId).subscribe(medic => {
      this.medic = medic;
    })
  }

}
