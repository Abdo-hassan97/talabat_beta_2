import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from './service/crud.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'talabat';

  meals!: FormArray;

  usrFormGroup: FormGroup;
  Resturant: any;
  ResturantName: any;
  ResturantAddress: any;
  _crudservices: any;

  constructor(crudservices: CrudService, private fb: FormBuilder) {
    this._crudservices = crudservices;
    this.usrFormGroup = this.fb.group({
      ResturantName: [''],
      ResturantAddress: [''],
      meals: new FormArray([]), //fb.array([fb.control('')]),
    });
  }
  createItem(): FormGroup {
    return this.fb.group({
      name: '',
      price: '',
    });
  }
  addItem(): void {
    this.meals = this.usrFormGroup.get('meals') as FormArray;
    this.meals.push(this.createItem());
  }

  get orders() {
    return this.usrFormGroup.get('meals') as FormArray;
  }
  // addMobile(){
  //   this.menus.push(this.fb.control(''));
  // }

  createRecord() {
    debugger;
    console.log(this.usrFormGroup);
    let Record: any = {};
    Record['name'] = this.usrFormGroup.controls['ResturantName'].value;
    Record['adress'] = this.usrFormGroup.controls['ResturantAddress'].value;
    Record['meals'] = this.usrFormGroup.controls['meals'].value;

    this._crudservices.creatNewResturant(Record).then((res: any) => {
      this.ResturantName = '';
      this.ResturantAddress = '';
      console.log(res);
    });
  }
}
