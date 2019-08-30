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
  public selectedMovieToBrake: Array<string>;
  public selectedMovieToDisplay = new Array<{wordNum: number, Letters: string[]}>();
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
      // select random movie
      this.selectedMovie = this.movies[Math.floor(Math.random() * this.movies.length)].toLocaleUpperCase();
      this.selectedMovieToBrake = this.selectedMovie.split(' ');

      // brake into words
      this.selectedMovieToBrake.forEach((element, index) => {
      const commentData = <{wordNum: number, Letters: string[]}>{};
        commentData.wordNum = index;
        commentData.Letters = element.split('');
        this.selectedMovieToDisplay.push(commentData);
      });
      // split into letters
      this.selectedMovieToLetters = this.selectedMovie.split('');
      // split into letters without spaces for game status check
      this.gameStatus = this.selectedMovie.trim().split('');
      // the number of random letters to initializing the game (25%)
      this.num = Math.round(this.selectedMovieToLetters.length * 0.25);
      const sl = this.selectedMovieToLetters.slice();

      // inshur you won't get same random number twice
      while (this.randomNum.length < this.num) {
        const rnd = (Math.floor(Math.random() * sl.length));
        if (!this.randomNum.includes(rnd)) {
          this.randomNum.push(rnd);
        }
    }
    // add initialize letters to selected letters array
      for (let i = 0; i < this.num; i++) {
        this.selectedLetters.push(sl[this.randomNum[i]]);
        this.initializeLetters.push(sl[this.randomNum[i]]);
        for (let j = 0; j < this.gameStatus.length; j++) { // delete initialize letters from status array
          if (this.gameStatus[j] === sl[this.randomNum[i]] || this.gameStatus[j] === ' ') {
            delete this.gameStatus[j];
          }
        }
      }
     this.gameStatus = this.gameStatus.filter(Boolean);
     // inform the keyboard component letters initialized
      this.gameService.lettersInitialized(this.initializeLetters);
    });

    this.initializeLetters = this.gameService.getinitializedLetters();
    this.newInitializeLetters = this.gameService.letterInitialized
    .subscribe((letters: string[]) => {
      this.initializeLetters = letters;
    });
    // subscribe to eny kye selected
    this.selectedLetters = this.gameService.getSelectedLetters();
    this.newLetterSelected = this.gameService.letterClicked
    .subscribe((letter: string) => {
      this.selectedLetters.push(letter);
      this.iSinitializeLetters = false;
      if (!this.selectedMovieToLetters.includes(letter)) {
        this.gameService.newsSrike(++this.numberOfstrikes);
      }
     // delete selected letters from status array
      for (let q = 0; q < this.gameStatus.length; q++) {
        if (this.gameStatus[q] === letter || this.gameStatus[q] === ' ') {
          delete this.gameStatus[q];
        }
      }

      this.gameStatus = this.gameStatus.filter(Boolean);
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
