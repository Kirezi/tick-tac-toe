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

  constructor(private dialogService: NbDialogService) {}

  ngOnInit() {
    this.startGame = false;
  }

  newGame() {
    this.squares = new Array(9).fill(null);
    this.winner = null;
    this.xisNext = true;
    this.startGame = true;
  }

  restartGame(dialogRef) {
    this.squares = new Array(9).fill(null);
    this.winner = null;
    this.xisNext = true;
    this.startGame = true;
    dialogRef.close();
  }

  get player() {
    return this.xisNext ? "X" : "O";
  }

  makeMove(index: number, dialog: TemplateRef<any>) {
    if (!this.squares[index]) {
      this.squares.splice(index, 1, this.player);
      this.xisNext = !this.xisNext;
    }

    if (this.calculateWinner()) {
      this.winner = this.calculateWinner();
      this.dialogService.open(dialog, {
        context: "Player " + this.winner + " won the game",
        closeOnBackdropClick: false
      });
    }
  }

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
}
