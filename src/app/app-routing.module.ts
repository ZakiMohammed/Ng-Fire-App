import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
