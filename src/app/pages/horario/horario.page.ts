import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage {

  expandedCard: string | null = null;
  presentingElement: Element | null = null;

  isChoiceModalOpen = false;
  isAddModalOpen = false;
  isEditModalOpen = false;

  subjects: { name: string; day: string; startTime: string; endTime: string; room: string; teacher: string; color: string; }[] = [];

  newSubject = {
    name: '',
    day: 'Lunes',
    startTime: '',
    endTime: '',
    room: '',
    teacher: '',
    color: 'primary'
  };

  selectedSubject: { name: string; day: string; startTime: string; endTime: string; room: string; teacher: string; color: string; } | null = null;

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  toggleExpand(card: string) {
    this.expandedCard = this.expandedCard === card ? null : card;
  }

  openChoiceModal() {
    this.isChoiceModalOpen = true;
  }

  closeChoiceModal() {
    this.isChoiceModalOpen = false;
  }

  openAddModal() {
    this.closeChoiceModal();
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  openEditModal(subject: any) {
    this.selectedSubject = subject;
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  addNewSubject() {
    this.subjects.push({ ...this.newSubject });
    this.sortSubjects(); // Asegura que siempre se ordenen después de agregar
    this.clearNewSubject();
    this.closeAddModal();
  }

  clearNewSubject() {
    this.newSubject = {
      name: '',
      day: 'Lunes',
      startTime: '',
      endTime: '',
      room: '',
      teacher: '',
      color: 'primary'
    };
  }

  saveEditedSubject() {
    this.sortSubjects(); // Asegura que siempre se ordenen después de editar
    this.closeEditModal();
  }

  async deleteSubject(subject: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar la asignatura "${subject.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.subjects = this.subjects.filter(s => s !== subject);
            this.sortSubjects(); // Asegura que siempre se ordenen después de eliminar
          }
        }
      ]
    });

    await alert.present();
  }

  getSubjectsForDay(day: string) {
    return this.subjects
      .filter(s => s.day === day)
      .sort((a, b) => this.compareTimes(a.startTime, b.startTime)); // Ordenar de menor a mayor
  }

  compareTimes(time1: string, time2: string): number {
    // Convierte las horas a minutos desde la medianoche para comparación precisa
    const totalMinutes1 = this.convertTimeToMinutes(time1);
    const totalMinutes2 = this.convertTimeToMinutes(time2);

    return totalMinutes1 - totalMinutes2; // Ordenar de menor a mayor
  }

  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  sortSubjects() {
    this.subjects.sort((a, b) => this.compareTimes(a.startTime, b.startTime)); // Ordenar de menor a mayor
  }
}
