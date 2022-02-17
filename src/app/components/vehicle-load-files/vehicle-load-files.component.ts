import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PhotoModel } from 'src/app/interfaces/photo-model';
import { PhotosService } from 'src/app/services/photos.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import Swal from "sweetalert2";

@Component({
  selector: 'app-vehicle-load-files',
  templateUrl: './vehicle-load-files.component.html',
  styleUrls: ['./vehicle-load-files.component.css']
})
export class VehicleLoadFilesComponent implements OnInit {
  @Input() id: string;

  @ViewChild('fileInput') fileInput: ElementRef;
  public vehicleId: string = '';
  public photos: PhotoModel[];
  public isLoading: boolean = false;
  public percentage: number = 0;

  constructor(
    private photoService: PhotosService,
  ) { }

  ngOnInit(): void {
    this.vehicleId = this.id;

    this.photoService.getAll(this.vehicleId)
      .subscribe(p => this.photos = resolveImages(p));
  }

  uploadPhoto(): void {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file=nativeElement.files![0];
    nativeElement.value = '';
    /* Con la configuración en el http.client para observar los eventos */
    /* validamos el tipo de eventos para calcular el porcentaje y el tipo de Response es */
    /* la response del servicio. */
    this.photoService.upload(this.vehicleId, file)
      .subscribe(event => {
        this.isLoading = true
        if (event.type === HttpEventType.UploadProgress) {
          this.percentage = Math.round(event.loaded / event.total * 100);
          console.log('Upload process: ' + this.percentage + '%');
        }
        if (event.type === HttpEventType.Response) {
          console.log(event);
          this.photos.push({
            id: event.body.id,
            fileName: event.body.fileName,
            vehicleId: event.body.vehicleId,
            imageBase64: 'data:image/png;base64,' + event.body.imageFileBase64,
            image: new Blob([event.body.imageFile], { type: 'image/png' })
          })
        }
      },
        (err)=>{ 
          console.log({errorSubs:err});
          this.isLoading = false;
          Swal.fire({
          allowOutsideClick: true,
          title: 'Error',
          icon:'error',
          text: err.error
        });
        },
        () => { this.isLoading = false; }
      );


    // this.photoService.upload(this.vehicleId, nativeElement.files![0])
    //   .subscribe(photoResult =>
    //     this.photos.push({
    //       id: photoResult.id,
    //       fileName: photoResult.fileName,
    //       vehicleId: photoResult.vehicleId,
    //       imageBase64: 'data:image/png;base64,' + photoResult.imageFileBase64,
    //       image: new Blob([photoResult.imageFile], { type: 'image/png' })
    //     })
    //   );

    this.isLoading = false;
  }

}
function resolveImages(p: any[]): any[] {
  let newPhotos: PhotoModel[] = [];
  p.forEach(element => {
    newPhotos.push({
      id: element.id,
      fileName: element.fileName,
      vehicleId: element.vehicleId,
      imageBase64: 'data:image/png;base64,' + element.imageFileBase64,
      image: new Blob([element.imageFile], { type: 'image/png' }),
    });
  });
  console.log({ newPhotos: newPhotos });
  return newPhotos;
}

/** Return distinct message for sent, upload progress, & response events */
function getEventMessage(event: HttpEvent<any>, file: File) {
  switch (event.type) {
    case HttpEventType.Sent:
      return `Uploading file "${file.name}" of size ${file.size}.`;

    case HttpEventType.UploadProgress:
      // Compute and show the % done:
      const percentDone = Math.round(100 * event.loaded / (event.total ?? 0));
      return `File "${file.name}" is ${percentDone}% uploaded.`;

    case HttpEventType.Response:
      return `File "${file.name}" was completely uploaded!`;

    default:
      return `File "${file.name}" surprising upload event: ${event.type}.`;
  }
}

