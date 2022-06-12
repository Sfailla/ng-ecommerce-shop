import { Location } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "back-button",
  templateUrl: "./back-button.component.html",
})
export class BackButtonComponent {
  @Input() icon = "";
  @Input() label = "";
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
