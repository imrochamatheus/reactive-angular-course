import { Injectable } from "@angular/core";
import { filter } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class MessagesService {
  private readonly errorsSubject: BehaviorSubject<string[]> =
    new BehaviorSubject([]);

  public errors$: Observable<string[]> = this.errorsSubject
    .asObservable()
    .pipe(filter((messages) => messages && messages.length > 0));

  public showErrors(...errors: string[]): void {
    this.errorsSubject.next(errors);
  }
}
