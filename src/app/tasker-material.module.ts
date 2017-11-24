import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDialogModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatChipsModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatDialogModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatChipsModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatDialogModule
    ]

})
export class TaskerMaterialModule { }
