import { Component, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {

  disabledAll = '';
  public lettersClicked: string[] = [];
  public lettersDisabled: string[] = [];
  public newinitializeLetters: Subscription;
  public gameStatus: string;
  public gameProgress: Subscription;

  public firstSetOfKeys: Array<string> = 'ABCDEFGHIJ'.split('') ;
  public secondSetOfKeys: Array<string> = 'KLMNOPQRS'.split('') ;
  public thirdSetOfKeys: Array<string> = 'TUVWXYZ'.split('') ;

  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.lettersDisabled = this.gameService.getinitializedLetters();
    this.newinitializeLetters = this.gameService.letterInitialized
    .subscribe((letters: string[]) => {
      this.lettersDisabled = letters;
    });

    this.gameStatus = this.gameService.getGameStatus();
    this.gameProgress = this.gameService.gameProgress
    .subscribe((status: string) => {
      switch (status) {
        case 'WON': {
          this.disabledAll = 'disabled';
           break;
        }
        case 'LOST': {
          this.disabledAll = 'disabled';
           break;
        }
     }
    });
  }

  getKye(key) {
    this.lettersClicked.push(key);
    this.gameService.letterClick(key);
  }
}
