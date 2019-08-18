import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollActionbarComponent } from './poll-actionbar.component';

describe('PollActionbarComponent', () => {
  let component: PollActionbarComponent;
  let fixture: ComponentFixture<PollActionbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollActionbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollActionbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
