import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { IconsService } from "@shared/services/icons.service";
import { toBase64 } from "@shared/functions/helpers";

@Component({
  selector: "app-img-selector",
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: "./img-selector.component.html",
  styleUrls: ["./img-selector.component.scss"],
})
export class ImgSelectorComponent implements OnInit {
  imgBase64: string;

  @Input() urlCurrentImg: string;

  @Output() selectedImage: EventEmitter<File> = new EventEmitter<File>();

  icUpload = IconsService.prototype.getIcon("icUpload");

  constructor() {}

  ngOnInit(): void {}

  selectedImg(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const inputElement: HTMLInputElement = event.target;
      if (inputElement.files && inputElement.files.length > 0) {
        const file: File = inputElement.files[0];
        toBase64(file).then((value: string) => (this.imgBase64 = value));
        this.selectedImage.emit(file);
        this.urlCurrentImg = null;
      }
    }
  }
}
