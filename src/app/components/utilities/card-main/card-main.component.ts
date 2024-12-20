import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-main',
  templateUrl: './card-main.component.html',
  styleUrls: ['./card-main.component.css']
})
export class CardMainComponent {

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() classes: string = '';
  @Input() color: string = '';
  @Input() redirectTo: string = '';
  @Input() object: any;

}
