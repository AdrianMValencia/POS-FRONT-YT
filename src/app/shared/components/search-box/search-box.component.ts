import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import icClose from '@iconify/icons-ic/twotone-close';
import icSearch from '@iconify/icons-ic/twotone-search';
import arrowDropDown from '@iconify/icons-ic/arrow-drop-down';

import { scaleInOutAnimation } from '../../../../@vex/animations/scale-in-out.animation';

@Component({
    selector: 'vex-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss'],
    animations: [
        scaleInOutAnimation,
    ]
})
export class SearchBoxComponent implements OnInit {

    icClose = icClose;
    icSearch = icSearch;
    arrowDropDown = arrowDropDown;

    classStyle = [];

    formInvalid = true

    form: UntypedFormGroup;
    isActive = true;
    style: any
    @Input() cleanStyle = true;
    @Input() textFilter = '';
    @Input() searchOptions = [];
    @Input() searchOptions2 = [];

    validation_desc = ""

    labelSelection = {
        'label': '',
        'placeholder': '',
        'validations': ''
    };
    labelSelection2 = {
        'label': '',
        'value': '',
    };

    @Output() search = new EventEmitter<any>();

    constructor(private fb: UntypedFormBuilder) {

        this.form = this.fb.group({
            searchString: [this.textFilter, []],
            searchValue: ['', [Validators.required]],
            searchSource: ['', [Validators.required]],
            searchValue2: [''],
        })

    }

    ngOnInit(): void {

        this.style = {
            'shadow-8': !this.cleanStyle,
            'border': this.cleanStyle,
            'border-gray-light': this.cleanStyle,
        }

        this.form.controls['searchString'].setValue(this.textFilter);

        if (this.searchOptions2.length) {
            this.changeSelection2(this.searchOptions2[0])
        }
        this.changeSelection(this.searchOptions[0]);

        this.form.statusChanges.subscribe(
            res => {
                if (res == 'INVALID') {
                    this.formInvalid = true
                } else {
                    this.formInvalid = false
                }
            }
        )
    }

    setSearchStringValidation(validation: any, minLength: number) {

        let searchString = this.form.get('searchString')

        searchString.clearValidators()

        let setValidation = []
        setValidation.push(Validators.required)
        setValidation.push(Validators.minLength(minLength))
        setValidation.push(Validators.maxLength(30))

        if (validation) {
            validation.forEach(e => {
                setValidation.push(e)
            });
        } else {
            console.warn('Falta validaciones al tipo de busqueda seleccionado')
        }

        searchString.setValidators(setValidation)
        // console.log(this.form.valid)
    }

    changeSelection(option: any) {

        this.classStyle = option.class_style != null ? option.class_style : []

        this.labelSelection = option;
        this.form.controls['searchSource'].setValue(option.label);
        this.form.controls['searchValue'].setValue(option.value);

        this.validation_desc = option.validation_desc ? option.validation_desc : ''

        let min_length = option.min_length ? option.min_length : 3
        this.setSearchStringValidation(option.validation, min_length)
    }

    changeSelection2(option: any) {
        this.labelSelection2 = option

    }

    reset() {
        this.form.controls['searchString'].setValue("");
        this.submit(true);
    }

    submit(reset = false) {

        if (!reset) {
            this.isActive = true;
            if (!this.form.valid) {
                return false;
            }
        } else {
            this.isActive = false;
        }

        if (this.searchOptions2.length) {
            this.form.controls['searchValue2'].setValue(this.labelSelection2.value);
        }

        let data = this.form.getRawValue()
        data.searchString = data.searchString.trim()

        this.search.emit(data)
    }

}