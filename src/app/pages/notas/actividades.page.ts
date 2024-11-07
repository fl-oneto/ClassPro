import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Notas } from 'src/app/interfaces/notas';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {
  notas: Notas[] = [];
  nuevaNota: Notas = this.initializeNewNote();
  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.loadNotes();
  }

  initializeNewNote(): Notas {
    return {
      id: '',
      titulo: '',
      contenido: '',
      creadaEn: new Date(),
      imagen: ''
    };
  }

  async loadNotes() {
    this.notas = await this.storageService.getNotes();
  }

  async addNote() {
    await this.storageService.addNote(this.nuevaNota);
    this.loadNotes();
    this.nuevaNota = this.initializeNewNote(); // Reiniciar formulario
  }

  async deleteNote(id: string) {
    await this.storageService.deleteNote(id);
    this.loadNotes();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64, 
      source: CameraSource.Camera, 
    });

    this.nuevaNota.imagen = `data:image/jpeg;base64,${image.base64String}`; 
  }

}
