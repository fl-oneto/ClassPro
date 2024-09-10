import { Component, OnInit, ViewChildren} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { AfterViewInit } from '@angular/core';

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
              private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
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

  getSubjectsForDay(day: string): Subject[] {
    return this.subjects
      .filter(subject => subject.day === day)
      .sort((a, b) => this.compareTimes(a.startTime, b.startTime)); // Orden automático
  }

  compareTimes(time1: string, time2: string): number {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    if (hours1 !== hours2) {
      return hours1 - hours2;
    }
    return minutes1 - minutes2;
  }

  sortSubjects() {
    this.subjects.sort((a, b) => this.compareTimes(a.startTime, b.startTime));
    this.subjects = [...this.subjects]; // Forzar la detección de cambios
    this.cdr.detectChanges(); // Asegurar que la vista se actualiza
  }

  openAddModal() {
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
    this.newSubject = this.initializeNewSubject();
  }

  addNewSubject() {
    this.subjects.push(this.newSubject);
    this.sortSubjects();  // Ordenar automáticamente después de añadir
    this.saveSubjects();  
    this.closeAddModal();
  }

  openEditModal(subject: Subject) {
    this.selectedSubject = { ...subject };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedSubject = null;
  }

  saveEditedSubject() {
    if (this.selectedSubject) {
      const index = this.subjects.findIndex(s => s.name === this.selectedSubject!.name);
      if (index !== -1) {
        this.subjects[index] = this.selectedSubject;
      }
      this.sortSubjects();  // Ordenar automáticamente después de editar
      this.saveSubjects();  
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
            this.deleteSubject(subject);
          },
        },
      ],
    });

    await alert.present();
  }

  deleteSubject(subject: Subject) {
    this.subjects = this.subjects.filter(s => s !== subject);
    this.sortSubjects();  // Ordenar automáticamente después de eliminar
    this.saveSubjects();  
  }

  initializeNewSubject(): Subject {
    return {
      day: '',
      name: '',
      startTime: '',
      endTime: '',
      room: '',
      teacher: '',
      color: '',
    };
  }

  saveSubjects() {
    localStorage.setItem('subjects', JSON.stringify(this.subjects));
  }

  loadSubjects() {
    const subjects = localStorage.getItem('subjects');
    if (subjects) {
      this.subjects = JSON.parse(subjects);
      this.sortSubjects();
    } else {
      this.noDataMessage = 'No se ha ingresado ningún horario. ¡Agrega tu primera asignatura!';
    }
    this.cdr.detectChanges();
  }
}

interface Subject {
  day: string;
  name: string;
  startTime: string;
  endTime: string;
  room: string;
  teacher: string;
  color: string;
}
