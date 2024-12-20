import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-main',
  templateUrl: './card-main.component.html',
  styleUrls: ['./card-main.component.css']
})
export class CardMainComponent {

  constructor(private route: Router) {}

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() classes: string = '';
  @Input() color: string = '';
  @Input() redirectTo: string | null = null;
  @Input() object: any;

  redirigir() {
    if(this.redirectTo != null) {
      this.route.navigate([this.redirectTo]);
    }
  }

}
