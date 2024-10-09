import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from '../interfaces/subject';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  subjects: Subject[] = [];
  private _storage: Storage | null=null;

  constructor(private storage: Storage, public toastController: ToastController){
    this.Init();
  }

  async Init(){
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadSubjects();
  }
  async loadSubjects() {
    const storedSubjects = await this._storage?.get('subjects');
    if (storedSubjects) {
      this.subjects = storedSubjects; // Sincroniza los datos de Storage con la lista en memoria
    }
  }

  async saveSubjects() {
    await this._storage?.set('subjects', this.subjects); // Guarda la lista de asignaturas en el almacenamiento
  }

  async addSubject(newSubject: Subject): Promise<void> {
    newSubject.id = this.generateUniqueId(); // Genera un ID único
    this.subjects.push(newSubject); // Añadir la nueva asignatura en memoria
    await this.saveSubjects(); // Guarda los datos actualizados en Ionic Storage
  }

  async editSubject(updatedSubject: Subject): Promise<void> {
    const index = this.subjects.findIndex(subject => subject.id === updatedSubject.id);
    if (index !== -1) {
      this.subjects[index] = updatedSubject; // Actualiza en memoria
      await this.saveSubjects(); // Guarda los cambios en el almacenamiento
    }
  }
  
  async deleteSubject(id: string): Promise<void> {
    this.subjects = this.subjects.filter(subject => subject.id !== id); // Elimina en memoria
    await this.saveSubjects(); // Guarda los cambios en el almacenamiento
  }

  generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  async getSubjects(): Promise<Subject[]> {
    return this.subjects; // Devuelve las asignaturas en memoria
  }

}
