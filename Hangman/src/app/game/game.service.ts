import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';


const MOVIES_URL = environment.url;

@Injectable({providedIn: 'root'})
export class GameService {

    public letterClicked = new Subject<string>();
    public strikes = new Subject<number>();
    public letterInitialized = new Subject<string[]>();
    public gameProgress = new Subject<string>();

    numberOfstrikes: number;
    gameStatus: string;
    selectedLetters: string[] = [];
    initializedLetters: string[] = [];

    constructor(private http: HttpClient) {}

    getMovies(): Observable<any> {
        return this.http.get<string>(MOVIES_URL);
    }

    letterClick(kye: string) {
        this.selectedLetters.push(kye);
        this.letterClicked.next(kye);

    }

    lettersInitialized(letters: string[]) {
        this.initializedLetters = letters;
        this.letterInitialized.next(this.initializedLetters);

    }

    newsSrike(number: number) {
        this.numberOfstrikes = number;
        this.strikes.next(number);

    }

    gameStatusUpdate(status: string) {
        this.gameStatus = status;
        this.gameProgress.next(status);

    }

    getSelectedLetters() {
        return this.selectedLetters;

    }

    getinitializedLetters() {
        return this.initializedLetters;

    }

    getnewsSrike() {
        return this.numberOfstrikes;

    }

    getGameStatus() {
        return this.gameStatus;

    }
}
