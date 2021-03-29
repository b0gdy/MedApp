import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MedicAccountService } from '../_services/medic-account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService, 
    public medicAccountService: MedicAccountService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  loginMedic() {
    this.medicAccountService.loginMedic(this.model).subscribe(response => {
      this.router.navigateByUrl('/medic-detail');
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  logoutMedic() {
    this.medicAccountService.logoutMedic();
    this.router.navigateByUrl('/');
  }
}
