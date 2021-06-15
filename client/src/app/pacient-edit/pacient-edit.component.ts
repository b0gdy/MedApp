import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Pacient } from '../_models/pacient';
import { PacientAccountService } from '../_services/pacient-account.service';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-pacient-edit',
  templateUrl: './pacient-edit.component.html',
  styleUrls: ['./pacient-edit.component.css']
})
export class PacientEditComponent implements OnInit {
  @ViewChild('editForm') editPacientForm: NgForm;
  pacient: Pacient;
  model: any = {};
  currentDate: number = Date.now();

  constructor(private pacientAccountService: PacientAccountService, private pacientService: PacientService, 
    private toastr: ToastrService) {
    this.pacientAccountService.currentPacient$.pipe(take(1)).subscribe(pacient => this.pacient = pacient)
   }

  ngOnInit(): void {
    this.loadPacient();
  }

  editPacient(form: NgForm) {

    this.pacient.firstName = this.model.firstName;
    this.pacient.lastName = this.model.lastName;
    this.pacient.gender = this.model.gender;
    this.pacient.birthDate = this.model.birthDate;
    // console.log("pacient.firstName = ", this.pacient.firstName);
    // console.log("pacient.lastName = ", this.pacient.lastName);
    // console.log("pacient.gender = ", this.pacient.gender);
    // console.log("pacient.birthDate = ", this.pacient.birthDate);
    this.pacientService.editPacient(this.pacient).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.loadPacient();
    })
    form.reset();
  }

  loadPacient() {
    this.pacientService.getPacient(this.pacient.id).subscribe(pacient => {
      this.pacient = pacient;
    })
  }

}
