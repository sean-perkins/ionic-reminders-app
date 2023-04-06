import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActionSheetController, IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-new-reminder',
  templateUrl: 'new-reminder.component.html',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, FormsModule]
})
export class NewReminderComponent {

  @Output() didCancel = new EventEmitter();

  form = this.fb.group({
    title: ['', Validators.required],
    notes: ['']
  });

  constructor(
    private fb: FormBuilder,
    private actionSheetCtrl: ActionSheetController) {
    this.form.invalid
  }

  async cancel() {
    if (this.form.dirty) {
      const discardChanges = await this.discardChangesPrompt();
      if (!discardChanges) {
        return;
      }
    }
    this.didCancel.emit();
  }

  private async discardChangesPrompt() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Discard Changes',
          role: 'destructive',
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    return role === 'destructive';
  }

}
