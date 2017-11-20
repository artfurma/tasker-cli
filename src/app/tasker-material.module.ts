import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule,MatChipsModule, MatIconModule, MatCardModule, MatListModule,MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatChipsModule, MatCardModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, FlexLayoutModule,MatInputModule],
    exports: [MatButtonModule, MatCheckboxModule, MatChipsModule, MatCardModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, FlexLayoutModule,MatInputModule],
})
export class TaskerMaterialModule { }
