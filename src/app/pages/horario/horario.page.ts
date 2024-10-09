import { Component, OnInit, ViewChildren} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Subject } from 'src/app/interfaces/subject';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements AfterViewInit {
  subjects: Subject[] = [];
  expandedCard: string | null = null;
  isAddModalOpen: boolean = false;  
  newSubject: Subject = this.initializeNewSubject();  
  isEditModalOpen: boolean = false;  
  selectedSubject: Subject | null = null;
  isLoading: boolean = true;
  progress: number = 0;
  noDataMessage: string = '';  

  constructor(private alertController: AlertController, 
              private cdr: ChangeDetectorRef,
              private storageService: StorageService) {}

  ngAfterViewInit() {
    this.loadSubjectsWithProgress();
  }

  loadSubjectsWithProgress() {
    this.isLoading = true;
    this.progress = 0;

    const interval = setInterval(() => {
      this.progress += 0.1; 
      if (this.progress >= 1) {
        clearInterval(interval);
        this.loadSubjects();
        this.isLoading = false;
      }
      this.cdr.detectChanges();
    }, 100); 
  }

  toggleExpand(subjectName: string) {
    this.expandedCard = this.expandedCard === subjectName ? null : subjectName;
  }

  initializeNewSubject(): Subject {
    return {
      id: '',
      day: '',
      name: '',
      startTime: '',
      endTime: '',
      room: '',
      teacher: '',
      color: '',
    };
  }

  async loadSubjects() {
    this.subjects = await this.storageService.getSubjects();
    if (!this.subjects.length) {
      this.noDataMessage = 'No se ha ingresado ningún horario. ¡Agrega tu primera asignatura!';
    }
    this.sortSubjects();
    this.cdr.detectChanges();
  }

  sortSubjects() {
    this.subjects.sort((a, b) => this.compareTimes(a.startTime, b.startTime));
    this.subjects = [...this.subjects]; // Forzar la detección de cambios
    this.cdr.detectChanges(); // Asegurar que la vista se actualiza
  }

  compareTimes(time1: string, time2: string): number {
    const date1 = new Date(time1);
    const date2 = new Date(time2);
    return date1.getTime() - date2.getTime(); 
  }

  openAddModal() {
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
    this.newSubject = this.initializeNewSubject();
  }

  async addNewSubject() {
    await this.storageService.addSubject(this.newSubject);
    this.loadSubjects(); // Recargar asignaturas
    this.closeAddModal();
  }


  isFormValid(): boolean {
    return this.newSubject.name && this.newSubject.startTime && this.newSubject.color && this.newSubject.day ? true : false;
  }

  openEditModal(subject: Subject) {
    this.selectedSubject = { ...subject };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedSubject = null;
  }

  async saveEditedSubject() {
    if (this.selectedSubject) {
      await this.storageService.editSubject(this.selectedSubject);  // Editar asignatura
      this.loadSubjects();  // Recargar asignaturas
      this.closeEditModal();
    }
  }

  async confirmDeleteSubject(subject: Subject) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar la asignatura "${subject.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteSubject(subject.id);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteSubject(subjectId: string) {
    await this.storageService.deleteSubject(subjectId);
    this.loadSubjects(); // Recargar asignaturas
  }

  getSubjectsForDay(day: string): Subject[] {
    return this.subjects
      .filter(subject => subject.day === day)  // Filtra por el día
      .sort((a, b) => this.compareTimes(a.startTime, b.startTime)); // Ordena por hora de inicio
  }

}

