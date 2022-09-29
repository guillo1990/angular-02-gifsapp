import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];
  private apiKey: string = 'R4gdf0HfRqtAjj1he9ASnI5AAChk3MVR';

  public result: any[] = [];

  constructor(private http: HttpClient) {

  }

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    if (!this._historial.includes(query) && query.trim().length>0) {
      this._historial.unshift(query);
    }
    this._historial = this._historial.splice(0, 10);

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((resp: any) => {
        console.log(resp.data);
        this.result = resp.data;
      })
    // console.log(this._historial);
  }
}
