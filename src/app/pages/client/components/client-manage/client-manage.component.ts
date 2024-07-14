import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { DocumentType } from "@shared/models/document-type.interface";
import { DocumentTypeService } from "@shared/services/document-type.service";
import { IconsService } from "@shared/services/icons.service";
import { statesSelect } from "src/static-data/configs";
import { ClientService } from "../../services/client.service";
import { AlertService } from "@shared/services/alert.service";

@Component({
  selector: "vex-client-manage",
  templateUrl: "./client-manage.component.html",
  styleUrls: ["./client-manage.component.scss"],
})
export class ClientManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");

  configs = statesSelect;

  documentTypes: DocumentType[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      clientId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      documentTypeId: ["", [Validators.required]],
      documentNumber: ["", [Validators.required]],
      address: [""],
      phone: [""],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _documentTypeService: DocumentTypeService,
    private _clientService: ClientService,
    private _alert: AlertService,
    public _dialogRef: MatDialogRef<ClientManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listDocumentTypes();
    if (this.data.mode == "edit") {
      this.clientById(this.data.dialogConfig.data.clientId);
    }
  }

  clientById(clientId: number): void {
    this._clientService.clientById(clientId).subscribe((resp) => {
      this.form.reset({
        clientId: resp.clientId,
        name: resp.name,
        email: resp.email,
        documentTypeId: resp.documentTypeId,
        documentNumber: resp.documentNumber,
        address: resp.address,
        phone: resp.phone,
        state: resp.state,
      });
    });
  }

  listDocumentTypes(): void {
    this._documentTypeService.listDocumentTypes().subscribe((resp) => {
      this.documentTypes = resp;
    });
  }

  clientSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const clientId = this.form.get("clientId").value;

    if (clientId > 0) {
      this.clientEdit(clientId);
    } else {
      this.clientRegister();
    }
  }

  clientRegister(): void {
    this._clientService.clientRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  clientEdit(clientId: number) {
    this._clientService
      .clientEdit(clientId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }
}
