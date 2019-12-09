import { Injectable, ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  user: Observable<User>;


  constructor(private afs: AngularFirestore) { 
    this.usersCollection = this.afs.collection('users', ref => ref.orderBy('name', 'asc'));
  }

  getUsers(): Observable<User[]> {
    //get users with id
    this.users = this.usersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as User;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.users;
  }


  getUser(id: string): Observable<User> {
    this.userDoc = this.afs.doc<User>(`users/${id}`);
    this.user = this.userDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as User;
        data.id = action.payload.id;
        return data;
      }
    }));

    return this.user;
  }

  createNewUser(user: User) {
    this.usersCollection.add(user);
  }

  updateUser(user: User) {
    this.userDoc.update(user);
  }

  deleteUser(user: User) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.delete();
  }

}
