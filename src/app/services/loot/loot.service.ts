import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Loot } from '../../models/loot';
import { FirestoreService } from '../firestore/firestore.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LootService {
  private readonly lootCollection: AngularFirestoreCollection<Loot>;
  private loot$: Observable<Loot[]>;

  public indexedLoots: {[id: string]: Loot};

  constructor(
    private firestoreService: FirestoreService,
    private afs: AngularFirestore,
    private translateService: TranslateService,
  ) {
    this.lootCollection = this.afs.collection('loot');
    this.loot$ = this.firestoreService.getSnapshotChanges<Loot>(this.lootCollection);
    this.indexedLoots = {};
  }

  getFilteredLoots$(searchTerm$: Observable<string>): Observable<Loot[]> {
    return searchTerm$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(v => {
        const term = v.trim();

        return this.loot$.pipe(
          map(loots => {
            this.indexLoots(loots);

            if (!term) {
              return loots;
            }

            return loots.filter(loot => {
              const name = this.translateService.instant('LOOT.' + loot.name);
              return name.toLowerCase().indexOf(v.toLowerCase()) >= 0;
            });
          })
        );
      })
    );
  }

  private indexLoots(loots: Loot[]) {
    this.indexedLoots = loots.reduce((acc, loot) => {
      acc[loot.id] = loot;

      return acc;
    }, {});
  }
}

