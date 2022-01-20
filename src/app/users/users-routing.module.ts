import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersGridComponent } from './components/user-grid/users-grid.component';
import { UsersResolver } from './users.resolver';

const routes: Routes = [
  {
    path: "usuarios", component: UsersGridComponent, resolve: { users: UsersResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
