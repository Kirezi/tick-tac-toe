import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-square",
  templateUrl: "./square.component.html",
  styleUrls: ["./square.component.scss"]
})
export class SquareComponent implements OnInit {
  @Input() value: "X" | "O";
  /**
   * this is a dummy component that represent the squares
   */
  constructor() {}

  ngOnInit() {}
}
