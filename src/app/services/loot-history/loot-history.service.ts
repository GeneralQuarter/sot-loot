import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore/firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LootHistory } from '../../models/loot-history';
import { Observable } from 'rxjs';
import { subHours } from 'date-fns';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { CrewService } from '../crew/crew.service';

@Injectable({
  providedIn: 'root'
})
export class LootHistoryService {
  private readonly lootHistoryCollection: AngularFirestoreCollection<LootHistory>;

  constructor(
    private firestoreService: FirestoreService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private crewService: CrewService,
  ) {
    this.lootHistoryCollection = this.getLootHistoryCollection();
  }

  private getLootHistoryCollection(hours = 4): AngularFirestoreCollection<LootHistory> {
    const minusHours = subHours(new Date(), hours);
    return this.afs.collection<LootHistory>('loot-history', ref => {
      return ref
        .where('date', '>=', minusHours.getTime())
        .where('crew', 'array-contains', this.afAuth.auth.currentUser.uid)
        .orderBy('date', 'desc');
    });
  }

  getLootHistory$(): Observable<LootHistory[]> {
    return this.firestoreService.getSnapshotChanges<LootHistory>(this.lootHistoryCollection);
  }

  getLootHistorySum$(lootHistory$: Observable<LootHistory[]>): Observable<number> {
    return lootHistory$.pipe(
      map(lootHistories => {
        return lootHistories.reduce((acc, lootHistory) => {
          return lootHistory.price ? acc + lootHistory.price : acc;
        }, 0);
      })
    );
  }

  delete(lootHistory: LootHistory): Promise<void> {
    const lootHistoryRef = this.lootHistoryCollection.doc(lootHistory.id);
    return lootHistoryRef.delete();
  }

  updateLoot(lootHistoryId: string, lootId: string): Promise<void> {
    const lootHistoryRef = this.lootHistoryCollection.doc(lootHistoryId);
    return lootHistoryRef.update({loot: lootId});
  }

  updatePrice(lootHistoryId: string, price: number): Promise<void> {
    const lootHistoryRef = this.lootHistoryCollection.doc(lootHistoryId);
    return lootHistoryRef.update({price: price});
  }

  toggleSoldByAlliance(lootHistory: LootHistory): Promise<void> {
    const lootHistoryRef = this.lootHistoryCollection.doc(lootHistory.id);
    return lootHistoryRef.update({soldByAlliance: !lootHistory.soldByAlliance});
  }

  addWithoutPrice(lootId: string) {
    return this.add({loot: lootId});
  }

  addWithoutLoot(price: number) {
    return this.add({price: price});
  }

  private async add(lootHistory: Partial<LootHistory>) {
    const currentCrew = await this.crewService.getCrewForCurrentUser();

    lootHistory.crew = currentCrew.members;
    lootHistory.date = Date.now();
    lootHistory.soldByAlliance = false;

    return this.lootHistoryCollection.add(lootHistory as LootHistory);
  }
}
