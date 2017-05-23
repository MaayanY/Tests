import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessaegeItemComponent } from './messaege-item.component';

describe('MessaegeItemComponent', () => {
  let component: MessaegeItemComponent;
  let fixture: ComponentFixture<MessaegeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessaegeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessaegeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
