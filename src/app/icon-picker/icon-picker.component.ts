import { NgFor, NgStyle } from "@angular/common";
import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

const ICONS: string[] = [
  'happy-outline',
  'list-outline',
  'bookmark',
  'pin',
  'gift',
  'school',
  'document',
  'book',
  'wallet',
  'card',
  'cash-outline',
  'barbell-outline',
  'walk',
  'wine',
  'home',
  'business',
  'tv-outline',
  'musical-notes',
  'game-controller',
  'headset',
  'leaf',
  'paw',
  'fish',
  'basket-outline',
  'cart',
  'bag',
  'football',
  'baseball',
  'basketball',
  'american-football',
  'train',
  'airplane',
  'boat'
]

@Component({
  selector: "app-icon-picker",
  templateUrl: "./icon-picker.component.html",
  styleUrls: ["./icon-picker.component.scss"],
  standalone: true,
  imports: [IonicModule, NgFor, NgStyle],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconPickerComponent),
      multi: true,
    },
  ]
})
export class IconPickerComponent implements ControlValueAccessor {

  readonly icons = ICONS;

  value?: string;

  select(icon: string) {
    this.writeValue(icon);
    this.onChange(icon);
  }

  onChange = (value: string) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // implement as needed
  }
}
