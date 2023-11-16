import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './navbar/navbar';
import { FooterComponent } from './footer/footer';


@NgModule({
  imports: [CommonModule], //RouterLink
  declarations: [NavBarComponent, FooterComponent],
  exports: [NavBarComponent, FooterComponent]
})
export class UiModule {}
