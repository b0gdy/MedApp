import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PacientAccountService } from '../_services/pacient-account.service';

@Component({
  selector: 'app-pacient-login',
  templateUrl: './pacient-login.component.html',
  styleUrls: ['./pacient-login.component.css']
})
export class PacientLoginComponent implements OnInit {
  @Output() cancelPacientRegister = new EventEmitter();
  model: any = {}

  constructor(public pacientAccountService: PacientAccountService, private router: Router, private toastr: ToastrService, ) { }

  ngOnInit(): void {
  }

  loginPacient() {
    this.pacientAccountService.loginPacient(this.model).subscribe(response => {
      this.cancelPacient();
      this.router.navigateByUrl('/pacient-detail');
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  logoutPacient() {
    this.cancelPacient();
    this.pacientAccountService.logoutPacient();
    this.router.navigateByUrl('/');
  }

  cancelPacient() {
    this.cancelPacientRegister.emit(false);
  }

}
