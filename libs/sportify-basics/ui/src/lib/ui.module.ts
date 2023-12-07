import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule2 } from '@sportify-nx/sportify-basics/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesModule } from '@sportify-nx/sportify-basics/features';
import { CheckAuthService } from './checkAuth.service';
import { BackButtonComponent } from './back-button/back-button.component';

@NgModule({
  imports: [
    RouterModule,
    RouterLink,
    CommonModule2,
    CommonModule,
    forwardRef(() => FeaturesModule),
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    FooterComponent,
    BackButtonComponent,
  ],
  providers: [CheckAuthService],
  exports: [NavbarComponent, FooterComponent, BackButtonComponent],
})
export class UiModule {}
