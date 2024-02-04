import { Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { CourseService } from "../services/course.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public beginnerCourses$: Observable<Course[]>;
  public advancedCourses$: Observable<Course[]>;

  constructor(
    private readonly coureService: CourseService,
    private readonly dialog: MatDialog
  ) {}

  private filterByCategory(category: string, courses: Course[]) {
    return courses
      .filter((course) => course.category === category)
      .sort(sortCoursesBySeqNo);
  }

  public ngOnInit(): void {
    const courses$ = this.coureService.loadAllCourses();

    this.beginnerCourses$ = courses$.pipe(
      map(this.filterByCategory.bind(this, "BEGINNER"))
    );

    this.advancedCourses$ = courses$.pipe(
      map(this.filterByCategory.bind(this, "ADVANCED"))
    );
  }

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
  }
}
