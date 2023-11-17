import { Route } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AboutComponent, HomefillerComponent } from '@sportify-nx/sportify-basics/features';


export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: HomefillerComponent
    },
    {
       path: 'about',
       pathMatch: 'full',
       component: AboutComponent
    }

];
