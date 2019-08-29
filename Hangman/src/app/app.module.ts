import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { HangmanComponent } from './hangman/hangman.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'game', component: GameComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HeaderComponent,
    KeyboardComponent,
    HangmanComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
