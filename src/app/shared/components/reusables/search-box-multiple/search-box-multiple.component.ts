import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconModule } from "@visurel/iconify-angular";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { scaleInOutAnimation } from "src/@vex/animations/scale-in-out.animation";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";

@Component({
  selector: "app-search-box-multiple",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: "./search-box-multiple.component.html",
  styleUrls: ["./search-box-multiple.component.scss"],
  animations: [scaleInOutAnimation],
})
export class SearchBoxMultipleComponent implements OnInit {
  form: FormGroup;

  @Input() searchOptions = [];
  @Input() currentValue: string = "";
  @Output() search = new EventEmitter<unknown>();

  labelSelection: SearchOptions = {
    label: "",
    value: 0,
    placeholder: "",
    validation: "",
    validation_desc: "",
    icon: "",
  };

  constructor(private fb: FormBuilder, public iconsService: IconsService) {
    this.form = this.fb.group({
      searchValue: [""],
      searchData: [""],
    });
  }

  ngOnInit(): void {
    this.changeSelection(this.searchOptions[0]);
    this.form.controls["searchData"].valueChanges.subscribe((e) => {
      if (e.trim() == "") {
        this.submit();
      }
    });
  }

  changeSelection(option: SearchOptions) {
    this.labelSelection = option;
    this.form.controls["searchValue"].setValue(option.value);
    this.labelSelection.validation_desc = option.validation_desc
      ? option.validation_desc
      : "";

    let min_length = option.min_length ? option.min_length : 1;
    this.setSearchStringValidation(option.validation, min_length);
  }

  setSearchStringValidation(validation: [], minLength: number) {
    let searchData = this.form.get("searchData");
    let setValidation = [];

    setValidation.push(Validators.required);
    setValidation.push(Validators.minLength(minLength));

    if (validation) {
      validation.forEach((e) => {
        setValidation.push(e);
      });
    }

    searchData.setValidators(setValidation);
  }

  submit() {
    let data = this.form.getRawValue();
    this.search.emit(data);
  }

  reset() {
    this.form.controls["searchData"].setValue("");
    this.submit();
  }
}
