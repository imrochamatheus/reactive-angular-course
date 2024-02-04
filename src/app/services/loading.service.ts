import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, switchMap, concatMap, finalize } from "rxjs/operators";

@Injectable()
export class loadingService {
  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  public loadUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.onLoading()),
      concatMap(() => obs$),
      finalize(() => this.offLoading())
    );
  }

  public onLoading() {
    this.loadingSubject.next(true);
  }

  public offLoading() {
    this.loadingSubject.next(false);
  }
}
