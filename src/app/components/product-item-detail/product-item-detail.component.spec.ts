import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ProductItemDetailComponent } from './product-item-detail.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('ProductItemDetailComponent', () => {
  let component: ProductItemDetailComponent;
  let fixture: ComponentFixture<ProductItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ ProductItemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
