import { NgModule } from '@angular/core';
import {    MatButtonModule,
            MatDialogModule,
            MatCheckboxModule,
            MatSelectModule,
            MatToolbarModule,
            MatChipsModule,
            MatIconModule,
            MatCardModule,
            MatListModule,
            MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [MatButtonModule, MatDialogModule, MatCheckboxModule,MatSelectModule, MatChipsModule, MatCardModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, FlexLayoutModule,MatInputModule],
    exports: [MatButtonModule, MatDialogModule, MatCheckboxModule,MatSelectModule, MatChipsModule, MatCardModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, FlexLayoutModule,MatInputModule],
})
export class TaskerMaterialModule { }
