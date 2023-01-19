import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dilog-box',
  templateUrl: './dilog-box.component.html',
  styleUrls: ['./dilog-box.component.scss']
})
export class DilogBoxComponent  implements OnInit{
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  userDetailsForm: FormGroup;
  pusrpose :Boolean
  selectedEmployee:any
  validation_messages = {
    'fname': [
      { type: 'required', message: 'First name is required' }
    ],
    'lname': [
      { type: 'required', message: 'Last name is required' }
    ],
    'emailId': [
      { type: 'required', message: 'Email is required' }
    ],
    'dept': [
      { type: 'maxlength', message: 'Diparment cannot be more than 256 characters long' }
    ],
    'dob': [
      { type: 'required', message: 'Please insert your birthday' }
    ],
    'profileIcon': [
      { type: 'required', message: 'Please insert profile Icon' }
    ]
  };

  file_store: FileList;
  file_list: Array<string> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DilogBoxComponent>,private fb:FormBuilder,
    private employServic:EmployeeService, private snackBar: MatSnackBar) {
    if(data){
    this.message = data.message || this.message;
    this.pusrpose = data.purpose
    this.selectedEmployee = data.empoly
    console.log(data)
    console.log(this.pusrpose)
    console.log(this.selectedEmployee)

    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
      }
  }


  ngOnInit(): void {
    this.initEmployForm()
    if(this.pusrpose){
      this.resetForm(this.selectedEmployee)
     }
    }




  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  initEmployForm(){
    this.userDetailsForm = this.fb.group({
      fname: ['Lautaro', Validators.required],
      lname: ['Rinaldi', Validators.required],
      emailId: ['rinaldi@gmail.com', Validators.required],
      dept: ["Tech", Validators.maxLength(256)],
      dob: ['', Validators.required],
      profileIcon: ['', Validators.required],
    });

  }


  handleFileInputChange(l: any): void {
    this.file_store = l;
    console.log("l",l)
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      console.log("f",f)
      console.log("count",count)
      // this.userDetailsForm.patchValue(`${f.name}${count}`);
      this.userDetailsForm.controls['profileIcon'].setValue(`${f.name}${count}`);

      // this.userDetailsForm.value.profileIcon.patchValue(`${f.name}${count}`);
    } else {
      this.userDetailsForm.controls['profileIcon'].setValue('');
    }
  }

  handleSubmit(): void {
    var fd = new FormData();
    this.file_list = [];
    for (let i = 0; i < this.file_store.length; i++) {
      fd.append("files", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }

    // do submit ajax
  }


  onSubmitUserDetails() {
    console.log(this.userDetailsForm.value);
    this.userDetailsForm.value.dob = formatDate(this.userDetailsForm.value.dob, 'yyyy-MM-dd', 'en-US', '+0530');
    console.log(this.userDetailsForm.value);

    if(!this.pusrpose){
     this.addEmpoly(this.userDetailsForm.value)
    }else{
      this.updateEmploy(this.userDetailsForm.value)
    }
  }
  addEmpoly(value:any){
  this.employServic.addEmpoly(value).subscribe((res:any)=>{
    console.log(res)
    console.log(res.status)
    if(res.status='ok'){
      this.onConfirmClick()
      this.showSnackbar(res.message,"Updated")
    }

  })
  }
  updateEmploy(data:any){
    this.employServic.updateEmployee(this.selectedEmployee.empId,data).subscribe((res:any)=>{
     console.log(res)
     if(res.status='ok'){
      this.onConfirmClick()
      this.showSnackbar(res.message,"Updated")
     }
    })
  }
  showSnackbar(content:any,action:any) {
    this.snackBar.open(content,action, {
      duration: 1000,
    });
  }
  resetForm(data:any){
    console.log(data)
    if(data){
      this.userDetailsForm.controls['fname'].setValue(data.fname);
      this.userDetailsForm.controls['lname'].setValue(data.lname);
      this.userDetailsForm.controls['emailId'].setValue(data.emailId);
      this.userDetailsForm.controls['dept'].setValue(data.dept);
      this.userDetailsForm.controls['dob'].setValue(data.dob);
      this.userDetailsForm.controls['profileIcon'].setValue(data.profileIcon);
      console.log(this.userDetailsForm.value)
    }

  }
}

