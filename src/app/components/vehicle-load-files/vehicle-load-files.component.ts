import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-vehicle-load-files',
  templateUrl: './vehicle-load-files.component.html',
  styleUrls: ['./vehicle-load-files.component.css']
})
export class VehicleLoadFilesComponent implements OnInit {
  @Input() id: string;

  @ViewChild('fileInput') fileInput: ElementRef;
  public vehicleId: string ='';


  constructor(
    private photoService: PhotosService
    ) { }

  ngOnInit(): void {
    this.vehicleId = this.id;
  }

  uploadPhoto(): void{
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this.photoService.upload(this.vehicleId, nativeElement.files![0])
    .subscribe(x=> console.log(x));

  }

}
