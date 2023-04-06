import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormPromptService } from '../../utils/prompt.service';

@Component({
  selector: 'app-new-reminder',
  templateUrl: 'new-reminder.component.html',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, FormsModule],
  providers: [FormPromptService],
})
export class NewReminderComponent {
  @Output() didCancel = new EventEmitter();

  form = this.fb.group({
    title: ['', Validators.required],
    notes: [''],
  });

  constructor(
    private fb: FormBuilder,
    private formPromptService: FormPromptService
  ) {
    this.form.invalid;
  }

  async cancel() {
    if (this.form.dirty) {
      const discardChanges =
        await this.formPromptService.discardChangesPrompt();
      if (!discardChanges) {
        return;
      }
    }
    this.didCancel.emit();
  }
}
