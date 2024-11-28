import {Component, OnInit} from '@angular/core';
import {NzCellFixedDirective, NzTableComponent} from 'ng-zorro-antd/table';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {JsonPipe, NgForOf, NgIf,} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';

@Component({
  selector: 'app-root',
  imports: [NzTableComponent, NzSwitchComponent, FormsModule, NzFormModule, NzInputDirective, NzCellFixedDirective, NgForOf, ReactiveFormsModule, NgIf, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
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
          "200",
          "500"
        ],
        "stock": 0,
        "price": 4.3000,
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
          "200",
          "600"
        ],
        "stock": 0,
        "price": 4.2300,
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
          "300",
          "500"
        ],
        "stock": 0,
        "price": 2.3000,
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
          "300",
          "600"
        ],
        "stock": 0,
        "price": 4.3000,
        "weight": 0,
        "state": "published",
        "displayOrder": 3,
        "sellable": true
      }
    ]
  }
  skuSnapshots: any;
  specColumns: any;
  skuTableData: any;
  editId: string | null = '';

  ngOnInit(): void {

    this.skuSnapshots = this.skus;
    this.specColumns = this.skuSnapshots.specs;
    this.skuTableData = this.skuSnapshots.skuSnapshotList;
    // 初始化表格数据
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  protected readonly FormControl = FormControl;
}
