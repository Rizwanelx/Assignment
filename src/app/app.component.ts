import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DilogBoxComponent } from './dilog-box/dilog-box.component';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'angular_app';
  allEmpoly:any[]=[]
  today= new Date();
  jstoday = '';
  employForm: FormGroup;
  editing = false
  selectedEmployee:any
  constructor(private employeeService:EmployeeService,public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
   console.log(this.jstoday)
  }

  ngOnInit(): void {
  this.getEmpolyeeList()
  }

  getEmpolyeeList(){
    this.employeeService.getEmpolyeeList().subscribe((res:any)=>{
      this.allEmpoly = res.data
     })
  }

  calculateDiff(sentDate:any) {
    var date1:any = new Date(sentDate);
    var date2:any = new Date(this.jstoday);
    var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)/365.25);
    return diffDays;
}

openDialogForAdd(){
 this.editing=false
 this.openDialog()
}

openDialog() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {
    purpose :this.editing,
    message: 'Are you sure want to delete?',
    empoly:this.selectedEmployee

  };
  const dialogRef = this.dialog.open(DilogBoxComponent,dialogConfig);
  dialogRef.afterClosed().subscribe( (data:any) => {
    console.log("Dialog output:", data)
      this.getEmpolyeeList()
  }
);
}

showSnackbar(content:any,action:any) {
  this.snackBar.open(content,action, {
    duration: 1000,
  });
}

deleteEmpolyee(id:any){
  if(confirm('Are you sure want to delete ?'))
  this.employeeService.deleteEmpolyee(id).subscribe((res:any)=>{
  console.log(res)
  if(res.status){
    this.showSnackbar(res.message,"Deleted")
  }
  })
  this.getEmpolyeeList()
}
editEmpolyee(empoly:any){
  this.editing=true
  this.selectedEmployee = empoly
  console.log(this.selectedEmployee)
  this.openDialog()
}
}
