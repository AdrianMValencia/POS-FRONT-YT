import { AbstractControl, UntypedFormGroup } from '@angular/forms';

export class GenericValidators {
    /**
    * Validar que todos los caracteres sean solo números o caracteres de alfabeto
    * @param control valor de control de formulario
    */
      static alphanumeric(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^[0-9a-zA-Z, ]+$/.test(control.value)){
                return null;
            }else{
                return { 'alphanumeric': true };
            } 
        } else {
            return null;
        }
    }

    /**
    * Validar que todos los caracteres sean solo números o caracteres de alfabeto
    * @param control valor de control de formulario
    */
      static defaultDescription(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^[0-9 a-zA-Z.ÑñÁÉÍÓÚáéíóúÄËÏÖÜäëïöü]+$/.test(control.value)) return null;
            else return { 'defaultDescription': true };
        } else {
            return null;
        }
    }

    /**
    * Validar que todos los caracteres sean solo números o caracteres de alfabeto
    * @param control valor de control de formulario
    */
     static defaultName(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^[a-zA-Z ÑñÁÉÍÓÚáéíóúÄËÏÖÜäëïöü]+$/.test(control.value)) return null;
            else return { 'defaultName': true };
        } else {
            return null;
        }
    }


     /**
    * Validar que todos los caracteres sean solo números o caracteres de alfabeto
    * @param control valor de control de formulario
    */
      static defaultBussinessName(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^[a-zA -ZÑñÁÉÍÓÚáéíóúÄËÏÖÜäëïöü&._-]+$/.test(control.value)) return null;
            else return { 'defaultBussinessName': true };
        } else {
            return null;
        }
    }


    /**
    * Validar que todos los caracteres sean solo números o caracteres de alfabeto
    * @param control valor de control de formulario
    */
     static document(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^(?!(0{9}|0{10}|0{11})$)([a-zA-Z0-9]{9,11})$/.test(control.value)) return null;
            else return { 'document': true };
        } else {
            return null;
        }
    }
    /**
    * Validar que todos los caracteres sean solo números o caracteres de alfabeto
    * @param control valor de control de formulario
    */
     static pasaporte(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^(?!(0{11}))[a-zA-Z0-9]{11}$/.test(control.value)) return null;
            else return { 'pasaporte': true };
        } else {
            return null;
        }
    }
    /**
    * Validar que todos los caracteres sean solo números o caracteres de alfabeto
    * @param control valor de control de formulario
    */
     static dni(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^(?!00000000$)([0-9]{8})$/.test(control.value)) return null;
            else return { 'dni': true };
        } else {
            return null;
        }
    }

     /**
    * Validar que todos los caracteres sean solo números o caracteres de alfabeto
    * @param control valor de control de formulario
    */
      static rucPersonaJuridica(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^20[0-9]{9}$/.test(control.value) ) return null;
           
            else return { 'rucPersonaJuridica': true };
        } else {
            return null;
        }
    }
    
     /**
    * Validar que todos los caracteres sean solo números o caracteres de alfabeto
    * @param control valor de control de formulario
    */
      static rucPersonaNatural(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if ( /^(10|15|17)([0-9]{9})$/.test(control.value)) {
            return null;
        }
            else return { 'rucPersonaNatural': true };
        } else {
            return null;
        }
        
    }
    /**
    * Validar que todos los caracteres sean solo números o caracteres de alfabeto
    * @param control valor de control de formulario
    */
     static numeric(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^[0-9.]+$/.test(control.value)) return null;
            else return { 'numeric': true };
        } else {
            return null;
        }
    }    
    /**
    * Validar que todos los caracteres sean solo números o caracteres de alfabeto
    * @param control valor de control de formulario
    */
    static numericDecimal(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^[0-9]*[.]?[0-9]{1,2}$/.test(control.value)) return null; 
            else return { 'numericDecimal': true };
        } else {
            
            return null;
        }
    }
     /**
    * Validar que todos los caracteres sean solo números o caracteres de alfabeto
    * @param control valor de control de formulario
    */
      static deducible(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
           
            if (/^[0-9]{1,3}$/.test(control.value)){
              var number= Number(control.value.toString())
                if((control.value.toString().length>=3 && number>100) || number==0 ){
                   
                    return { 'deducible': true };
                }
                return null;
            }  
            else return { 'deducible': true };
        } else {
            
            return null;
        }
    }


    /**
    * Valida un email
    * @param control valor de control de formulario
    */

     static emailValidation(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(control.value)) return null;
            else return { 'emailValidation': true };
        } else {
            return null;
        }
    }

    static SSOemailValidation(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            
            let whitelist = '[a-z0-9.-]+\.[a-z]{2,4}';

            var re = new RegExp("[a-zA-Z0-9._-]+@"+whitelist+"$"); 

            if (re.test(control.value)) return null;
            else return { 'SSOemailValidation': true };

        } else {
            return null;
        }
    }



    private static dniPattern = "(^(?!.*([1][2][3][4][5][6][7][8])).*)(^[0-9]{8,8}$)";
    private static cePattern = "^[a-zA-Z0-9]*$";
    private static legalNamePattern = "^[a-zA-Z0-9\-\,\:\(\)\&\$\#\.ÑñÁÉÍÓÚáéíóúÄËÏÖÜäëïöü\' ]*$";
    private static latinTextPattern = "^[A-Za-zÑñÁÉÍÓÚáéíóúÄËÏÖÜäëïöü\' ]*$";

    static getLatinTextPattern(): string | RegExp {
        return this.latinTextPattern;
    }
    static getLegalNamePattern(): string {
        return this.legalNamePattern;
    }
    static getCePattern(): string {
        return this.cePattern;
    }
    static getDniPattern(): string {
        return this.dniPattern;
    }

    /**
       * Validar que todos los caracteres no sean iguales
       * @param control valor de control de formulario
       */
    static notAllCharactersAreEqualValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.length == 8) {
            let areAllEqual: boolean = true;
            for (var i = 0; i < control.value.length; i++) {
                if (i > 0) {
                    if (control.value.charAt(i) != control.value.charAt(i - 1)) areAllEqual = false;
                }
            }
            if (areAllEqual == true) return { 'AllCharactersAreEqual': true };
            else return null; //validation was passed
        } else {
            return null;
        }
    }

    /**
    * Validar que todos los caracteres sean solo números
    * @param control valor de control de formulario
    */
    static onlyNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^[0-9]+$/.test(control.value)) return null;
            else return { 'IsNotNumber': true };
        } else {
            return null;
        }
    }

   
    /**
    * Validar que todos los caracteres sean caracteres de alfabeto y espacios
    * @param control valor de control de formulario
    */
    static onlyTextAndSpaceValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (/^[A-Za-z ]+$/.test(control.value)) return null;
            else return { 'IsNotTextOrSpace': true };
        } else {
            return null;
        }
    }

    /**
    * Validar que el número de RUC solo pueda empezar con "10", "15", "17" y "20", en caso contrario será considerado no válido
    * @param control valor de control de formulario
    */
    static rucNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (control.value.toString().trim().substring(0, 2) == "10" || control.value.toString().trim().substring(0, 2) == "15"
                || control.value.toString().trim().substring(0, 2) == "17" || control.value.toString().trim().substring(0, 2) == "20") {
                return null;
            } else return { 'notValidRUC': true };
        } else {
            return null;
        }
    }

    /**
    * Validar que no haya más de 3 vocales juntas
    * @param control valor de control de formulario
    */
    static vowelLimitValidation(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            let vowelCount = 0;
            for (let i = 0; i < control.value.toString().trim().length; i++) {
                // if (/[aeiouAEIOU]/.test(control.value.toString().trim().charAt(i))) vowelCount++;
                // else vowelCount = 0;
                if (/[AEIOUaeiouÁÉÍÓÚáéíóúÄËÏÖÜäëïöü]/.test(control.value.toString().trim().charAt(i))) vowelCount++;
                else if (/[\']/.test(control.value.toString().trim().charAt(i)) == false) vowelCount = 0;

                if (vowelCount > 3) return { 'moreThanThreeVowels': true };
            }
            return null;
        } else {
            return null;
        }
    }

    /**
    * Validar que no haya 5 consonantes juntas
    * @param control valor de control de formulario
    */
    static consonantLimitValidation(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            let consonantCount = 0;
            for (let i = 0; i < control.value.toString().trim().length; i++) {
                if (/[qwrtypsdfghjklñzxcvbnmñ]/.test(control.value.toString().trim().toLowerCase().charAt(i))) consonantCount++;
                else consonantCount = 0;

                if (consonantCount > 6) return { 'moreThanFiveConsonants': true };
            }
            return null;
        } else {
            return null;
        }
    }
    

    /**
    * Validar que la fecha de inicio "startDate" no sea posterior a la fecha de fin "endDate"
    * @param group formulario
    */
    static dateSort(group: UntypedFormGroup): any {
        if (group) {
            if (group.get("startDate").value > group.get("endDate").value) {
                return { datesNotSortedCorrectly: true };
            } else {
                return null;
            }
        }

        return null;
    }

    /**
    * Validar que la fecha no sea menor a 01/01/1900
    * @param control valor de control de formulario
    */
    static tooOldDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (control.value <= new Date("01/01/1900")) return { 'tooOldDate': true };
            return null;
        } else {
            return null;
        }
    }

    /**
    * Validar la fecha para un componente personalizado
    * @param control valor de control de formulario
    */
    static notValidDate(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if (control.value.toString().trim() == "Invalid Date") return { 'InvalidDate': true };
            else return null; //validation was passed
        } else {
            return null;
        }
    }

      /**
    * Validar celular que inicien con 9 
    * @param control valor de control de formulario
    */
       static celularValidate(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value != null && control.value.toString().trim() != "") {
            if ( /^(9)([0-9]{8})$/.test(control.value)) {
            return null;
        }
            else return { 'celularValidate': true };
        } else {
            return null;
        }
        
    }

       /**
    * Validar Telefono que inicien con 9 
    * @param control valor de control de formulario
    */
        static telefonoValidate(control: AbstractControl): { [key: string]: boolean } | null {
            if (control.value != null && control.value.toString().trim() != "") {
                if ( /^(?!9|0{9}$|(010{7}$)|(0[0]{2}\d{1,6}$))(0[0-9]{8})$/.test(control.value)) {
                return null;
            }
                else return { 'telefonoValidate': true };
            } else {
                return null;
            }
            
        }

}