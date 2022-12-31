import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDeleteForever from '@iconify/icons-ic/twotone-delete-forever';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger20ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { DefaultService } from '../../services/default.service';
import { scaleFadeIn400ms } from '../../../../@vex/animations/scale-fade-in.animation';

import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';
import { getEsPaginatorIntl } from '../../paginator-intl/es-paginator-intl'

@Component({
    selector: 'vex-list-table',
    templateUrl: './list-table.component.html',
    styleUrls: ['./list-table.component.scss'],
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
export class ListTableComponent<T> implements OnInit, OnChanges, AfterViewInit {

    @Input() service: DefaultService;
    @Input() columns: TableColumn<T>[];
    @Input() pageSize = 10; // deprecado
    @Input() pageSizeOptions = [10, 20, 50]; // deprecado
    @Input() searchStr: string; // deprecado
    @Input() getInputs: any;
    @Input() selected: any;
    @Input() selectedCompareAttr: string;
    @Input() id: any = null;
    @Input() id2?: any = null;
    @Input() sortBy: string;
    @Input() sortDir: string = "asc";
    @Input() buttonLabel: string;
    // Sirve para ejecutar 
    @Input() refreshId: number;

    filterEmmit: EventEmitter<any> = new EventEmitter();

    // rowClick
    @Output() rowClick = new EventEmitter<any>();

    visibleColumns: Array<keyof T | string>;
    dataSource = new MatTableDataSource<T>();

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    icMoreVert = icMoreVert;
    icStar = icStar;
    icStarBorder = icStarBorder;
    icDeleteForever = icDeleteForever;
    icEdit = icEdit;

    resultsLength = 0;
    resultsPerPage = 10;

    isFirstLoad = true

    constructor(private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.columns) {
            this.visibleColumns  = this.columns.filter(column => !column.visible).map(column => column.property);
        }


        if(changes.getInputs) {

            if(this.paginator){
                this.paginator.pageIndex = 0
            }
            this.filterEmmit.emit()

        }

        if(changes.refreshId) {

            this.filterEmmit.emit()

        }
        
    }

    ngAfterViewInit() {
        
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);        
        merge(
            this.sort.sortChange,
            this.paginator.page,
            this.filterEmmit
        )
            .pipe(
                startWith({}),
                switchMap(() => {

                    let sort = this.sort.active
                    let size = this.paginator.pageSize

                    this.spinner.show('modal-table');
                    return this.service!.GetAll(
                        size, sort, this.sort.direction, this.paginator.pageIndex, this.getInputs, this.id, this.id2);
                }),
                map(data => {
                    
                    // Flip flag to show that loading has finished.
                    this.spinner.hide('modal-table');
                    // this.isRateLimitReached = false;
                    this.resultsLength = data.data.totalRecords;

                    this.isFirstLoad = false
                    
                    // foreach para detectar cuales ya estan seleccionados
                    if(this.selected) {                      

                        data.data.items.forEach( element => {
                            
                            this.selected.forEach(seletedItem => {
                              if (element[this.selectedCompareAttr] == seletedItem[this.selectedCompareAttr]) {
                                element.selected = true;
                              }
                            });
                        });
                        
                    }
                    return data.data.items

                }),
                catchError((e) => {
                    this.spinner.hide('modal-table');
                    return observableOf([]);
                })
            ).subscribe(data => this.dataSource.data = data);            
    }

    changeSelection(row: any) {

        row.selected = !row.selected        
        if(row.selected) {
            this.selected.push(row)
        } else {
            let find = this.selected.find(e => e[this.selectedCompareAttr] == row[this.selectedCompareAttr])
            if(find){
                let newSelected = this.selected.filter(e => e[this.selectedCompareAttr] !== row[this.selectedCompareAttr]);
                this.selected.splice(0, this.selected.length);
                newSelected.forEach(element => {
                    this.selected.push(element)
                });
            }
        }
    }
}