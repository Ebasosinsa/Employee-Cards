import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkerCategoryService } from '../../../../../service/WorkerCategory/worker-category.service';
import { workercategory } from '../../../../../models/workercategory';
import { WorkerDepartmentService } from '../../../../../service/WorkerDepartment/worker-department.service';
import { workerdepartment } from '../../../../../models/workerdepartment';
import { WorkerInfoService } from '../../../../../service/WorkerInfo/worker-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { workerinfo } from '../../../../../models/workerinfo';
import { WorkerGtPositionsService } from '../../../../../service/WorkerGtPositions/worker-gt-positions.service';
import { workergtpositions } from '../../../../../models/workergtpositions';

@Component({
  selector: 'app-add-worker-popup',
  templateUrl: './add-worker-popup.component.html',
  styleUrl: './add-worker-popup.component.scss',
})
export class AddWorkerPopupComponent {
  @ViewChild('myInputPosition') myInputPosition: ElementRef;
  /* Публичные свойства */
  formAddWorker = new FormGroup({
    fio_worker: new FormControl('', Validators.required),
    birthday_worker: new FormControl('', Validators.required),
    gender_worker: new FormControl(''),
    departments_worker: new FormControl('', Validators.required),
    categories_worker: new FormControl('', Validators.required),
    date_hiring_worker: new FormControl(''),
    positions_worker: new FormControl('', Validators.required),
    competency_worker: new FormControl(''),
    positions_worker_card: new FormControl(''),
    photo_worker: new FormControl(''),
    note_worker: new FormControl(''),
  });

  categories!: workercategory[];
  departments!: workerdepartment[];
  gtpositions!: workergtpositions[];
  filterPositions!: workergtpositions[];
  filteringWords!: any;

  isModuleShowed: boolean = false;
  menuBtnClick: boolean = false;
  targetElement: any;
  profile: workerinfo;

  constructor(
    private categoryService: WorkerCategoryService,
    private departmentService: WorkerDepartmentService,
    private workergtpositionsService: WorkerGtPositionsService,
    private profileService: WorkerInfoService,
    private renderer: Renderer2,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.profile = {
      id_worker: 0,
      fio_worker: '',
      birthday_worker: '',
      departments_worker: 0,
      positions_worker: 0,
      competency_worker: '',
      categories_worker: 0,
      date_hiring_worker: '',
      date_layoff_worker: '',
      note_worker: '',
      add_date_worker: '',
      photo_worker: '',
    };
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.menuBtnClick) {
        this.isModuleShowed = false;
      }
      this.menuBtnClick = false;
      this.isModuleShowed = false;
    });
  }

  ngOnInit(): void {
    this.getDepartment();
    this.getCategory();
    this.getGtPositions();
  }

  getDepartment() {
    this.departmentService.getDepartment().subscribe((data) => {
      this.departments = data;
      console.log(this.departments);
      console.log(this.departments[1]);
      console.log(data[0].id_departments);
    });
  }

  getCategory() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data;
      console.log(this.categories[1]);
      console.log(data[0].id_categories);
    });
  }

  getGtPositions() {
    this.workergtpositionsService.getGtPositions().subscribe((data) => {
      this.gtpositions = data;
      this.filterPositions = this.gtpositions;
    });
  }

  filteringArr() {
    this.filteringWords = this.formAddWorker.value.positions_worker;
    this.filterPositions = this.gtpositions.filter((n) => {
      //Определяем, совпадает ли, то что мы занесли в инпут
      //с названием профессий внутри массива
      const forbiddenChars = '\\[\\]{}'; // Например, исключить также { и }
      const regexStr = this.filteringWords + `[^${forbiddenChars}]`;
      const regex = new RegExp(regexStr, 'gi');
      return n.name_gt_worker_positions.match(regex);
    });
  }

  addValue(inputValue: string) {
    console.log(inputValue);
    this.formAddWorker.controls['positions_worker'].setValue(inputValue);
    this.menuBtnClick = false;
    this.isModuleShowed = false;
  }

  isOpen: boolean = false;
  isChecked: boolean = false;
  isCheckedValue: number = 0;
  inputFocusActive: boolean = false;

  /*inputFocus(event: any): void {
    console.log(event.target);
    event.target.focus((this.inputFocusActive = true));
  }*/

  ToggleAddWorker() {
    this.isOpen
      ? ((this.isCheckedValue = 0),
        (this.isChecked = false),
        this.formAddWorker.get('gender_worker')?.setValue('false'))
      : ((this.isCheckedValue = 1),
        (this.isChecked = true),
        this.formAddWorker.get('gender_worker')?.setValue('true'));
    console.log(this.formAddWorker.get(['gender_worker'])?.value);
    this.isOpen = !this.isOpen;
  }
  /*(focus)="formColorFocus($event.target)" (blur)="formColorBlurs($event.target)"
  formColorFocus(element: any): void {
    console.log('focus', element);
    this.inputFocusActive = true;
  }
  formColorBlurs(eve: any = this.eve): void {
    console.log('blurs', this.eve);
    this.inputFocusActive = false;
  }*/
  addWorker() {
    if (this.formAddWorker.valid) {
      console.log(this.formAddWorker.value);
    } else {
      console.log('Ne valid');
      console.log(this.categories);
      this.formAddWorker.get('gender_worker')?.setValue('true');
    }
  }
  toggleShowModule(el: any) {
    if ((el.id = 'positions_worker')) {
      this.isModuleShowed = !this.isModuleShowed;
      this.isModuleShowed
        ? this.myInputPosition.nativeElement.focus()
        : this.myInputPosition.nativeElement.blur();
      this.targetElement = el.id;
    } else {
      //ifelse... ко всем элементам формы
    }
  }
  preventCloseOnClick() {
    this.menuBtnClick = true;
    console.log('preventCloseOnClick');
  }
}
