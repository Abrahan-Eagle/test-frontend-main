import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { UsersPageRoutingModule } from './users-routing.module';


import { UserComponent } from './users-ionic-table/users.page';
import { UserService } from './users.service';

@NgModule({
  declarations: [UserComponent],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule,
  ],

  providers: [UserService],
})
export class UserModule {}
