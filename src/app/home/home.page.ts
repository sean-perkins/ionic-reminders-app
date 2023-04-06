import { Component, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {

  constructor(public elementRef: ElementRef) { }

  editLists() {

  }

  get templateModalPresentingElement() {
    return this.elementRef.nativeElement;
  }

}
