import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TutorsPageRoutingModule } from './tutors-routing.module';
import { TutorComponent } from './tutors-ionic-table/tutors.page';
import { TutorService } from './tutors.service';

@NgModule({
  declarations: [TutorComponent],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorsPageRoutingModule,
  ],

  providers: [TutorService],
})
export class TutorModule {}
