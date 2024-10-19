import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title: string = 'Título por defecto';
  @Input() showBackButton: boolean = false;
  @Input() defaultHref: string = '/home'; // Cambia esto a la ruta que necesites

  constructor() { }

  ngOnInit() {}

}
