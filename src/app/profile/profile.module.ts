import { NgModule } from '@angular/core';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CommonModule } from '@angular/common';
import { TaskerMaterialModule } from '../tasker-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../users/user/user.service';

@NgModule({
    imports: [
        CommonModule,
        TaskerMaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        EditProfileComponent
    ],
    declarations: [
        EditProfileComponent
    ],
    providers: [
        UserService
    ],
    entryComponents: [
        EditProfileComponent
    ]
})
export class ProfileModule { }
