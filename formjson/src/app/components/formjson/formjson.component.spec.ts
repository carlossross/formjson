import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormjsonComponent } from './formjson.component';

describe('FormjsonComponent', () => {
  let component: FormjsonComponent;
  let fixture: ComponentFixture<FormjsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormjsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormjsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
