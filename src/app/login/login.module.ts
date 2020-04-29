import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login.component';
import { NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        LoginPageComponent
    ]
})
export class LoginPageModule {}