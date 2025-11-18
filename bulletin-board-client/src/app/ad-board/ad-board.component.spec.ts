import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdBoardComponent } from './ad-board.component';

describe('AdBoardComponent', () => {
  let component: AdBoardComponent;
  let fixture: ComponentFixture<AdBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
