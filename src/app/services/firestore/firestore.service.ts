import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  getSnapshotChanges<T>(collection: AngularFirestoreCollection<T>): Observable<T[]> {
    return this.afAuth.authState.pipe(
      switchMap(authState => {
        if (!authState) {
          return of();
        }

        return collection.snapshotChanges();
      }),
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as T;
        (<any>data).id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getValueChanges<T>(collection: AngularFirestoreCollection<T>): Observable<T[]> {
    return this.afAuth.authState.pipe(
      switchMap(authState => {
        if (!authState) {
          return of();
        }

        return collection.valueChanges();
      })
    );
  }
}
