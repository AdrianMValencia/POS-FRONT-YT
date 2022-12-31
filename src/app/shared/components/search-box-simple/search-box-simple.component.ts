import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import icClose from '@iconify/icons-ic/twotone-close';
import icSearch from '@iconify/icons-ic/twotone-search';
import { scaleInOutAnimation } from '../../../../@vex/animations/scale-in-out.animation';

@Component({
    selector: 'vex-search-box-simple',
    templateUrl: './search-box-simple.component.html',
    styleUrls: ['./search-box-simple.component.scss'],
    animations: [
        scaleInOutAnimation,
    ]
})

export class SearchBoxSimpleComponent implements OnInit {

    icClose = icClose;
    icSearch = icSearch;

    @Input() cleanStyle = true;
    @Output() search = new EventEmitter<any>();

    style: any
    form: UntypedFormGroup;
    isActive: true;

    constructor(private fb: UntypedFormBuilder) {

        this.form = this.fb.group({
            searchString: ['', [Validators.required]]
        })

    }

    ngOnInit(): void {

        this.style = {
            'shadow-8': !this.cleanStyle,
            'border': this.cleanStyle,
            'border-gray-light': this.cleanStyle,
        }

        this.form.statusChanges.subscribe(
            res => {
                if(res == "INVALID") {
                    this.search.emit("")
                }
            }
        )

    }

    reset() {
        this.form.get("searchString").patchValue("")
        this.search.emit("")
    }

    submit() {
        let data = this.form.get("searchString").value
        this.search.emit(data)
    }

}
