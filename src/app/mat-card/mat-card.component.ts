import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DilogBoxComponent } from '../dilog-box/dilog-box.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-mat-card',
  templateUrl: './mat-card.component.html',
  styleUrls: ['./mat-card.component.scss']
})
export class MatCardComponent implements OnInit {
   @Input() empoly:any
   title = 'angular_app';
   allEmpoly:any[]=[]
   today= new Date();
   jstoday = '';
   employForm: FormGroup;
   editing = false
   selectedEmployee:any
   @Output() deleteEmpolyeeEvent = new EventEmitter<string>();
   constructor(private employeeService:EmployeeService,public dialog: MatDialog, private snackBar: MatSnackBar) {
     this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
   }
  ngOnInit(): void {
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
  const dialogRef = this.dialog.open(DilogBoxComponent,dialogConfig,);
  dialogRef.afterClosed().subscribe( (data:any) => {
    console.log("Dialog output:", data)
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
  if(res.status==='ok'){
    this.showSnackbar(res.message,"Deleted")
    this.deleteEmpolyeeEvent.emit('ok');
  }
  })
}
editEmpolyee(empoly:any){
  this.editing=true
  this.selectedEmployee = empoly
  console.log(this.selectedEmployee)
  this.openDialog()
}
}
