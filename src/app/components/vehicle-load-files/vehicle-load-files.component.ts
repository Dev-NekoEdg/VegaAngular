import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PhotoModel } from 'src/app/interfaces/photo-model';
import { PhotosService } from 'src/app/services/photos.service';
import { DomSanitizer } from '@angular/platform-browser';

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


  constructor(
    private photoService: PhotosService,
    private sanitazer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.vehicleId = this.id;

    this.photoService.getAll(this.vehicleId)
      .subscribe(p => this.photos = resolveImages(p));
  }

  uploadPhoto(): void {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this.photoService.upload(this.vehicleId, nativeElement.files![0])
      .subscribe(photoResult => {
        this.photos.push({
          id: photoResult.id,
          fileName: photoResult.fileName,
          vehicleId: photoResult.vehicleId,
          imageBase64: 'data:image/png;base64,' + photoResult.imageFileBase64,
          image: new Blob([photoResult.imageFile], { type: 'image/png' }),
        });
      });
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

