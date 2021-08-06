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
  Specialties: string[] = ["Medicină de familie", "Cardiologie", "Dermatovenerologie", "Neurologie", "Pediatrie"];

  constructor(private medicAccountService: MedicAccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  registerMedic() {
    // console.log("model.username = ", this.model.username);
    // console.log("model.password = ", this.model.password);
    // console.log("model.firstname = ", this.model.firstname);
    // console.log("model.lastname = ", this.model.lastname);
    // console.log("model.specialty = ", this.model.specialty);
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
