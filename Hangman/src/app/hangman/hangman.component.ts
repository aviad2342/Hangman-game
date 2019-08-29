import { Component, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {

  public hmImage = '/assets/Hangman1.png';
  public numberOfstrikes: number;
  public newStrike: Subscription;

  constructor(public gameService: GameService) { }

  ngOnInit() {

    this.numberOfstrikes = this.gameService.getnewsSrike();
    this.newStrike = this.gameService.strikes
    .subscribe((strikes: number) => {
      if (strikes < 7 ) {
        this.numberOfstrikes = strikes;
        this.hmImage = '/assets/Hangman' + strikes + '.png';
      } else {
        this.hmImage = '/assets/Hangman' + strikes + '.png';
        this.gameService.gameStatusUpdate('LOST');
      }
    });
  }

}
