import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AnimationComponent } from './home/animation/animation.component';
import { FormeComponent } from './home/forme/forme.component';
import { ListComponent } from './home/list/list.component';
import { MapComponent } from './home/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnimationComponent,
    FormeComponent,
    ListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
