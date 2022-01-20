import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { UsersModel } from '../../models/users.model';
import { UserEntityService } from '../../services/users-entity.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss'],
})
export class UsersGridComponent implements OnInit {
  users$: Observable<UsersModel[]> | undefined;
  editMode: boolean = false;
  items!: MenuItem[];

  constructor(
    private userService: UserEntityService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.entities$;
    this.items = [
      {
          label: "Add User",
          icon: 'pi pi-pencil',
          command: () => {
            const ref = this.dialogService.open(UserModalComponent, {
              data: {
                mode: "create"
              },
              header: 'Add User',
              width: '30%',
            });
          }
      },
    ]
  }

  editUser(user: UsersModel) {
    const ref = this.dialogService.open(UserModalComponent, {
      data: user,
      header: 'Edit User',
      width: '30%',
    });
  }
}
