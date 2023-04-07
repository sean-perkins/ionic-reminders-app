import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonInput, IonicModule } from '@ionic/angular';
import { TemplateListComponent } from '../../shared/template-list/template-list.component';
import { NgIf, NgStyle } from '@angular/common';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { IconPickerComponent } from '../icon-picker/icon-picker.component';
import { FormPromptService } from '../../utils/prompt.service';
import { IconPreviewComponent } from 'src/app/shared/icon-preview/icon-preview.component';
import { SelectFilterComponent } from '../select-filter/select-filter.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-list',
  templateUrl: 'new-list.component.html',
  styleUrls: ['new-list.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgStyle,
    ColorPickerComponent,
    IconPickerComponent,
    IconPreviewComponent,
    SelectFilterComponent,
    TemplateListComponent,
  ],
  providers: [FormPromptService],
})
export class NewListComponent implements OnInit, OnDestroy {
  @Output() didCancel = new EventEmitter();
  @Output() statusChange = new EventEmitter<boolean>();

  @ViewChild('nameInput', { static: false }) nameInput?: IonInput;

  form = this.fb.group({
    name: ['', Validators.required],
    color: ['light-blue'],
    icon: ['list-outline'],
  });

  activeSegment = 'new-list';

  private readonly destroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private formPromptService: FormPromptService
  ) { }

  ngOnInit() {
    this.form
      .statusChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.statusChange.emit(this.canDismiss));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  async cancel() {
    if (!this.canDismiss) {
      const discardChanges =
        await this.formPromptService.discardChangesPrompt();
      if (!discardChanges) {
        return;
      }
    }
    this.didCancel.emit();
  }

  /**
   * Focuses the list name input if the new list segment is active.
   * This method is part of the public API and is intended to be called externally.
   * @publicApi
   */
  focusListName() {
    if (this.activeSegment === 'new-list' && this.nameInput) {
      this.nameInput.setFocus();
    }
  }

  onListTypeChanged({ detail }: any) {
    const type = detail.value as string;
    this.activeSegment = type;
  }

  onSubmit() {
    console.log('form', this.form.value);
  }

  get presentingElement() {
    return this.elementRef.nativeElement.closest('ion-modal');
  }

  get canDismiss() {
    if (this.form.valid || !this.form.dirty) {
      return true;
    }
    return false;
  }
}
