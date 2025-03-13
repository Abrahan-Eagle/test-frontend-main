import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { BookingService } from './../booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  standalone: false,
})
export class BookingComponent implements OnInit {
  dataSource: any[] = []; // Lista de reservas
  page = 1; // Página actual
  itemsPerPage = 10; // Elementos por página

  constructor(
    private bookingService: BookingService, // Servicio de reservas
    private modalCtrl: ModalController, // Controlador de modales
    private toastCtrl: ToastController, // Controlador de toasts
    private loadingCtrl: LoadingController // Controlador de loading
  ) {}

  ngOnInit() {
    this.loadBookings(); // Cargar reservas al iniciar el componente
  }


  async loadBookings() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando reservas...',
    });
    await loading.present();

    this.bookingService.getBookings().subscribe({
      next: (data: any) => {
        this.dataSource = data; // Asignar los datos a dataSource
        loading.dismiss(); // Cerrar el loading
      },
      error: async (error) => {
        loading.dismiss(); // Cerrar el loading en caso de error
        const toast = await this.toastCtrl.create({
          message: 'Error al cargar reservas',
          duration: 3000,
          color: 'danger',
        });
        toast.present(); // Mostrar mensaje de error
      },
    });
  }


  async openPopUp(data: any = {}, isNew: boolean = false) {
    const modal = await this.modalCtrl.create({
      component: 'BookingModalComponent', // Reemplaza con el componente del modal para reservas
      componentProps: {
        data: data,
        isNew: isNew,
      },
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    if (result.data) {

      this.loadBookings();
    }
  }


  async deleteBooking(booking: any) {
    const confirm = await this.toastCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Eliminar la reserva #${booking.id}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => this.performDelete(booking.id), // Llamar a performDelete si se confirma
        },
      ],
    });
    await confirm.present();
  }


  async performDelete(id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando...',
    });
    await loading.present();

    this.bookingService.deleteBooking(id).subscribe({
      next: async () => {
        loading.dismiss(); // Cerrar el loading
        this.showToast('Reserva eliminada correctamente', 'success'); // Mostrar mensaje de éxito
        this.loadBookings(); // Recargar la lista de reservas
      },
      error: async (error) => {
        loading.dismiss(); // Cerrar el loading en caso de error
        this.showToast('Error al eliminar reserva', 'danger'); // Mostrar mensaje de error
      },
    });
  }


  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
    });
    toast.present();
  }


  nextPage() {
    this.page++;
    this.loadBookings();
  }


  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadBookings();
    }
  }
}
