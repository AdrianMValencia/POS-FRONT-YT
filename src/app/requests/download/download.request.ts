import { convertDateToRequest } from 'src/app/shared/functions/helpers'

export class downloadRequest {
    private numFilter : number;
    private textFilter : string;
    private stateFilter : number;
    private startDate:string;
    private endDate:string;
    private startDateTwo:string;
    private endDateTwo:string
    private download:boolean
    private pagination:boolean
    private codIpress?: string
    private nroLot?: string
    private nro_decla?: number

    constructor(
        getInputs:any
        
        ){
            this.numFilter = getInputs.numFilter,
            this.textFilter = getInputs.textFilter,
            this.stateFilter = getInputs.stateFilter

            this.startDate = getInputs.startDate == null ? null : convertDateToRequest(getInputs.startDate, 'date');
            this.endDate = getInputs.endDate == null ? null : convertDateToRequest(getInputs.endDate, 'date');
            this.startDateTwo = getInputs.startDateTwo == null ? null : convertDateToRequest(getInputs.startDateTwo, 'date');
            this.endDateTwo = getInputs.endDateTwo == null ? null : convertDateToRequest(getInputs.endDateTwo, 'date');

            this.nro_decla = getInputs.nro_decla == null ? null : getInputs.nro_decla;

            this.download = true
            this.pagination = false
    }
}