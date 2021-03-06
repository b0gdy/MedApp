import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MedicAccountService } from '../_services/medic-account.service';
import { PacientAccountService } from '../_services/pacient-account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  // users: any;

  constructor( /*private http: HttpClient*/ public medicAccountService: MedicAccountService,
    public pacientAccountService: PacientAccountService) { }

  ngOnInit(): void {
    // this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  /*
  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe(users => this.users = users);
  }
  */

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}
