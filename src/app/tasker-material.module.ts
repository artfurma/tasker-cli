import { NgModule } from '@angular/core';
import {    MatButtonModule,
            MatDialogModule,
            MatCheckboxModule,
            MatSelectModule,
            MatToolbarModule,
            MatChipsModule,
            MatIconModule,
            MatCardModule,
            MatGridListModule,
            MatListModule,
            MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [MatButtonModule,MatGridListModule, MatDialogModule, MatCheckboxModule,MatSelectModule, MatChipsModule, MatCardModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, FlexLayoutModule,MatInputModule],
    exports: [MatButtonModule,MatGridListModule, MatDialogModule, MatCheckboxModule,MatSelectModule, MatChipsModule, MatCardModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, FlexLayoutModule,MatInputModule],
})
export class TaskerMaterialModule { }
