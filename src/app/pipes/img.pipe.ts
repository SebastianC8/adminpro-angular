import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.base_url;

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(img: string, type: 'users' | 'hospitals' | 'doctors'): string {
    
    if (!img) {
      return `${API_URL}/upload/${type}/default-image.jpg`;
    } else if (img?.includes('https')) {
      return img;
    } else if (img) {
      return `${API_URL}/upload/${type}/${img}`;
    } else {
      return `${API_URL}/upload/${type}/default-image.jpg`;
    }

  }

}
