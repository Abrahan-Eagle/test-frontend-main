import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { TutorService } from './../tutors.service';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.page.html',
  standalone: false,
})
export class TutorComponent implements OnInit {
  dataSource: any[] = [];
  page = 1;
  itemsPerPage = 10;

  constructor(
    private tutorService: TutorService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadTutors();
  }

  async loadTutors() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando tutores...',
    });
    await loading.present();

    this.tutorService.getTutors().subscribe({
      next: (data: any) => {
        this.dataSource = data;
        loading.dismiss();
      },
      error: async (error) => {
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Error al cargar tutores',
          duration: 3000,
          color: 'danger',
        });
        toast.present();
      },
    });
  }

  async openPopUp(data: any = {}, isNew: boolean = false) {
    const modal = await this.modalCtrl.create({
      component: 'TutorModalComponent', // Reemplaza con el componente del modal
      componentProps: {
        data: data,
        isNew: isNew,
      },
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    if (result.data) {

      console.log('Datos del modal:', result.data);
    }
  }

  getSpecialityColor(speciality: string): string {
    const colors: { [key: string]: string } = {
      Advanced: 'danger',
      Intermediate: 'warning',
      Fluent: 'success',
      Beginner: 'primary',
    };
    return colors[speciality] || 'medium';
  }

  async openContact(tutor: any) {
    const toast = await this.toastCtrl.create({
      message: `Contactar a ${tutor.first_name} ${tutor.last_name}`,
      duration: 3000,
      color: 'primary',
    });
    toast.present();
  }

  async openEmail(tutor: any) {
    const toast = await this.toastCtrl.create({
      message: `Enviar email a ${tutor.email}`,
      duration: 3000,
      color: 'primary',
    });
    toast.present();
  }

  async deleteTutor(tutor: any) {
    const confirm = await this.toastCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Eliminar a ${tutor.first_name} ${tutor.last_name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => this.performDelete(tutor.id),
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

    this.tutorService.deleteTutor(id).subscribe({
      next: async () => {
        loading.dismiss();
        this.showToast('Tutor eliminado correctamente', 'success');
        this.loadTutors();
      },
      error: async (error) => {
        loading.dismiss();
        this.showToast('Error al eliminar tutor', 'danger');
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
    this.loadTutors();
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadTutors();
    }
  }
}
