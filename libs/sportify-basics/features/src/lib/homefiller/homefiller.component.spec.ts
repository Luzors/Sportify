import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomefillerComponent } from './homefiller.component';

describe('HomefillerComponent', () => {
  let component: HomefillerComponent;
  let fixture: ComponentFixture<HomefillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomefillerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomefillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
