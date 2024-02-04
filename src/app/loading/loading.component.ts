import { Component, OnInit } from "@angular/core";
import { loadingService } from "../services/loading.service";

@Component({
  selector: "loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"],
})
export class LoadingComponent implements OnInit {
  constructor(public readonly loadingService: loadingService) {}

  public ngOnInit() {}
}
