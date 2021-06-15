import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './_modules/shared.module';
import { MedicRegisterComponent } from './medic-register/medic-register.component';
import { MedicDetailComponent } from './medic-detail/medic-detail.component';
import { MedicLoginComponent } from './medic-login/medic-login.component';
import { MedicEditComponent } from './medic-edit/medic-edit.component';
import { MedicConsultationsComponent } from './medic-consultations/medic-consultations.component';
import { ConsultationCardComponent } from './consultation-card/consultation-card.component';
import { ConsultationDetailComponent } from './consultation-detail/consultation-detail.component';
import { ConsultationListComponent } from './consultation-list/consultation-list.component';
import { ConsultationCreateComponent } from './consultation-create/consultation-create.component';
import { PacientLoginComponent } from './pacient-login/pacient-login.component';
import { PacientRegisterComponent } from './pacient-register/pacient-register.component';
import { PacientDetailComponent } from './pacient-detail/pacient-detail.component';
import { PacientEditComponent } from './pacient-edit/pacient-edit.component';
import { PacientConsultationsComponent } from './pacient-consultations/pacient-consultations.component';
import { PacientConsultationsListComponent } from './pacient-consultations-list/pacient-consultations-list.component';
import { PacientAppointmentsComponent } from './pacient-appointments/pacient-appointments.component';
import { PacientAppointmentsListComponent } from './pacient-appointments-list/pacient-appointments-list.component';
import { PacientAppointmentCardComponent } from './pacient-appointment-card/pacient-appointment-card.component';
import { PacientAppointmentCreateComponent } from './pacient-appointment-create/pacient-appointment-create.component';
import { MedicAppointmentsComponent } from './medic-appointments/medic-appointments.component';
import { MedicAppointmentsListComponent } from './medic-appointments-list/medic-appointments-list.component';
import { MedicAppointmentCardComponent } from './medic-appointment-card/medic-appointment-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    MedicRegisterComponent,
    MedicDetailComponent,
    MedicLoginComponent,
    MedicEditComponent,
    MedicConsultationsComponent,
    ConsultationCardComponent,
    ConsultationDetailComponent,
    ConsultationListComponent,
    ConsultationCreateComponent,
    PacientLoginComponent,
    PacientRegisterComponent,
    PacientDetailComponent,
    PacientEditComponent,
    PacientConsultationsComponent,
    PacientConsultationsListComponent,
    PacientAppointmentsComponent,
    PacientAppointmentsListComponent,
    PacientAppointmentCardComponent,
    PacientAppointmentCreateComponent,
    MedicAppointmentsComponent,
    MedicAppointmentsListComponent,
    MedicAppointmentCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
