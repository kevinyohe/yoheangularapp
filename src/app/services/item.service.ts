import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/Item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  ItemsCollection: AngularFirestoreCollection<Item>;
  Items: Observable<Item[]>;
  constructor(public afs: AngularFirestore) {
    this.ItemsCollection = this.afs.collection('bbq');
    //this.Items = this.afs.collection('bbq').valueChanges();
    this.Items = this.afs.collection('bbq').snapshotChanges().pipe(map(changes => {
      return changes.map(a=>{
        const data = a.payload.doc.data() as Item
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

   getItems(){
     return this.Items;
   }
   addItem(item: Item){
     this.ItemsCollection.add(item);
   }
}

