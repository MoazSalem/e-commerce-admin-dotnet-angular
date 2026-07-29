import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment.development';
import { Category } from '../../shared/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public readonly categoriesResource = rxResource({
    stream: () => this.http.get<Category[]>(`${this.apiUrl}Categories`)
  });
}
