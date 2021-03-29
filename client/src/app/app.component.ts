import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Medic } from './_models/medic';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { MedicAccountService } from './_services/medic-account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MedApp';
  users: any;
  medics: any;

  constructor(private accountService: AccountService, private medicAccountService: MedicAccountService) {}

  ngOnInit(){
    this.setCurrentUser();
    this.setCurrentMedic();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  setCurrentMedic() {
    const medic: Medic = JSON.parse(localStorage.getItem('medic'));
    this.medicAccountService.setCurrentMedic(medic);
  }
}
