import { Injectable } from "@angular/core";
import icEdit from "@iconify/icons-ic/round-edit";
import icDelete from "@iconify/icons-ic/round-delete";
import icArrowDropDown from "@iconify/icons-ic/round-arrow-drop-down";
import icSearch from "@iconify/icons-ic/round-search";
import icClose from "@iconify/icons-ic/round-close";
import icName from "@iconify/icons-ic/round-badge";
import icDescription from "@iconify/icons-ic/round-description";
import icMail from "@iconify/icons-ic/twotone-group";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import icViewHeadline from "@iconify/icons-ic/twotone-view-headline";
import icLabel from "@iconify/icons-ic/twotone-label";
import icProvider from "@iconify/icons-ic/twotone-group";
import icDashboard from "@iconify/icons-ic/twotone-dashboard";
import icCategory from "@iconify/icons-ic/twotone-category";
import icCloudDownload from "@iconify/icons-ic/twotone-cloud-download";
import icToday from "@iconify/icons-ic/twotone-today";
import icRefresh from "@iconify/icons-ic/twotone-restart-alt";
import icWarehouse from "@iconify/icons-ic/twotone-widgets";
import icManage from "@iconify/icons-ic/twotone-article";
import icProduct from "@iconify/icons-ic/twotone-inventory-2";
import icUpload from "@iconify/icons-ic/twotone-upload-file";
import icSales from "@iconify/icons-ic/twotone-point-of-sale";
import icCancel from "@iconify/icons-ic/twotone-block";
import icAdd from "@iconify/icons-ic/twotone-add-shopping-cart";
import icMin from "@iconify/icons-ic/twotone-remove";
import icAddDetail from "@iconify/icons-ic/twotone-add";

@Injectable({
  providedIn: "root",
})
export class IconsService {
  getIcon(icon: string) {
    if (icon == "icMin") {
      return icMin;
    }
    if (icon == "icAddDetail") {
      return icAddDetail;
    }
    if (icon == "icAdd") {
      return icAdd;
    }
    if (icon == "icCancel") {
      return icCancel;
    }
    if (icon == "icSales") {
      return icSales;
    }
    if (icon == "icUpload") {
      return icUpload;
    }
    if (icon == "icProduct") {
      return icProduct;
    }
    if (icon == "icManage") {
      return icManage;
    }

    if (icon == "icWarehouse") {
      return icWarehouse;
    }

    if (icon == "icEdit") {
      return icEdit;
    }

    if (icon == "icDelete") {
      return icDelete;
    }

    if (icon == "icArrowDropDown") {
      return icArrowDropDown;
    }

    if (icon == "icSearch") {
      return icSearch;
    }

    if (icon == "icClose") {
      return icClose;
    }

    if (icon == "icName") {
      return icName;
    }

    if (icon == "icDescription") {
      return icDescription;
    }

    if (icon == "icVisibility") {
      return icVisibility;
    }

    if (icon == "icVisibilityOff") {
      return icVisibilityOff;
    }

    if (icon == "icMail") {
      return icMail;
    }

    if (icon == "icViewHeadline") {
      return icViewHeadline;
    }

    if (icon == "icLabel") {
      return icLabel;
    }

    if (icon == "icProvider") {
      return icProvider;
    }

    if (icon == "icDashboard") {
      return icDashboard;
    }

    if (icon == "icCategory") {
      return icCategory;
    }

    if (icon == "icCloudDownload") {
      return icCloudDownload;
    }

    if (icon == "icToday") {
      return icToday;
    }

    if (icon == "icRefresh") {
      return icRefresh;
    }
  }
}
