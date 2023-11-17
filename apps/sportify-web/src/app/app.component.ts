import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule2 } from '@sportify-nx/sportify-basics/common';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {FeaturesModule} from '@sportify-nx/sportify-basics/features';
import { UiModule } from '@sportify-nx/ui'
import { RouterLink} from '@angular/router';


@Component({
  standalone: true,
  imports: [UiModule, RouterModule, FeaturesModule, CommonModule2, RouterLink],
  selector: 'sportify-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sportify-web';
}
