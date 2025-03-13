import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { BookingsPageRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking-ionic-table/booking.page';
import { BookingService } from './booking.service';

@NgModule({
  declarations: [BookingComponent],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingsPageRoutingModule,
  ],

  providers: [BookingService],
})
export class BookingModule {}
