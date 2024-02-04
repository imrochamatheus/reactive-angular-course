import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { filter, tap } from "rxjs/operators";

@Component({
  selector: "app-courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.css"],
})
export class CoursesCardListComponent {
  @Input() public courses: Course[] = [];

  @Output() public courseEdited: EventEmitter<Course> =
    new EventEmitter<Course>();

  constructor(protected readonly dialog: MatDialog) {}

  public editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(
        filter((val) => !!val),
        tap(() => this.courseEdited.emit(course))
      )
      .subscribe();
  }
}
