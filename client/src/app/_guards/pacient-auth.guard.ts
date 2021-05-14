import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PacientAccountService } from '../_services/pacient-account.service';

@Injectable({
  providedIn: 'root'
})
export class PacientAuthGuard implements CanActivate {
  constructor(private pacientAccountService: PacientAccountService, private toastr: ToastrService) {}

  canActivate(): Observable<boolean> {
    return this.pacientAccountService.currentPacient$.pipe(
      map(pacient => {
        if (pacient) return true;
        this.toastr.error('Pacient access denied!')
      })
    );
  }
  
}
