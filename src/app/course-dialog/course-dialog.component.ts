import { AfterViewInit, Component, Inject } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import * as moment from "moment";
import { catchError, finalize, tap } from "rxjs/operators";

import { Course } from "../model/course";
import { CourseService } from "../services/course.service";
import { loadingService } from "../services/loading.service";
import { MessagesService } from "../messages/messages.service";
import { throwError } from "rxjs";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
  providers: [loadingService, MessagesService],
})
export class CourseDialogComponent implements AfterViewInit {
  public form: FormGroup;
  public course: Course;

  constructor(
    private readonly fb: FormBuilder,
    private readonly courseService: CourseService,
    private readonly loadingService: loadingService,
    private readonly messagesService: MessagesService,
    private readonly dialogRef: MatDialogRef<CourseDialogComponent>,

    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    const changes = this.form.value;
    const saveCourseObs$ = this.courseService
      .saveCourse(this.course.id.toString(), changes)
      .pipe(
        catchError((err) => {
          const message = "Could not possible edit this course!";
          this.messagesService.showErrors(message, "Another message!");

          throw throwError(err);
        })
      );

    this.loadingService.loadUntilCompleted(saveCourseObs$).subscribe(() => {
      this.dialogRef.close(changes);
    });
  }

  public ngAfterViewInit() {}
}
