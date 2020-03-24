import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadinSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AlertComponent,
    LoadinSpinnerComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadinSpinnerComponent,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule {}