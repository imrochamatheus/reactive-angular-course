import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { CourseService } from "../services/course.service";
import { Course, sortCoursesBySeqNo } from "../model/course";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public beginnerCourses$: Observable<Course[]>;
  public advancedCourses$: Observable<Course[]>;

  constructor(private readonly coureService: CourseService) {}

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
}
