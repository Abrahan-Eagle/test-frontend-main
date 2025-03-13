import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { UserService } from './../users.service'; // Asegúrate de que la ruta del servicio sea correcta

@Component({
  selector: 'app-user',
  templateUrl: './users.page.html',
  standalone: false,
})
export class UserComponent implements OnInit {
  dataSource: any[] = []; // Almacena la lista de usuarios
  page = 1; // Página actual
  itemsPerPage = 10; // Número de elementos por página

  constructor(
    private userService: UserService, // Servicio para manejar usuarios
    private modalCtrl: ModalController, // Controlador de modales
    private toastCtrl: ToastController, // Controlador de toasts
    private loadingCtrl: LoadingController // Controlador de loading
  ) {}

  ngOnInit() {
    this.loadUsers(); // Cargar usuarios al iniciar el componente
  }


  async loadUsers() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando usuarios...',
    });
    await loading.present();

    this.userService.getUsers().subscribe({
      next: (data: any) => {
        this.dataSource = data; // Asignar los datos a dataSource
        loading.dismiss(); // Cerrar el loading
      },
      error: async (error) => {
        loading.dismiss(); // Cerrar el loading en caso de error
        const toast = await this.toastCtrl.create({
          message: 'Error al cargar usuarios',
          duration: 3000,
          color: 'danger',
        });
        toast.present(); // Mostrar mensaje de error
      },
    });
  }


  async openPopUp(data: any = {}, isNew: boolean = false) {
    const modal = await this.modalCtrl.create({
      component: 'UserModalComponent', // Reemplaza con el componente del modal para usuarios
      componentProps: {
        data: data,
        isNew: isNew,
      },
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    if (result.data) {

      this.loadUsers();
    }
  }


  async deleteUser(user: any) {
    const confirm = await this.toastCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Eliminar a ${user.first_name} ${user.last_name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => this.performDelete(user.id), // Llamar a performDelete si se confirma
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

    this.userService.deleteUser(id).subscribe({
      next: async () => {
        loading.dismiss(); // Cerrar el loading
        this.showToast('Usuario eliminado correctamente', 'success'); // Mostrar mensaje de éxito
        this.loadUsers(); // Recargar la lista de usuarios
      },
      error: async (error) => {
        loading.dismiss(); // Cerrar el loading en caso de error
        this.showToast('Error al eliminar usuario', 'danger'); // Mostrar mensaje de error
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
    this.loadUsers();
  }


  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }
}
