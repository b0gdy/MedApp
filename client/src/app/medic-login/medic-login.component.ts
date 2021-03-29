import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MedicAccountService } from '../_services/medic-account.service';

@Component({
  selector: 'app-medic-login',
  templateUrl: './medic-login.component.html',
  styleUrls: ['./medic-login.component.css']
})
export class MedicLoginComponent implements OnInit {
  @Output() cancelMedicRegister = new EventEmitter();
  model: any = {}

  constructor(public medicAccountService: MedicAccountService, private router: Router, private toastr: ToastrService, ) { }

  ngOnInit(): void {
  }

  loginMedic() {
    this.medicAccountService.loginMedic(this.model).subscribe(response => {
      this.cancelMedic();
      this.router.navigateByUrl('/medic-detail');
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  logoutMedic() {
    this.cancelMedic();
    this.medicAccountService.logoutMedic();
    this.router.navigateByUrl('/');
  }

  cancelMedic() {
    this.cancelMedicRegister.emit(false);
  }

}
