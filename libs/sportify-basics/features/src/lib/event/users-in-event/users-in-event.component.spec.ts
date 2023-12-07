import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersInEventComponent } from './users-in-event.component';

describe('UsersInEventComponent', () => {
  let component: UsersInEventComponent;
  let fixture: ComponentFixture<UsersInEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersInEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersInEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
