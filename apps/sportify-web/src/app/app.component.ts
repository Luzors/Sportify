import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FeaturesModule} from '@sportify-nx/sportify-basics/features'
import {UiModule} from '@sportify-nx/ui'

@Component({
  standalone: true,
  imports: [UiModule, RouterModule, FeaturesModule],
  selector: 'sportify-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sportify-web';
}
