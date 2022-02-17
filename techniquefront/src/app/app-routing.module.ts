import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationComponent } from './home/animation/animation.component';
import { FormeComponent } from './home/forme/forme.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './home/list/list.component';
import { MapComponent } from './home/map/map.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home/form', pathMatch: 'full' },];

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'form', component: FormeComponent },
      { path: 'list', component: ListComponent },
      { path: 'map', component: MapComponent },
      { path: 'animation', component: AnimationComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes),
  RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
