import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedicAccountService } from '../_services/medic-account.service';

@Injectable({
  providedIn: 'root'
})
export class MedicAuthGuard implements CanActivate {
  constructor(private medicAccountService: MedicAccountService, private toastr: ToastrService) {}

  canActivate(): Observable<boolean> {
    return this.medicAccountService.currentMedic$.pipe(
      map(medic => {
        if (medic) return true;
        this.toastr.error('Medic access denied!')
      })
    );
  }
  
}
