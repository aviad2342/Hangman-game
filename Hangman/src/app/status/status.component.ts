import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  public outcomes = '';
  public gameStatus: string;
  public gameProgress: Subscription;
  lineWon = 'YES YOU DID IT!';
  lineLost = 'SHIT! YOU DIED :(';
  public statusText: Array<string>;
  public gameIsOver = false;
  endClass = '';

  constructor(public gameService: GameService) { }

  ngOnInit() {

    this.gameStatus = this.gameService.getGameStatus();
    this.gameProgress = this.gameService.gameProgress
    .subscribe((status: string) => {
      switch (status) {
        case 'WON': {
           this.outcomes = '/assets/yes_symbol.png';
           this.statusText = this.lineWon.split(' ');
           this.endClass = 'won';
           this.gameIsOver = true;
           break;
        }
        case 'LOST': {
          this.outcomes = '/assets/shit_symbol.png';
          this.statusText = this.lineLost.split(' ');
          this.endClass = 'lost';
          this.gameIsOver = true;
           break;
        }
        default: {
           // statements;
           break;
        }
     }
    });
  }

  tryAgain() {
    window.location.reload();
  }
}
