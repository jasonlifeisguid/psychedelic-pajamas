import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProductModel } from './model/Products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  productForm: FormGroup = new FormGroup({});
  productObj: ProductModel = new ProductModel();
productList:  ProductModel[] = []; 

  constructor(){
    this.createForm();
    const oldData = localStorage.getItem("ProdData")
  if(oldData!=null){
    const parseData = JSON.parse(oldData);
  this.productList = parseData}
  }

  createForm() {
  this.productForm = new FormGroup({
    prodID: new FormControl(this.productObj.prodID),
    productName: new FormControl(this.productObj.productName, [Validators.required]),
    productDescription: new FormControl(this.productObj.productDescription),
    productQuantity: new FormControl(this.productObj.productQuantity)
  })
}
onSave(){
  const oldData = localStorage.getItem("ProdData")
  if(oldData!=null){
    const parseData = JSON.parse(oldData);
    this.productForm.controls['prodID'].setValue(parseData.length +1);
    this.productList.unshift(this.productForm.value);
  } else {
    this.productList.unshift(this.productForm.value);
    
  }
localStorage.setItem("ProdData", JSON.stringify(this.productList));
this.reset();
}

onEdit(item: ProductModel){
this.productObj = item;
this.createForm()
}

onUpdate(){
  const findRecord = this.productList.find(m=>m.prodID == this.productForm.controls['prodID'].value);
  if(findRecord != undefined){
    findRecord.productName = this.productForm.controls['productName'].value;
    findRecord.productDescription = this.productForm.controls['productDescription'].value;
    findRecord.productQuantity = this.productForm.controls['productQuantity'].value;
  }
  localStorage.setItem("ProdData", JSON.stringify(this.productList));
this.reset();
  }

onDelete(id: number){
 const toDelete = confirm("Are you sure you want to delete");
 if(toDelete){
const index = this.productList.findIndex(m=>m.prodID == id);
this.productList.splice(index,1)
localStorage.setItem("ProdData", JSON.stringify(this.productList));
 }
}
reset(){
this.productObj = new ProductModel();
this.createForm();
}
}
