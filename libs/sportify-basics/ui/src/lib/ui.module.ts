import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AddUserButtonComponent } from './buttons/add-user/add-user-button.component';
import { CommonModule2 } from '@sportify-nx/sportify-basics/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [RouterModule, RouterLink, CommonModule2], //RouterLink
  declarations: [
    FooterComponent,
    AddUserButtonComponent,
    NavbarComponent,
    FooterComponent,
  ],
  exports: [NavbarComponent, FooterComponent, AddUserButtonComponent],
})
export class UiModule {}
