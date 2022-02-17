import { ErrorHandler } from "@angular/core";
import Swal from "sweetalert2";

export class AppHandlerError implements ErrorHandler {
    
    
    handleError(error: any): void {
        //throw new Error("Method not implemented.");
        console.log({error:error});
        Swal.fire({
            allowOutsideClick: true,
            title: 'Error',
            icon:'error'
          });

        console.log('error desde handler');
    }
}
