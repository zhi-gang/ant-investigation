import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzColDirective} from 'ng-zorro-antd/grid';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {JsonPipe, NgForOf} from '@angular/common';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NzInputDirective} from 'ng-zorro-antd/input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NzFormItemComponent,
    NzColDirective,
    ReactiveFormsModule,
    NzTableComponent,
    JsonPipe,
    NzSwitchComponent,
    NgForOf,
    NzInputDirective
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  skus = {
    specs: [
      { specId: 's20241127162728631fw4', specName: '长' },
      { specId: 's20241127162728654NAR', specName: '宽' }
    ],
    skuSnapshotList: [
      {
        skuId: 'sku202411271627287013kb',
        displayName: '规格 1',
        values: ['200', '500'],
        stock: 0,
        price: 4.3,
        weight: 0,
        sellable: true
      },
      {
        skuId: 'sku20241127162728733nEM',
        displayName: '规格 2',
        values: ['200', '600'],
        stock: 0,
        price: 4.23,
        weight: 0,
        sellable: true
      },
      {
        skuId: 'sku202411271627287565mY',
        displayName: '规格 3',
        values: ['300', '500'],
        stock: 0,
        price: 2.3,
        weight: 0,
        sellable: false
      },
      {
        skuId: 'sku20241127162728770AVk',
        displayName: '规格 4',
        values: ['300', '600'],
        stock: 0,
        price: 4.3,
        weight: 0,
        sellable: true
      }
    ]
  };
  specColumns: any;
  skuTableData: any;
  editId: string | null = null;



  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      skuControls: []
    });
  }

  ngOnInit(): void {
    this.specColumns = this.skus.specs;
    this.skuTableData = this.skus.skuSnapshotList;
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      skuControls: this.fb.array(this.skuTableData.map((sku: any) => this.createSkuGroup(sku)))
    });
    // Initialize form group with form array for the table rows

  }

  get skuControls(): FormArray {
    return this.formGroup.get('skuControls') as FormArray;
  }
  getFormGroup(index: number): FormGroup {
    return this.skuControls.at(index) as FormGroup;
  }

  createSkuGroup(sku: any): FormGroup {
    return this.fb.group({
      skuId: [sku.skuId],
      displayName: [sku.displayName, Validators.required],
      sellable: [sku.sellable],
      values: [sku.values],
      stock: [sku.stock],
      price: [sku.price, Validators.required],
      weight: [sku.weight, Validators.required]
    });
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Form submitted:', this.formGroup.value);
    } else {
      console.error('Form is invalid');
    }
  }

  protected readonly FormGroup = FormGroup;
}
