import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GifsSearchResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];//localStorage.getItem('historial')?.replace('["',"").replace('"]',"").split('","') || [];
  private apiKey: string = 'R4gdf0HfRqtAjj1he9ASnI5AAChk3MVR';

  public result: Gif[] = [];

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
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

    this.http.get<GifsSearchResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((resp) => {
        this.result = resp.data;
      })
    // console.log(this._historial);
  }
}
