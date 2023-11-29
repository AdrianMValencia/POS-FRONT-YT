import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MomentDateModule } from "@angular/material-moment-adapter";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MY_DATE_FORMATS } from "@shared/functions/date-format";
import { IconsService } from "@shared/services/icons.service";
import { SharedModule } from "@shared/shared.module";
import moment, { Moment } from "moment";

@Component({
  selector: "app-filter-date-range-ymd",
  standalone: true,
  imports: [SharedModule, MomentDateModule],
  templateUrl: "./filter-date-range-ymd.component.html",
  styleUrls: ["./filter-date-range-ymd.component.scss"],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class FilterDateRangeYmdComponent implements OnInit, OnChanges {
  @Input()
  start: string;

  @Input()
  end: string;

  @Input()
  maxDate: Moment = moment();

  @Output()
  rangeDate = new EventEmitter<{}>();

  range = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  icToday = IconsService.prototype.getIcon("icToday");

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.start || changes.end) {
      this.range.get("startDate").patchValue(this.start);
      this.range.get("endDate").patchValue(this.end);
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    if (event.value != null) {
      this.emitDates();
    }
  }

  emitDates() {
    const startDateControl = this.range.get("startDate").value;
    const endDateControl = this.range.get("endDate").value;

    if (startDateControl && endDateControl) {
      const startDate = startDateControl.format("YYYY-MM-DD");
      const endDate = endDateControl.format("YYYY-MM-DD");
      const data = {
        startDate,
        endDate,
      };

      this.rangeDate.emit(data);
    }
  }
}
