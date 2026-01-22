import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() redirectTo: string = '';
  @Input() fecha: string = '';
  @Input() mensaje: string = '';
}
