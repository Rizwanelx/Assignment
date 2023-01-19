import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilogBoxComponent } from './dilog-box.component';

describe('DilogBoxComponent', () => {
  let component: DilogBoxComponent;
  let fixture: ComponentFixture<DilogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DilogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DilogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
