import { Component, OnInit, TemplateRef } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  squares: any[];
  xisNext: boolean;
  winner: string;
  startGame: boolean;
  rand = Math.floor(Math.random() * 2);

  /**
   * dialogService takes care of the modal.
   */
  constructor(private dialogService: NbDialogService) {}

  ngOnInit() {
    this.startGame = false;
  }
  /**
   * new Game initialize the game .
   */
  newGame() {
    this.squares = new Array(9).fill(null);
    this.winner = null;
    this.initRandomPlayer();
    this.startGame = true;
  }

  /**
   * randomize the player, there is 50% chance the player
   * might be X OR O .
   */
  initRandomPlayer() {
    if (this.rand === 0) {
      this.xisNext = false;
    } else {
      this.xisNext = true;
    }
  }

  /**
   * restart game and reset all the variables  .
   */
  restartGame(dialogRef) {
    this.squares = new Array(9).fill(null);
    this.winner = null;
    this.initRandomPlayer();
    this.startGame = true;
    dialogRef.close();
  }

  /**
   * return the current player.
   */

  get player() {
    return this.xisNext ? "X" : "O";
  }

  /**
   * place the square and determine if there is a next move
   * to make
   * @param index
   * @param dialog .
   */
  makeMove(index: number, dialog: TemplateRef<any>) {
    if (!this.squares[index]) {
      this.squares.splice(index, 1, this.player);
      this.xisNext = !this.xisNext;

      if (this.calculateWinner()) {
        this.winner = this.calculateWinner();
        this.dialogService.open(dialog, {
          context: "Player " + this.winner + " won the game",
          closeOnBackdropClick: false
        });
      }
    }

    if (this.checkDraw()) {
      if (!this.calculateWinner()) {
        this.dialogService.open(dialog, {
          context: "It's a draw ",
          closeOnBackdropClick: false
        });
      }
    }
  }

  /**
   * Determine all the winning state.
   */
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }

    return null;
  }

  /**
   * check if the game is a draw.
   */
  checkDraw() {
    let draw = false;
    let count = 0;
    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[i] !== null) {
        count++;
      }
    }

    if (count === 9) {
      draw = true;
    }

    return draw;
  }
}
