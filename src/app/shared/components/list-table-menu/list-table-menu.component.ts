import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { ListTableMenu } from 'src/app/commons/list-table-menu.interface';
import icMenuDown from '@iconify/icons-ic/baseline-arrow-drop-down';

@Component({
    selector: 'vex-list-table-menu',
    templateUrl: './list-table-menu.component.html',
    styleUrls: ['./list-table-menu.component.scss'],
    animations: [
        fadeInRight400ms,
        stagger40ms
    ]
})

export class ListTableMenuComponent implements OnInit {

    icMenuDown = icMenuDown
    
    @Input() currentCategory: number = null;

    @Input() items: ListTableMenu[];

    @Input() isDropdown: boolean = false;

    @Output() filterChange = new EventEmitter<any>();

    @Input() buttonShow = false;
    @Input() hiddenHeader = false;

    @Input() buttonLabel = "Button";
    @Input() buttonLabel2 = "Button2";
    @Output() buttonClick?= new EventEmitter<any>();
    @Output() buttonClick2?= new EventEmitter<any>();

    activeCategory: ListTableMenu['id'] = 'all';

    constructor() { }

    ngOnInit(): void { 
        this.setCurrentFilter(this.currentCategory)
    }

    setFilter(category: ListTableMenu) {
        this.activeCategory = category.id;
        return this.filterChange.emit(category);
    }

    setCurrentFilter(categoryNumber: number) {
        let currentCategory = this.items.find((category) => category.value == categoryNumber);
        this.activeCategory = currentCategory.id;
    }

    isActive(category: ListTableMenu['id']) {
        return this.activeCategory === category;
    }

    emitClick() {
        if (this.buttonShow) {
            return this.buttonClick.emit();
        }
    }

    emitClick2() {
        if (this.isDropdown) {
            return this.buttonClick2.emit();
            
        }
    }
}