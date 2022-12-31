import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';

import { stagger20ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '../../../../@vex/animations/scale-fade-in.animation';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgxSpinnerService } from 'ngx-spinner';

import { getEsPaginatorIntl } from '../../paginator-intl/es-paginator-intl'

import icRadioButtonChecked from '@iconify/icons-ic/twotone-radio-button-checked';
import icRadioButtonUnchecked from '@iconify/icons-ic/twotone-radio-button-unchecked';


@Component({
    selector: 'vex-list-table-simple',
    templateUrl: './list-table-simple.component.html',
    styleUrls: ['./list-table-simple.component.scss'],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'standard'
            } as MatFormFieldDefaultOptions
        },
        { provide: MatPaginatorIntl, useValue: getEsPaginatorIntl() }
    ],
    animations: [
        stagger20ms,
        fadeInUp400ms,
        scaleFadeIn400ms
    ]
})

export class ListTableSimpleComponent<T> implements OnInit, OnChanges, AfterViewInit {

    @Input() columns: TableColumn<T>[];
    @Input() data: any;
    @Input() search = "";
    @Output() rowClick = new EventEmitter<any>();

    @Input() selectable = true

    visibleColumns: Array<keyof T | string>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<any>;

    icRadioButtonChecked = icRadioButtonChecked;
    icRadioButtonUnchecked = icRadioButtonUnchecked;

    constructor(private spinner: NgxSpinnerService) { }

    ngOnInit(): void {

        this.visibleColumns = this.columns.filter(column => !column.visible).map(column => column.property);
        this.data.forEach(e => e.Selected = false)

        this.dataSource = new MatTableDataSource(this.data);

        setTimeout(() => {
            this.changeSelection(this.dataSource.data[0])
        }, 300);


    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    changeSelection(e: any) {
        if (this.data.length) {
            this.dataSource.data.forEach(e => e.Selected = false)
            if (this.selectable) {
                e.Selected = true
                this.rowClick.emit(e)
            }
        }

    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.data) {
            if (this.dataSource) {
                this.dataSource.data = this.data
            }
        }

        if (changes.search) {
            if (this.dataSource) {
                this.dataSource.filter = this.search;
            }
        }

    }

}