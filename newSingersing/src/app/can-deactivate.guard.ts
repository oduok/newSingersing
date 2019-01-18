import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';
import {DialogService} from './dialog.service';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})

export interface CanComponentDeactivate {
  dialogService: DialogService;
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.dialogService.confirm('Discard changes?') : true;
  }
}
