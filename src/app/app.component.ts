import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzColDirective} from 'ng-zorro-antd/grid';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
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
    NzInputDirective,
    NgIf
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  specs = [
    {
      "specId": "s20241127162728654NAR",
      "specName": "宽",
      "displayOrder": 1,
      "values": [
        {
          "valueId": "sv20241127162728654abW",
          "value": "500",
          "displayOrder": 0
        },
        {
          "valueId": "sv20241127162728654fS6",
          "value": "600",
          "displayOrder": 1
        }
      ]
    },
    {
      "specId": "s20241127162728631fw4",
      "specName": "长",
      "displayOrder": 0,
      "values": [
        {
          "valueId": "sv20241127162728632YtI",
          "value": "200",
          "displayOrder": 0
        },
        {
          "valueId": "sv20241127162728632H3G",
          "value": "300",
          "displayOrder": 1
        }
      ]
    }
  ];
  skus = {
    "specs": [
      {
        "specId": "s20241127162728631fw4",
        "specName": "长"
      },
      {
        "specId": "s20241127162728654NAR",
        "specName": "宽"
      }
    ],
    "skuSnapshotList": [
      {
        "_type_": "SkuSnapshot",
        "skuId": "sku202411271627287013kb",
        "displayName": "规格 1",
        "values": [
          {
            "valueId": "sv20241127162728632YtI",
            "value": "200"
          },
          {
            "valueId": "sv20241127162728654abW",
            "value": "500"
          }
        ],
        "stock": 0,
        "price": 4.3,
        "weight": 0,
        "state": "published",
        "displayOrder": 0,
        "sellable": true
      },
      {
        "_type_": "SkuSnapshot",
        "skuId": "sku20241127162728733nEM",
        "displayName": "规格 2",
        "values": [
          {
            "valueId": "sv20241127162728632YtI",
            "value": "200"
          },
          {
            "valueId": "sv20241127162728654fS6",
            "value": "600"
          }
        ],
        "stock": 0,
        "price": 4.23,
        "weight": 0,
        "state": "published",
        "displayOrder": 1,
        "sellable": true
      },
      {
        "_type_": "SkuSnapshot",
        "skuId": "sku202411271627287565mY",
        "displayName": "规格 3",
        "values": [
          {
            "valueId": "sv20241127162728632H3G",
            "value": "300"
          },
          {
            "valueId": "sv20241127162728654abW",
            "value": "500"
          }
        ],
        "stock": 0,
        "price": 2.3,
        "weight": 0,
        "state": "published",
        "displayOrder": 2,
        "sellable": false
      },
      {
        "_type_": "SkuSnapshot",
        "skuId": "sku20241127162728770AVk",
        "displayName": "规格 4",
        "values": [
          {
            "valueId": "sv20241127162728632H3G",
            "value": "300"
          },
          {
            "valueId": "sv20241127162728654fS6",
            "value": "600"
          }
        ],
        "stock": 0,
        "price": 4.3,
        "weight": 0,
        "state": "published",
        "displayOrder": 3,
        "sellable": true
      }
    ]
  };
  specColumns: any;
  skuTableData: any;
  editId: string | null = null;


  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      specControls: [],
      name: ['', Validators.required],
      skuControls: []
    });
  }

  ngOnInit(): void {
    this.specColumns = this.skus.specs;
    this.skuTableData = this.skus.skuSnapshotList;
    this.formGroup = this.fb.group({
      // name: ['', Validators.required],
      skuControls: this.fb.array(this.skuTableData.map((sku: any) => this.createSkuGroup(sku))),
      specControls: this.fb.array(this.specs.map((spec: any) => this.createSpecGroup(spec)))
    });
  }

  createSpecGroup(spec: any): FormGroup {
    return this.fb.group({
      specId: [{value: spec.specId, disabled: true}], // Read-only
      specName: [spec.specName, Validators.required],
      displayOrder: [spec.displayOrder],
      values: this.fb.array(spec.values.map((value: any) => this.createValueGroup(value)))
    });
  }

  createValueGroup(value: any): FormGroup {
    return this.fb.group({
      valueId: [{value: value.valueId, disabled: true}], // Read-only
      value: [value.value, Validators.required],
      displayOrder: [value.displayOrder]
    });
  }

  // Add a new value to a spec
  addValue(specIndex: number): void {
    const valuesArray = this.getValuesArray(specIndex);
    valuesArray.push(this.createValueGroup({valueId: '', value: '', displayOrder: 0}));
  }

  // Remove a value from a spec
  removeValue(specIndex: number, valueIndex: number): void {
    const valuesArray = this.getValuesArray(specIndex);
    valuesArray.removeAt(valueIndex);
  }

  // Get the FormArray for values of a specific spec
  getValuesArray(specIndex: number): FormArray {
    const specGroup = (this.formGroup.get('specControls') as FormArray).at(specIndex) as FormGroup;
    return specGroup.get('values') as FormArray;
  }

  get specControls(): FormArray {
    return this.formGroup.get('specControls') as FormArray;
  }

  getSpecFormGroup(index: number): FormGroup {
    return this.specControls.at(index) as FormGroup;
  }

  getSpecValueFormGroup(index: number, valueIndex: number): FormGroup {
    return this.getValuesArray(index).at(valueIndex) as FormGroup;
  }

  get skuControls(): FormArray {
    return this.formGroup.get('skuControls') as FormArray;
  }


  getSkuFormGroup(index: number): FormGroup {
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
      const formData = this.formGroup.getRawValue();
      console.log('Form submitted:', formData);
    } else {
      console.error('Form is invalid');
    }
  }

  // protected readonly FormGroup = FormGroup;

  refreshSpecName(specs: any) {
    // let specs: { specId: any; specName: any; values: any }[] = formData.specControls;
    this.specColumns.forEach((spec: any) => {
      let specId = spec.specId;

      let s = specs.find((s: { specId: any; }) => {
        return s.specId === specId
      });
      if (s) {
        spec.specName = s.specName;
      }
    });
  }

  refreshSpecValues(specs: any) {

// 使用map方法提取每个对象的values属性，组成新数组
    let valuesArray = specs.map((spec: any[]) => spec.values).flat();

    this.skuTableData.forEach(
      (sku: any) => {
        sku.values.forEach(
          (value: any) => {
            let valueId = value.valueId;
            let v = valuesArray.find((value: { valueId: any; }) => {
              return value.valueId === valueId;
            });
            if (v) {
              value.value = v.value;
            }
          }
        )
      }
    )
    this.formGroup.patchValue({"skuTableData": this.skuTableData});
    // this.formGroup = this.fb.group({
    //   skuControls: this.fb.array(this.skuTableData.map((sku: any) => this.createSkuGroup(sku))),
    // });
  }

  refreshSku() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.getRawValue();
      console.log('Form submitted:', formData);
      let specs: { specId: any; specName: any; values: any }[] = formData.specControls;
      this.refreshSpecName(specs);
      this.refreshSpecValues(specs);
    } else {
      console.error('Form is invalid');
    }
  }
}
