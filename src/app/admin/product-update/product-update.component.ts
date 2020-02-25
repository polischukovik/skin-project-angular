import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Product } from 'src/app/products/entity/product';
import { switchMap, tap } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/products/product.service';
import { Observable } from 'rxjs';
import { LyTheme2 } from '@alyle/ui';
import { ImgCropperConfig, ImgResolution, ImgCropperEvent, LyImageCropper } from '@alyle/ui/image-cropper';

const styles = {
  actions: {
    display: 'flex'
  },
  cropping: {
    width: '400px',
    height: '300px'
  },
  flex: {
    flex: 1
  }
};

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductUpdateComponent implements OnInit {

  product: Product;
  form: FormGroup;
  product$: Observable<Product>;
  imageData = '../../../assets/images/product-1-400.png';

  showCropper: false;
  classes = this.theme.addStyleSheet(styles);
  croppedImage?: string;
  result: string;
  myConfig: ImgCropperConfig = {
    width: 400,
    height: 225,
    output: ImgResolution.Default
  };

  @ViewChild(LyImageCropper, {static: false}) cropping: LyImageCropper;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private theme: LyTheme2
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl(''),
      size: new FormControl(''),
      price: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl('')
    });

    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productService
          .findOne(params.get('uuid'))
          .pipe( tap( product => {
            this.form.patchValue(product);
            this.imageData = product.image;
          }) )
      )
    );

    this.product$.subscribe( product => this.product = product );
  }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    this.imageData = e.dataURL;
    this.form.patchValue( {image: e.dataURL} );
    this.showCropper = false;
  }

  cancel() {
    this.cropping.clean();
    this.showCropper = false;
  }
}
