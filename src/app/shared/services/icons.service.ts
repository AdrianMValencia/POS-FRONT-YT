import { Injectable } from "@angular/core";
import icEdit from "@iconify/icons-ic/round-edit";
import icDelete from "@iconify/icons-ic/round-delete";
import icArrowDropDown from "@iconify/icons-ic/round-arrow-drop-down";
import icSearch from "@iconify/icons-ic/round-search";
import icClose from "@iconify/icons-ic/round-close";
import icName from "@iconify/icons-ic/round-badge";
import icDescription from "@iconify/icons-ic/round-description";

@Injectable({
  providedIn: "root",
})
export class IconsService {
  getIcon(icon: string) {
    if (icon == "icEdit") {
      return icEdit;
    }

    if (icon == "icDelete") {
      return icDelete;
    }

    if(icon == "icArrowDropDown"){
      return icArrowDropDown;
    }

    if(icon == "icSearch"){
      return icSearch;
    }

    if(icon == "icClose"){
      return icClose;
    }

    if(icon == "icName"){
      return icName;
    }

    if(icon == "icDescription"){
      return icDescription;
    }
  }
}