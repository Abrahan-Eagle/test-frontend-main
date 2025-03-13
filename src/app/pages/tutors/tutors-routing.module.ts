import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TutorComponent } from './tutors-ionic-table/tutors.page';
const routes: Routes = [
  {
    path: '',
    component: TutorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorsPageRoutingModule {}
