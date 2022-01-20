import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersModel } from '../../models/users.model';
import { UserEntityService } from '../../services/users-entity.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  user!: UsersModel;
  profileForm!: FormGroup;
  mode: string | undefined | null = '';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private userService: UserEntityService
  ) {}

  ngOnInit(): void {
    const formControls = {
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    };

    this.user = this.config.data;
    this.mode = this.config.data.mode;
    this.profileForm = this.fb.group(formControls);
    this.profileForm.patchValue({ ...this.user });
  }

  onSubmit(event: any) {
    const submitUser: UsersModel = {
      ...this.user,
      ...this.profileForm.value,
      mode: '',
    };
    if (this.mode !== 'create' && event.submitter.innerText !== 'Delete') {
      this.userService.update(submitUser);
    } else if (this.mode === 'create') {
      this.userService.add(submitUser);
    } else if (event.submitter.innerText === 'Delete') {
      const id: string = this.user.id.toString();
      this.userService.delete(id);
    }
    this.ref.close();
  }
}
