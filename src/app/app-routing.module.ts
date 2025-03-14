import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UserModule)
  },
  {
    path: 'tutors',
    loadChildren: () => import('./pages/tutors/tutors.module').then( m => m.TutorModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./pages/booking/booking.module').then( m => m.BookingModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
