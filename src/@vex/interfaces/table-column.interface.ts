import { Icon } from "@visurel/iconify-angular";

export interface TableColumn<T> {
  label: string;
  property: keyof T | string;
  type: 'text' | 'textTruncate' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'periodo' | 'date' | 'datetime' | 'clickButton' | 'currency' | 'byteConversion' | 'buttonGroup';
  buttonItems?: buttonItems<T>[];
  visible?: boolean;
  cssClasses?: string[];
}

export interface buttonItems<T> {
  buttonLabel?: string;
  buttonAction: string;
  disable?: keyof T | boolean;
  visible?: boolean;
  buttonCondition?: string;
}