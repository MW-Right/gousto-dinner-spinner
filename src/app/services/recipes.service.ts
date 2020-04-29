import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private snapshotChangesSubscription: any;
  constructor() { }

  unsubscribeOnLogOut() {
    this.snapshotChangesSubscription.unsubscribe();
  }
}
