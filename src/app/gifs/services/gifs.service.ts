import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GifsSearchResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial  : string[]  = [];//localStorage.getItem('historial')?.replace('["',"").replace('"]',"").split('","') || [];
  private apiKey      : string    = 'R4gdf0HfRqtAjj1he9ASnI5AAChk3MVR';
  private urlService: string = 'https://api.giphy.com/v1/gifs';

  public result: Gif[] = [];

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.result = JSON.parse(localStorage.getItem('last-results')!) || [];
  }

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    if (!this._historial.includes(query) && query.trim().length>0) {
      this._historial.unshift(query);
    }
    this._historial = this._historial.splice(0, 10);

    localStorage.setItem('historial', JSON.stringify(this._historial));

    const params = new HttpParams().set("api_key", this.apiKey)
      .set("q", query)
      .set("limit", 10);

    this.http.get<GifsSearchResponse>(`${this.urlService}/search`, { params: params })
      .subscribe((resp) => {
        this.result = resp.data;
        localStorage.setItem('last-results', JSON.stringify(this.result));
      })
    // console.log(this._historial);
  }
}
