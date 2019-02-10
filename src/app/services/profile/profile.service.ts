import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from '../../models/profile';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) { }

  async getProfile(): Promise<Profile | null> {
    const profileDoc = await this.afs.doc('profile/' + this.afAuth.auth.currentUser.uid).get().toPromise();
    if (!profileDoc.exists) {
      return null;
    }

    return profileDoc.data() as Profile;
  }
}
