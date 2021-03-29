import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MedicAccountService } from '../_services/medic-account.service';

@Component({
  selector: 'app-medic-register',
  templateUrl: './medic-register.component.html',
  styleUrls: ['./medic-register.component.css']
})
export class MedicRegisterComponent implements OnInit {
  @Output() cancelMedicRegister = new EventEmitter();
  model: any = {};

  constructor(private medicAccountService: MedicAccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  registerMedic() {
    this.medicAccountService.registerMedic(this.model).subscribe(response => {
      console.log(response);
      this.cancelMedic();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  cancelMedic() {
    this.cancelMedicRegister.emit(false);
  }

}
