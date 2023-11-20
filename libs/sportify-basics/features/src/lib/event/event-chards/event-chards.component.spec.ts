import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventChardsComponent } from './event-chards.component';

describe('EventChardsComponent', () => {
  let component: EventChardsComponent;
  let fixture: ComponentFixture<EventChardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventChardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventChardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
