import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormPromptService } from 'src/app/utils/prompt.service';

@Component({
  selector: 'app-select-filter',
  templateUrl: 'select-filter.component.html',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, FormsModule],
  providers: [FormPromptService],
})
export class SelectFilterComponent {
  @Output() didCancel = new EventEmitter();

  form = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private formPromptService: FormPromptService
  ) {}

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
