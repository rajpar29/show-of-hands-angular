import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollImageComponent } from './poll-image.component';

describe('PollImageComponent', () => {
  let component: PollImageComponent;
  let fixture: ComponentFixture<PollImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
