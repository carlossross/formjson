import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formjson',
  templateUrl: './formjson.component.html',
  styleUrls: ['./formjson.component.scss']
})
export class FormjsonComponent implements OnInit {

  minifiedJSON = ''

  inputTypeOptions = [
    'textarea',
    'formGroup', //For deductible
    'number',
    'text',
    'date',
    'checkbox'
  ]

  inputFormat = [
    'text',
    'currency', //For money format
    'flat-percent', // Use always with deductible input
    'boolean', //use it if you need to show 'Yes/No in the table
    'date'
  ]

  myForm: FormGroup = this.fb.group({
    controls: this.fb.array([]),
    showAddButton: [false],
    showTable: [false]
  });

  get controlsArray() {
    return this.myForm.get('controls') as FormArray
  }

  type: FormControl = this.fb.control('', Validators.required);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  addControl(inputType: string) {
    this.controlsArray.push(this.createItem(inputType))
  }

  createItem(inputType: string): FormGroup {

    // Making control input always required
    const validatorsGroup = this.fb.group({
      required: [true]
    });

    const flatOption = this.fb.group({
      label: 'Flat Amount',
      value: 'flat'
    })

    const percentOption = this.fb.group({
      label: 'Percent',
      value: 'percent'
    })

    const radioGroup = this.fb.group({
      name: 'amountType',
      inputType: 'radioButton',
      options: this.fb.array([flatOption, percentOption])
    })

    const inputAmount = this.fb.group({
      name: 'amount',
      inputType: 'number',
      placeHolder: 'Enter Deductible',
      validators: validatorsGroup
    })

    const groupControls = this.fb.array([
      radioGroup,
      inputAmount
    ])


    if (inputType == 'formGroup') {
      //For now formGroup means the deductible, using a radio button for amount or percent and an input for the quantity (always use flat-percent format)
      return this.fb.group({
        name: 'deductible',
        label: 'Deductible',
        inputType: 'formGroup',
        format: 'flat-percent',
        groupControls: groupControls,
        validators: validatorsGroup
      });
    } else {
      return this.fb.group({
        name: '',
        label: '',
        placeHolder: '',
        inputType: inputType,
        format: '',
        validators: validatorsGroup
      });
    }
  }

  deleteControl(i: any) {
    this.controlsArray.removeAt(i);
  }

  minify() {
    this.minifiedJSON = JSON.stringify(this.myForm.value)
  }
}
