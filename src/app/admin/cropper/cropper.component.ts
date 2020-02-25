import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ImgResolution, ImgCropperConfig, ImgCropperEvent } from '@alyle/ui/image-cropper';
import { LyTheme2 } from '@alyle/ui';

const styles = {
  actions: {
    display: 'flex'
  },
  cropping: {
    maxWidth: '400px',
    height: '300px'
  },
  flex: {
    flex: 1
  }
};

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CropperComponent implements OnInit {

  classes = this.theme.addStyleSheet(styles);
  croppedImage?: string;
  result: string;
  myConfig: ImgCropperConfig = {
    width: 400, // Default `250`
    height: 225, // Default `200`,
    output: ImgResolution.Default // Default ImgResolution.Default
  };

  constructor(
    private theme: LyTheme2
  ) { }

  ngOnInit() {
  }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    console.log('cropped img: ', e);
  }
}
