import { Component, Input, OnInit } from '@angular/core';
import { Consultation } from '../_models/consultation';
import { Medic } from '../_models/medic';
import { Pacient } from '../_models/pacient';
import { MedicService } from '../_services/medic.service';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-consultation-card',
  templateUrl: './consultation-card.component.html',
  styleUrls: ['./consultation-card.component.css']
})
export class ConsultationCardComponent implements OnInit {
  @Input() consultation: Consultation;
  // @Input() index: number;
  pacient: Pacient;
  medic: Medic;

  constructor(private pacientService: PacientService, private medicService: MedicService) { }

  ngOnInit(): void {
    this.loadMedic();
    this.loadPacient();
  }

  loadPacient() {
    this.pacientService.getPacient(this.consultation.pacientId).subscribe(pacient => {
      this.pacient = pacient;
    })
  }

  loadMedic() {
    this.medicService.getMedic(this.consultation.medicId).subscribe(medic => {
      this.medic = medic;
    })
  }

}
