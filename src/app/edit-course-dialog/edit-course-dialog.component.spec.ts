import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseDialogComponent } from './edit-course-dialog.component';

describe('EditCourseDialogComponent', () => {
  let component: EditCourseDialogComponent;
  let fixture: ComponentFixture<EditCourseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCourseDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
