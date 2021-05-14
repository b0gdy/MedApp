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

  constructor(private pacientAccountService: PacientAccountService, private pacientService: PacientService, 
    private toastr: ToastrService) {
    this.pacientAccountService.currentPacient$.pipe(take(1)).subscribe(pacient => this.pacient = pacient)
   }

  ngOnInit(): void {
    this.loadPacient();
  }

  editPacient(form: NgForm) {
    const firstName = this.pacient.firstName;
    const lastName = this.pacient.lastName;
    this.pacientService.editPacient(this.pacient).subscribe(() => {
      this.toastr.success('Profile updated successfully');
    })
    form.reset();
  }

  loadPacient() {
    this.pacientService.getPacient(this.pacient.id).subscribe(pacient => {
      this.pacient = pacient;
    })
  }

}
