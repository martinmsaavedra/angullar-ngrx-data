import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersModel } from '../models/users.model';

@Injectable()
export class UserDataService extends DefaultDataService<UsersModel> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('User', http, httpUrlGenerator);
  }

  getAll(): Observable<UsersModel[]> {
    return this.http
      .get<any>('https://reqres.in/api/users')
      .pipe(map((res) => res['data']));
  }

  update(user: Update<UsersModel>): Observable<UsersModel> {
    return this.http
      .post<UsersModel>(`https://reqres.in/api/user/${user.id}`, {...user.changes})
  }

  add(user:UsersModel): Observable<UsersModel> {
    return this.http
      .post<UsersModel>(`https://reqres.in/api/users/`, user)
  }

  delete(id:string): Observable<any>{
    return this.http.delete(`https://reqres.in/api/user/${id}`)
  }
}
