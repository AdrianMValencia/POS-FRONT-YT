import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import { SharedModule } from "@shared/shared.module";

@Component({
  selector: "app-button-reset-filters",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./button-reset-filters.component.html",
  styleUrls: ["./button-reset-filters.component.scss"],
})
export class ButtonResetFiltersComponent {
  @Output()
  buttonClick = new EventEmitter<void>();

  icRefresh = IconsService.prototype.getIcon("icRefresh");

  emitClick() {
    return this.buttonClick.emit();
  }
}
