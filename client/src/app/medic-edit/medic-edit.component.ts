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
  }

  editMedic() {
    const id = this.medic.id;
    const username = this.medic.userName;
    const firstName = this.medic.firstName;
    const lastName = this.medic.lastName;
    this.medicService.editMedic(this.medic).subscribe(() => {
      this.toastr.success('Profile updated successfully');
    })
  }

}
