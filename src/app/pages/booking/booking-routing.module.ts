import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BookingComponent } from './booking-ionic-table/booking.page';
const routes: Routes = [
  {
    path: '',
    component: BookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsPageRoutingModule {}
