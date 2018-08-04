import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'myshop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  modalTitle = 'Add Products';
  cells = Array.apply(null, {length: 10}).map(Number.call, Number);
  @ViewChild('ctgInputBox') ctgInputBox:ElementRef;
  
  constructor() {   
   }

  ngOnInit() {
  }

  onModalOpened() {
    this.ctgInputBox.nativeElement.focus();    
  }

}
