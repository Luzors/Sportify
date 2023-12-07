import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFromAssociationListComponent } from './admin-from-association-list.component';

describe('AdminFromAssociationListComponent', () => {
  let component: AdminFromAssociationListComponent;
  let fixture: ComponentFixture<AdminFromAssociationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFromAssociationListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFromAssociationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
