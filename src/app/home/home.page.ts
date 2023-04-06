import { Component, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewReminderComponent } from '../forms/new-reminder/new-reminder.component';
import { NewListComponent } from '../forms/new-list/new-list.component';
import { TemplateListComponent } from '../shared/template-list/template-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NewReminderComponent,
    NewListComponent,
    TemplateListComponent,
  ],
})
export class HomePage {
  constructor(public elementRef: ElementRef) { }

  editLists() { }

  get presentingElement() {
    return this.elementRef.nativeElement;
  }
}
