import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule,MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, FlexLayoutModule,MatInputModule],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, FlexLayoutModule,MatInputModule],
})
export class TaskerMaterialModule { }
