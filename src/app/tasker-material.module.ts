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
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTooltipModule
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
        MatDatepickerModule,
        MatSnackBarModule,
        MatTooltipModule
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
        MatDialogModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSnackBarModule,
        MatTooltipModule
    ]
})
export class TaskerMaterialModule { }
