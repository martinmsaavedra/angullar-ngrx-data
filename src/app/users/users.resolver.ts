import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserEntityService } from '../users/services/users-entity.service';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class UsersResolver implements Resolve<boolean> {
  constructor(private userService: UserEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.userService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
