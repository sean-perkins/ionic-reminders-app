import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule],
})
export class NewListComponent {

  @Output() didCancel = new EventEmitter();

  form = this.fb.group({
    name: ['', Validators.required],
    color: [],
    icon: []
  });

  constructor(private fb: FormBuilder) { }

  cancel() {
    this.didCancel.emit();
  }

}
