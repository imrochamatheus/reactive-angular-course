import { Component, OnInit } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { CourseService } from "../services/course.service";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { loadingService } from "../services/loading.service";
import { MessagesService } from "../messages/messages.service";

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
    private readonly loadingService: loadingService,
    private readonly messagesService: MessagesService
  ) {}

  private filterByCategory(category: string, courses: Course[]) {
    return courses
      .filter((course) => course.category === category)
      .sort(sortCoursesBySeqNo);
  }

  public loadAllCourses() {
    const courses$ = this.coureService.loadAllCourses().pipe(
      catchError((err) => {
        const message = "Could not show courses!";
        this.messagesService.showErrors(message);

        throw throwError(err);
      })
    );

    const loadingObs$ = this.loadingService.loadUntilCompleted(courses$);

    this.beginnerCourses$ = loadingObs$.pipe(
      map(this.filterByCategory.bind(this, "BEGINNER"))
    );

    this.advancedCourses$ = loadingObs$.pipe(
      map(this.filterByCategory.bind(this, "ADVANCED"))
    );
  }

  public ngOnInit(): void {
    this.loadAllCourses();
  }
}
