import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Consultation } from '../_models/consultation';
import { Medic } from '../_models/medic';
import { MedicMember } from '../_models/medicMember';
import { Pacient } from '../_models/pacient';
import { PacientMember } from '../_models/pacientMember';
import { ConsultationService } from '../_services/consultation.service';
import { MedicAccountService } from '../_services/medic-account.service';
import { MedicMemberService } from '../_services/medic-member.service';
import { MedicService } from '../_services/medic.service';
import { PacientMemberService } from '../_services/pacient-member.service';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-consultation-create',
  templateUrl: './consultation-create.component.html',
  styleUrls: ['./consultation-create.component.css']
})
export class ConsultationCreateComponent implements OnInit {
  @ViewChild('createForm') editMedicForm: NgForm;
  consultation: Consultation;
  medic: Medic;
  medicines: string[] = [];
  medString: string = "";
  model: any = {};
  modelMedicine: any = {};
  modelPacient: any = {};
  medicMember: MedicMember;
  pacient: Pacient;
  pacientMember: PacientMember;
  valid1: boolean;
  valid2: boolean;

  constructor(private consultationService: ConsultationService, private toastr: ToastrService,
    private medicAccountService: MedicAccountService, private medicService: MedicService,
    private medicMemberService: MedicMemberService, private pacientService: PacientService,
    private pacientMemberService: PacientMemberService) {
      this.medicAccountService.currentMedic$.pipe(take(1)).subscribe(medic => this.medic = medic);
  }

  ngOnInit(): void {
    this.valid1=false;
    this.valid2=false;
  }

  addMedicine(form: NgForm) {
    this.medicines.push(this.modelMedicine.medicine);
    // console.log("this.medicines = ");
    console.log(this.medicines);
    form.reset();
    this.valid1=true;
  }

  selectPacient(form:NgForm) {
    this.pacientMemberService.getPacientMember(this.modelPacient.userName).subscribe(respone => {
      this.pacientMember = respone;
      if (this.pacientMember == null) {
        this.toastr.error('Pacient Username does not exits!');
        this.valid2=false;
      } else {
        this.toastr.success('Pacient selected successfully');
        this.model.pacientId = this.pacientMember.id;
        console.log("this.model.pacientId = " + this.model.pacientId);
        this.valid2=true;
      }
    })
  }

  createConsultation(form: NgForm) {
    console.log("this.medicines = ");
    console.log(this.medicines);
    for(var index in this.medicines) {
      console.log("this.medicines[" + index + "] = " + this.medicines[index]);
      this.medString = this.medString.toString().concat(this.medicines[index].toString(), '; ');
      console.log("this.medString = " + this.medString);
    }
    console.log("this.medString = " + this.medString);
    this.model.treatment = this.medString.slice(0, -2);
    console.log("this.model.treatment = " + this.model.treatment);
    this.model.medicId = this.medic.id;
    console.log("this.model.MedicId = " + this.model.medicId);
    console.log("this.modelPacient.userName = " + this.modelPacient.userName);
    console.log(this.model)
    this.consultationService.createConsultation(this.model).subscribe(response => {
      console.log(response);
      this.toastr.success('Consultation created successfully')
          console.log(response);
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
    form.reset();
    setTimeout(this.reload, 3.0*1000);
  }

  reload(){
    window.location.reload();
  }

}
