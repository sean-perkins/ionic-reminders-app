import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TemplateListComponent } from '../../shared/template-list/template-list.component';
import { NgIf } from '@angular/common';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { IconPickerComponent } from '../icon-picker/icon-picker.component';
import { FormPromptService } from '../../utils/prompt.service';

@Component({
  selector: 'app-new-list',
  templateUrl: 'new-list.component.html',
  styleUrls: ['new-list.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateListComponent,
    NgIf,
    ColorPickerComponent,
    IconPickerComponent,
  ],
  providers: [FormPromptService],
})
export class NewListComponent {
  @Output() didCancel = new EventEmitter();

  form = this.fb.group({
    name: ['', Validators.required],
    color: ['light-blue'],
    icon: ['list-outline'],
  });

  activeSegment = 'new-list';

  constructor(
    private fb: FormBuilder,
    private formPromptService: FormPromptService
  ) { }

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

  onListTypeChanged({ detail }: any) {
    const type = detail.value as string;
    this.activeSegment = type;
  }

  onSubmit() {
    console.log('form', this.form.value);
  }
}
