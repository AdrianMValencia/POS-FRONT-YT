import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';

@Component({
    selector: 'vex-modal-confirm',
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

    icClose = icClose;
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ModalConfirmComponent>,
    ) { }

    ngOnInit(): void {}
    
    aceptar() {
        this.dialogRef.close(true);
    }

}
