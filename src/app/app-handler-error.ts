import { ErrorHandler } from "@angular/core";
import Swal from "sweetalert2";

export class AppHandlerError implements ErrorHandler {
    
    
    handleError(error: any): void {
        //throw new Error("Method not implemented.");
        Swal.fire({
            allowOutsideClick: true,
            title: 'Error',
            icon:error,
            text: error.originalError
          });

        console.log('error desde handler');
    }
}
