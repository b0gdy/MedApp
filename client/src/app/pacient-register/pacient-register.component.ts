import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PacientAccountService } from '../_services/pacient-account.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-pacient-register',
  templateUrl: './pacient-register.component.html',
  styleUrls: ['./pacient-register.component.css']
})
export class PacientRegisterComponent implements OnInit {
  @Output() cancelPacientRegister = new EventEmitter();
  model: any = {};
  currentDate: number = Date.now();

  constructor(private pacientAccountService: PacientAccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  registerPacient() {
    // console.log("model.userName = ", this.model.userName);
    // console.log("model.password = ", this.model.password);
    // console.log("model.firstName = ", this.model.firstName);
    // console.log("model.lastName = ", this.model.lastName);
    // console.log("model.gender = ", this.model.gender);
    // // console.log("currentDate = ", this.currentDate);
    // console.log("model.birthDate = ", this.model.birthDate);
    this.pacientAccountService.registerPacient(this.model).subscribe(response => {
      console.log(response);
      this.cancelPacient();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  cancelPacient() {
    this.cancelPacientRegister.emit(false);
  }

}
