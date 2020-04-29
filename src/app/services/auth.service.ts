import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { RecipesService } from './recipes.service';
import { authRequest } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private recipesService: RecipesService, public afAuth: AngularFireAuth) { }

    doRegister(value: authRequest) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err)
                )
        });
    }

    doLogin(value: authRequest) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err)
                )
        });
    }

    doLogout() {
        return new Promise((resolve, reject) => {
            this.afAuth.signOut()
                .then(() => {
                    this.recipesService.unsubscribeOnLogOut();
                    resolve();
                }).catch((error) => {
                    reject();
                });
        })
    }
}