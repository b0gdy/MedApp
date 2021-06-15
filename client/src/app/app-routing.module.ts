import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationCreateComponent } from './consultation-create/consultation-create.component';
import { ConsultationDetailComponent } from './consultation-detail/consultation-detail.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MedicAppointmentsComponent } from './medic-appointments/medic-appointments.component';
import { MedicConsultationsComponent } from './medic-consultations/medic-consultations.component';
import { MedicDetailComponent } from './medic-detail/medic-detail.component';
import { MedicEditComponent } from './medic-edit/medic-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { PacientAppointmentsComponent } from './pacient-appointments/pacient-appointments.component';
import { PacientConsultationsComponent } from './pacient-consultations/pacient-consultations.component';
import { PacientDetailComponent } from './pacient-detail/pacient-detail.component';
import { PacientEditComponent } from './pacient-edit/pacient-edit.component';
import { AuthGuard } from './_guards/auth.guard';
import { MedicAuthGuard } from './_guards/medic-auth.guard';
import { PacientAuthGuard } from './_guards/pacient-auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [PacientAuthGuard],
    children: [
      {path: 'pacient-detail', component: PacientDetailComponent},
      {path: 'pacient-edit', component: PacientEditComponent},
      {path: 'pacient-consultations', component: PacientConsultationsComponent, children: [
        {path: ":id", component: ConsultationDetailComponent },
      ]},
      {path: 'pacient-appointments', component: PacientAppointmentsComponent},
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [MedicAuthGuard],
    children: [
      {path: 'medic-detail', component: MedicDetailComponent},
      {path: 'medic-edit', component: MedicEditComponent},
      {path: 'consultation-create', component: ConsultationCreateComponent},
      {path: 'medic-consultations', component: MedicConsultationsComponent, children: [
        {path: ":id", component: ConsultationDetailComponent },
      ]},
      {path: 'medic-appointments', component: MedicAppointmentsComponent},
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
      {path: 'members/:id', component: MemberDetailComponent},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
  },
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
