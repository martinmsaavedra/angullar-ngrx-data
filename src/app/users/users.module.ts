import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './users-routing.module';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';
import { UserEntityService } from '../users/services//users-entity.service';
import { UsersResolver } from './users.resolver';
import { UserDataService } from './services/users-data.service';
import { DropdownModule } from 'primeng/dropdown';
import { UsersGridComponent } from './components/user-grid/users-grid.component';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { compareUsers } from './models/users.model';
import {SpeedDialModule} from 'primeng/speeddial';


const entityMetada: EntityMetadataMap = {
  User: {
    sortComparer: compareUsers,
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
};

@NgModule({
  declarations: [UsersGridComponent, UserModalComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    DropdownModule,
    ButtonModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    InputTextModule,
    SpeedDialModule
  ],
  providers: [UserEntityService, UsersResolver, UserDataService, DialogService],
})
export class UserModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private userDataService: UserDataService
  ) {
    eds.registerMetadataMap(entityMetada);
    entityDataService.registerService('User', userDataService);
  }
}
