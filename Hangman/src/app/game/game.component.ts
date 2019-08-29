import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from './game.service';
import { Movie } from './movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  movies: string[] = [];
  iSinitializeLetters = true;
  public selectedMovieToLetters: Array<string>;
  public gameStatus: Array<string>;
  public selectedMovie: string;
  public initializeLetters: Array<string>;
  public selectedLetters: string[];
  public newLetterSelected: Subscription;
  public newInitializeLetters: Subscription;
  numberOfstrikes = 1;
  num: number;
  randomNum: number[] = [];

  constructor(public gameService: GameService) { }

  ngOnInit() {

    this.gameService.getMovies().subscribe(moviesData => {
      moviesData.forEach(element => {
        this.movies.push(element.title);
      });
      this.selectedMovie = this.movies[Math.floor(Math.random() * this.movies.length)].toLocaleUpperCase();
      this.selectedMovieToLetters = this.selectedMovie.split('');
      this.gameStatus = this.selectedMovie.trim().split('');

      this.num = Math.round(this.selectedMovieToLetters.length * 0.25);
      const sl = this.selectedMovieToLetters.slice();

      // inshur you won't get same random number twice
      while (this.randomNum.length < this.num) {
        const rnd = (Math.floor(Math.random() * sl.length));
        if (!this.randomNum.includes(rnd)) {
          this.randomNum.push(rnd);
        }
    }
      for (let i = 0; i < this.num; i++) {
        this.selectedLetters.push(sl[this.randomNum[i]]);
        this.initializeLetters.push(sl[this.randomNum[i]]);
        for (let j = 0; j < this.gameStatus.length; j++) {
          if (this.gameStatus[j] === sl[this.randomNum[i]] || this.gameStatus[j] === ' ') {
            delete this.gameStatus[j];
          }
        }
      }
     this.gameStatus = this.gameStatus.filter(Boolean);
      this.gameService.lettersInitialized(this.initializeLetters);
    });

    this.initializeLetters = this.gameService.getinitializedLetters();
    this.newInitializeLetters = this.gameService.letterInitialized
    .subscribe((letters: string[]) => {
      this.initializeLetters = letters;
    });

    this.selectedLetters = this.gameService.getSelectedLetters();
    this.newLetterSelected = this.gameService.letterClicked
    .subscribe((letter: string) => {
      this.selectedLetters.push(letter);
      this.iSinitializeLetters = false;
      if (!this.selectedMovieToLetters.includes(letter)) {
        this.gameService.newsSrike(++this.numberOfstrikes);
      }
     // if (this.gameStatus.includes(letter)) {
      for (let q = 0; q < this.gameStatus.length; q++) {
        if (this.gameStatus[q] === letter || this.gameStatus[q] === ' ') {
          delete this.gameStatus[q];
        }
      }
      console.log(this.gameStatus);
      this.gameStatus = this.gameStatus.filter(Boolean);
   // }
      // if game status over
      if (this.gameStatus.length === 0 ) {
        this.gameService.gameStatusUpdate('WON');
    }
    });
  }

  public getClass(letter: string) {
    if (letter !== ' ') {
    if (this.initializeLetters.includes(letter)) {
      return 'blue-letters';
    }
    return 'black-letters';
  }
  return '';
  }

  ngOnDestroy(): void {
    this.newLetterSelected.unsubscribe();
    this.newInitializeLetters.unsubscribe();
  }

}
