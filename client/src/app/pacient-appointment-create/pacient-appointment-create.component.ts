import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Appointment } from '../_models/appointment';
import { Medic } from '../_models/medic';
import { MedicMember } from '../_models/medicMember';
import { Pacient } from '../_models/pacient';
import { PacientMember } from '../_models/pacientMember';
import { AppointmentService } from '../_services/appointment.service';
import { MedicMemberService } from '../_services/medic-member.service';
import { MedicService } from '../_services/medic.service';
import { PacientAccountService } from '../_services/pacient-account.service';
import { PacientMemberService } from '../_services/pacient-member.service';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-pacient-appointment-create',
  templateUrl: './pacient-appointment-create.component.html',
  styleUrls: ['./pacient-appointment-create.component.css']
})
export class PacientAppointmentCreateComponent implements OnInit {
  @ViewChild('createForm') createAppointmentForm: NgForm;
  appointment: Appointment;
  pacient: Pacient;
  pacientMember: PacientMember;
  medic: Medic;
  medicMember: MedicMember;
  model: any = {};
  modelMedic: string;
  modelDate: string;
  Hours: string[] = ["08", "09", "10", "11", "12", "13", "14", "15"];
  Minutes: string[] = ["00", "15", "30", "45"];
  modelHour: string = "";
  modelMinute: string;
  currentDate: number = Date.now();
  today = new Date();
  tomorrow =  new Date();

  constructor(private appointmentServcie: AppointmentService, private toastr: ToastrService,
    private pacientAccountService: PacientAccountService, private pacientService: PacientService,
    private pacientMemberService: PacientMemberService, private medicService: MedicService,
    private medicMemberService: MedicMemberService) { 
      this.pacientAccountService.currentPacient$.pipe(take(1)).subscribe(pacient => this.pacient = pacient)
    }

  ngOnInit(): void {
    console.log("today = ", this.today);
    this.tomorrow.setDate(this.today.getDate() + 1)
    console.log("tomorrow = ", this.tomorrow);
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

  createAppointment(form: NgForm) {
    this.model.pacientId = this.pacient.id;
    console.log("model.pacientId = " + this.model.pacientId);
    this.medicMemberService.getMedicMember(this.modelMedic).subscribe(medicMember => {
      this.medicMember = medicMember;
      if (this.medicMember == null) {
        this.toastr.error('Medic Username does not exits!');
      } else {
        console.log("medicMember.userName = " + this.medicMember.userName)
        this.model.medicId = this.medicMember.id;
        console.log("model.medicId = " + this.model.medicId);
        console.log("modelHour = " + this.modelHour);
        console.log("modelMinute = " + this.modelMinute);
        this.model.date = "";
        this.model.date = this.model.date.concat(this.model.medicId , '-', this.modelDate, '-', this.modelHour, ":", this.modelMinute);
        console.log("model.date = " + this.model.date);
        this.appointmentServcie.registerAppointment(this.model).subscribe(response => {
          console.log(response);
          this.toastr.success('Programare creată!');
        }, error => {
          console.log(error);
          this.toastr.error(error.error);
        })
      }
    })
  }

}
