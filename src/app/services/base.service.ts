import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private readonly baseUrl:string="https://localhost:7092/api/"

  constructor(private httpClient:HttpClient) { }

  public get(path:string){
    return this.getWithFullPath(`${this.baseUrl}${path}`);
  }
  

  public post(path:string, data:any){
    return this.postWithFullPath(`${this.baseUrl}${path}`, data);
  }

  public put(path:string, data:any){
    return this.putWithFullPath(`${this.baseUrl}${path}`, data);
  }

  public delete(path:string){
    return this.deleteWithFullPath(`${this.baseUrl}${path}`);
  }
  
  getWithFullPath(path: string) {
    return this.httpClient.get(path);
  }

  postWithFullPath(path: string, data: any) {
    return this.httpClient.post(path, data);
  }

  putWithFullPath(path: string, data: any) {
    return this.httpClient.put(path, data);
  }

  deleteWithFullPath(path: string) {
    return this.httpClient.delete(path);
  }
}
