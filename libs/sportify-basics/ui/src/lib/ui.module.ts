import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './navbar/navbar';


@NgModule({
  imports: [CommonModule], //RouterLink
  declarations: [NavBarComponent],
  exports: [NavBarComponent]
})
export class UiModule {}
