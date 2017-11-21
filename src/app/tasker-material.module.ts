import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule,MatSelectModule, MatToolbarModule,MatChipsModule, MatIconModule, MatCardModule, MatListModule,MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule,MatSelectModule, MatChipsModule, MatCardModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, FlexLayoutModule,MatInputModule],
    exports: [MatButtonModule, MatCheckboxModule,MatSelectModule, MatChipsModule, MatCardModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, FlexLayoutModule,MatInputModule],
})
export class TaskerMaterialModule { }
