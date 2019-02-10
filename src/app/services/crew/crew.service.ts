import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Crew } from '../../models/crew';
import { ProfileService } from '../profile/profile.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private profileService: ProfileService,
  ) { }

  async getCrewForCurrentUser(): Promise<Crew> {
    const defaultCrew: Crew = {members: [this.afAuth.auth.currentUser.uid]};

    const profile = await this.profileService.getProfile();

    if (!profile || !profile.crew) {
      return defaultCrew;
    }

    return await this.getCrew(this.afAuth.auth.currentUser.uid) || defaultCrew;
  }

  async getCrew(userId: string): Promise<Crew | null> {
    const crewDoc = await this.afs.doc('crew/' + userId).get().toPromise();

    if (!crewDoc.exists) {
      return null;
    }

    return crewDoc.data() as Crew;
  }
}
