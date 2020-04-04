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
    // tslint:disable-next-line:max-line-length
    const mapboxApiQuery = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-car+285A98(${lon},${lat})/${lon},${lat},15/500x120?access_token=${accessToken}`;
    return this.http.get(mapboxApiQuery, { responseType: 'blob' }).pipe(
      map( blob => {
        const imageUrl = URL.createObjectURL(blob);
        const image = this.domSanitizer.bypassSecurityTrustUrl(imageUrl);
        return image;
      })
    );
  }
}
