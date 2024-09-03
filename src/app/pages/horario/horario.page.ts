import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  presentingElement: Element | null = null;
  expandedCard: string | null = null;

  constructor(private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Estás seguro?',
      buttons: [
        {
          text: 'Sí',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
    
    const { role } = await actionSheet.onWillDismiss();
    return role === 'confirm';
  };
  toggleExpand(card: string) {
    if (this.expandedCard === card) {
      this.expandedCard = null;
    } else {
      this.expandedCard = card;
    }
  }
}
