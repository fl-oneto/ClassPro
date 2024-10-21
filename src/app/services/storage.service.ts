import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from '../interfaces/subject';
import { Notas } from '../interfaces/notas';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  subjects: Subject[] = [];
  notas: Notas[] = [];
  private _storage: Storage | null=null;

  constructor(private storage: Storage, public toastController: ToastController){
    this.Init();
  }

  async Init(){
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadSubjects();
    await this.loadNotas();
  }

  // ---  Manejo de asignaturas ----

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

  
  async getSubjects(): Promise<Subject[]> {
    return this.subjects; // Devuelve las asignaturas en memoria
  }

  // --- manejo notas ---

  async loadNotas() {
    const storedNotes = await this._storage?.get('notas');
    if (storedNotes) {
      this.notas = storedNotes; 
    }
  }

  async saveNotes() {
    await this._storage?.set('notas', this.notas); // Guarda las notas
  }

  async addNote(newNote: Notas): Promise<void> {
    newNote.id = this.generateUniqueId();  // Genera un ID único para la nota
    newNote.creadaEn = new Date();        // Fecha de creación
    this.notas.push(newNote);              // Añade la nueva nota a la memoria
    await this.saveNotes();                // Guarda las notas actualizadas
  }

  async editNote(updatedNote: Notas): Promise<void> {
    const index = this.notas.findIndex(nota => nota.id === updatedNote.id);
    if (index !== -1) {
      this.notas[index] = updatedNote; // Actualiza la nota en memoria
      await this.saveNotes();          // Guarda los cambios
    }
  }

  async deleteNote(id: string): Promise<void> {
    this.notas = this.notas.filter(nota => nota.id !== id); // Elimina en memoria
    await this.saveNotes();                                // Guarda los cambios
  }

  async getNotes(): Promise<Notas[]> {
    return this.notas; // Devuelve las notas en memoria
  }

  // --- utilidades ---
  generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
