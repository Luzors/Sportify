import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar/navbar';
import { FooterComponent } from './footer/footer';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule], //RouterLink
  declarations: [NavBarComponent, FooterComponent],
  exports: [NavBarComponent, FooterComponent]
})
export class UiModule {}
