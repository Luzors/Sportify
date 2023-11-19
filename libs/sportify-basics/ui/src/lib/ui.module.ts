import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar/navbar';
import { FooterComponent } from './footer/footer';
import { RouterLink, RouterModule } from '@angular/router';
import { AddUserButtonComponent } from './buttons/add-user/add-user-button.component';
import { CommonModule2 } from '@sportify-nx/sportify-basics/common';

@NgModule({
  imports: [RouterModule, RouterLink, CommonModule2], //RouterLink
  declarations: [NavBarComponent, FooterComponent, AddUserButtonComponent],
  exports: [NavBarComponent, FooterComponent, AddUserButtonComponent],
})
export class UiModule {}
