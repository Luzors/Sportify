import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar/navbar';
import { FooterComponent } from './footer/footer';
import { RouterLink, RouterModule } from '@angular/router';
import { AddUserButtonComponent } from './buttons/add-user/add-user-button.component';

@NgModule({
  imports: [RouterModule, RouterLink], //RouterLink
  declarations: [NavBarComponent, FooterComponent, AddUserButtonComponent],
  exports: [NavBarComponent, FooterComponent, AddUserButtonComponent],
})
export class UiModule {}
