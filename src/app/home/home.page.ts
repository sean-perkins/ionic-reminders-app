import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewReminderComponent } from '../forms/new-reminder/new-reminder.component';
import { NewListComponent } from '../forms/new-list/new-list.component';
import { TemplateListComponent } from '../shared/template-list/template-list.component';
import { FormPromptService } from '../utils/prompt.service';

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
  providers: [
    FormPromptService
  ]
})
export class HomePage {

  @ViewChild('newList') newList!: NewListComponent;

  // The validity state of the new list form
  private newListFormValid = true;

  constructor(public elementRef: ElementRef, private formPromptService: FormPromptService) { }

  editLists() { }

  onNewListStatusChange(status: boolean) {
    this.newListFormValid = status;
  }

  canDismissNewList = async () => {
    if (this.newListFormValid) {
      return true;
    }
    const discardChanges = await this.formPromptService.discardChangesPrompt();
    return discardChanges;
  }

  get presentingElement() {
    return this.elementRef.nativeElement;
  }
}
