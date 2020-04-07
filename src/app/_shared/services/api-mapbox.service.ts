import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ApiMapboxService {

  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer
  ) { }

  getStaticMap(lat: number, lon: number): Observable<any> {
    const accessToken = environment.mapbox.accessToken;
    const style = 'styles/v1/mapbox/streets-v11/static';
    const marker = `pin-s-car+285A98(${lon},${lat})`;
    const zoom = 15;  // [0-20], higher number is more zoomed-in
    const dimensions = '500x160';
    // tslint:disable-next-line:max-line-length
    const mapboxApiQuery = `https://api.mapbox.com/${style}/${marker}/${lon},${lat},${zoom}/${dimensions}?access_token=${accessToken}`;
    return this.http.get(mapboxApiQuery, { responseType: 'blob' }).pipe(
      map( blob => {
        // need to convert image blob into image URL for displaying using img src
        const imageUrl = URL.createObjectURL(blob);
        const image = this.domSanitizer.bypassSecurityTrustUrl(imageUrl);
        return image;
      })
    );
  }
}
