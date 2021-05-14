import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Consultation } from '../_models/consultation';
import { Medic } from '../_models/medic';
import { MedicMember } from '../_models/medicMember';
import { ConsultationService } from '../_services/consultation.service';
import { MedicAccountService } from '../_services/medic-account.service';
import { MedicMemberService } from '../_services/medic-member.service';
import { MedicService } from '../_services/medic.service';

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
  modelMedic: any = {};
  medicMember: MedicMember;

  constructor(private consultationService: ConsultationService, private toastr: ToastrService,
    private medicAccountService: MedicAccountService, private medicService: MedicService,
    private medicMemberService: MedicMemberService) {
      this.medicAccountService.currentMedic$.pipe(take(1)).subscribe(medic => this.medic = medic);
      this.model.medicId = this.medic.id
  }

  ngOnInit(): void {
  }

  addMedicine(form: NgForm) {
    const medicine = this.modelMedicine.medicine;
    this.medicines.push(this.modelMedicine.medicine);
    // console.log("this.medicines = ");
    console.log(this.medicines);
  }

  createConsultation(form: NgForm) {
    const treatment = this.model.treatment;
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
    const medicId = this.model.medicId;
    const pacientUsername = this.model.pacientUsername;
    this.modelMedic.userName = this.model.pacientUsername;
    console.log("this.modelMedic.userName = " + this.modelMedic.userName);
    this.medicMemberService.getMedicMember(this.modelMedic.userName).subscribe(medicMember => {
      this.modelMedic.id= medicMember.id;
      console.log("medicMember.id = " + medicMember.id)
      console.log("this.modelMedic.id = " + this.modelMedic.id)
      this.model.pacientId = this.modelMedic.id;
      console.log("this.modelMedic.id = " + this.modelMedic.id)
      console.log("this.model = ")
      this.model.pacientUsername = "pacient1";
      console.log(this.model)
      this.consultationService.createConsultation(this.model).subscribe(response => {
        this.toastr.success('Consultation created successfully')
        console.log(response);
      }, error => {
        console.log(error);
        this.toastr.error(error.error);
      })
      form.reset();
    })
  }

}
