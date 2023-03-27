import { MatRippleModule } from "@angular/material/core";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { IconModule } from "@visurel/iconify-angular";
import { MenuItems } from "@shared/models/menu-items.interface";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    IconModule,
    MatRippleModule,
  ],
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  @Input() currentMenu: number;
  @Input() items: MenuItems[];
  @Input() buttonShow = false;
  @Input() buttonLabel = "Button";

  @Output() filterChange = new EventEmitter<unknown>();
  @Output() buttonClick = new EventEmitter<unknown>();

  activeItem: MenuItems["id"] = "all";

  ngOnInit(): void {
    this.setCurrentFilter(this.currentMenu);
  }

  setCurrentFilter(itemNumber: number) {
    let currentItem = this.items.find((item) => item.value == itemNumber);
    this.activeItem = currentItem.id;
  }

  setFilter(item: MenuItems) {
    this.activeItem = item.id;
    return this.filterChange.emit(item.value);
  }

  isActive(item: MenuItems["id"]) {
    return this.activeItem === item;
  }

  emitClick() {
    if (this.buttonShow) {
      return this.buttonClick.emit();
    }
  }
}
