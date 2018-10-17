import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TableSearchComponent } from './table-search.component';

describe('TableSearchComponent', () => {
  let component: TableSearchComponent;
  let fixture: ComponentFixture<TableSearchComponent>;
  let btnReset;
  let btnSave;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSearchComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSearchComponent);
    component = fixture.componentInstance;
    btnReset = fixture.debugElement.query(By.css('.btn-reset'));
    btnSave = fixture.debugElement.query(By.css('.btn-save'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init handlerReset and searchReset functions after click', () => {

    spyOn(component.handlerReset, 'emit');
    btnReset.triggerEventHandler('click', null);

    let spySearchReset = spyOn(component, 'searchReset');

    expect(spySearchReset.call).toBeTruthy();
    expect(component.handlerReset.emit).toHaveBeenCalled();
  });

  it('should init search on click', () => {
    let searchFunc = spyOn(component, 'search');
    btnSave.triggerEventHandler('click', null);
    expect(searchFunc).toHaveBeenCalled();
  });

  it('should init outputSearchFunc with data', () => {
    spyOn(component.searchValue, 'emit');
    component.search('test');
    expect(component.searchValue.emit).toHaveBeenCalledWith('test');
  });





});
