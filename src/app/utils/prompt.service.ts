import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable()
export class FormPromptService {
  constructor(private actionSheetCtrl: ActionSheetController) {}

  /**
   * Displays a prompt to the user asking if they want to discard changes.
   * @returns true if the user wants to discard changes, false otherwise.
   */
  async discardChangesPrompt() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Discard Changes',
          role: 'destructive',
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    return role === 'destructive';
  }
}
