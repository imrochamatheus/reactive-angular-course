import { Component, OnInit } from "@angular/core";
import { loadingService } from "./services/loading.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [loadingService],
})
export class AppComponent implements OnInit {
  constructor() {}

  public logout() {}

  public ngOnInit() {}
}
