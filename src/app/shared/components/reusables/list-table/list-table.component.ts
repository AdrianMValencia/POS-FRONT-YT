import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatFormFieldDefaultOptions,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TableColumns, TableFooter } from "@shared/models/list-table.interface";
import { getEsPaginatorIntl } from "@shared/paginator-intl/es-paginator-intl";
import { AlertService } from "@shared/services/alert.service";
import { DefaultService } from "@shared/services/default.service";
import { IconsService } from "@shared/services/icons.service";
import { SharedModule } from "@shared/shared.module";
import { IconModule } from "@visurel/iconify-angular";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { startWith, switchMap } from "rxjs/operators";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { scaleFadeIn400ms } from "src/@vex/animations/scale-fade-in.animation";

@Component({
  selector: "app-list-table",
  standalone: true,
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatIconModule,
    IconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    SharedModule,
  ],
  templateUrl: "./list-table.component.html",
  styleUrls: ["./list-table.component.scss"],
  animations: [scaleFadeIn400ms, fadeInUp400ms],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: getEsPaginatorIntl(),
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "standard" } as MatFormFieldDefaultOptions,
    },
  ],
})
export class ListTableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  @Input() service?: DefaultService;
  @Input() columns?: TableColumns<T>[];
  @Input() numRecords?: number = 10;
  @Input() getInputs: any;
  @Input() sortBy?: string;
  @Input() sortDir: string = "asc";
  @Input() footer: TableFooter<T>[] = [];

  @Output() rowClick = new EventEmitter<T>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  changesGetInputs = new EventEmitter<T>();

  dataSource = new MatTableDataSource<T>();

  visibleColumns?: Array<keyof T | string>;
  visibleFooter?: Array<keyof T | string | object>;

  paginatorOptions = {
    pageSizeOptions: [this.numRecords, 20, 50],
    pageSize: this.numRecords,
    pageLength: 0,
  };

  icMin = IconsService.prototype.getIcon("icMin");
  icAdd = IconsService.prototype.getIcon("icAddDetail");

  constructor(
    private _spinner: NgxSpinnerService,
    private _alert: AlertService
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.setVisibleColumns();
    }
    if (changes.getInputs && this.paginator) {
      this.paginator.pageIndex = 0;
      this.changesGetInputs.emit();
    }
  }

  setVisibleColumns() {
    this.visibleColumns = this.columns
      .filter((columns: any) => columns.visible)
      .map((columns: any) => columns.property);
  }

  ngAfterViewInit(): void {
    this.getDataByService();
    this.sortChanges();
    this.paginatorChanges();
  }

  async getDataByService() {
    this.changesGetInputs
      .pipe(
        startWith(""),
        switchMap(() => {
          this._spinner.show("modal-table");
          return this.service.GetAll(
            this.paginator.pageSize,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.getInputs
          );
        })
      )
      .subscribe((data: any) => {
        this.setData(data);
        this._spinner.hide("modal-table");
      });
  }

  setData(data: any) {
    if (data.isSuccess) {
      this.setVisibleColumns();
      this.paginatorOptions.pageLength = data.totalRecords;
      this.dataSource.data = data.data;
      if (data.footer) this.setFooter(data.footer);
    } else {
      this._alert.warn("Atención", "Ha ocurrido un error al cargar los datos.");
    }
  }

  setFooter(data: any) {
    this.visibleFooter = [];
    if (this.footer.length && data) {
      this.footer.forEach((e) => {
        this.visibleFooter.push({
          label: e.label,
          value: data[e.property],
          tooltip: e.tooltip,
        });
      });
    }
  }

  sortChanges() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.changesGetInputs.emit();
    });
  }

  paginatorChanges() {
    this.paginator.page.subscribe(() => {
      this.changesGetInputs.emit();
    });
  }

  substractQuantityPurcharse(row: any) {
    if (row.quantity > 0) {
      row.quantity--;
    }
    this.calculateTotalAmountPurcharse(row);
  }

  increaseQuantityPurcharse(row: any) {
    row.quantity++;
    this.calculateTotalAmountPurcharse(row);
  }

  calculateTotalAmountPurcharse(row: any) {
    const quantity = row.quantity;
    const unitPurcharsePrice = row.unitPurcharsePrice;

    if (quantity || unitPurcharsePrice) {
      row.totalAmount = (quantity * unitPurcharsePrice).toFixed(2);
    } else {
      row.totalAmount = "0.00";
    }
  }

  substractQuantitySale(row: any) {
    if (row.quantity > 0) {
      row.quantity--;
    }
    this.calculateTotalAmountSale(row);
  }

  increaseQuantitySale(row: any) {
    row.quantity++;
    this.calculateTotalAmountSale(row);
  }

  calculateTotalAmountSale(row: any) {
    const quantity = row.quantity;
    const unitSalePrice = row.unitSalePrice;

    if (quantity || unitSalePrice) {
      row.totalAmount = (quantity * unitSalePrice).toFixed(2);
    } else {
      row.totalAmount = "0.00";
    }
  }
}
