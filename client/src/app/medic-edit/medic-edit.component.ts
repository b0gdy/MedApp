import { formatCurrency } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Medic } from '../_models/medic';
import { MedicAccountService } from '../_services/medic-account.service';
import { MedicService } from '../_services/medic.service';

@Component({
  selector: 'app-medic-edit',
  templateUrl: './medic-edit.component.html',
  styleUrls: ['./medic-edit.component.css']
})
export class MedicEditComponent implements OnInit {
  @ViewChild('editForm') editMedicForm: NgForm;
  medic: Medic;

  constructor(private medicAccountService: MedicAccountService, private medicService: MedicService, 
    private toastr: ToastrService) {
    this.medicAccountService.currentMedic$.pipe(take(1)).subscribe(medic => this.medic = medic)
   }

  ngOnInit(): void {
    this.loadMedic();
  }

  editMedic(form: NgForm) {
    // const id = this.medic.id;
    // const username = this.medic.userName;
    // const firstName = this.medic.firstName;
    // const lastName = this.medic.lastName;
    const firstName = this.medic.firstName;
    // const lastName = form.value.lastName;
    const lastName = this.medic.lastName;
    const specialty = this.medic.specialty;
    this.medicService.editMedic(this.medic).subscribe(() => {
      this.toastr.success('Profile updated successfully');
    })
    // this.medic.firstName = "";
    // this.medic.lastName = "";
    form.reset();
  }

  loadMedic() {
    this.medicService.getMedic(this.medic.id).subscribe(medic => {
      this.medic = medic;
    })
  }

}
