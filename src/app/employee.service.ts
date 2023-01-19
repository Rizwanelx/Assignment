import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl="https://ml.thelightbulb.ai/api/"

  constructor( private http: HttpClient) { }

  getEmpolyeeList(){
   return this.http.get(this.apiUrl+"employees")
  }
  addEmpoly(data:any){
    return this.http.post(this.apiUrl+"employees",data)
  }
  deleteEmpolyee(id:any){
    return this.http.delete(this.apiUrl+"employees/"+id)
  }
  updateEmployee(id:any, data:any){
    return this.http.put(this.apiUrl+"employees/"+id,data)
  }
}
