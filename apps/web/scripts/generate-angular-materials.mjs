import { BaseGenerator } from './lib/base-generator.mjs';

const gen = new BaseGenerator('angular', 'Angular');

const LEVELS = [
  { levelId: 'beginer', nameId: 'Pemula', nameEn: 'Beginner', descId: 'Dasar Angular: components, templates, directives, services.', descEn: 'Angular basics: components, templates, directives, services.' },
  { levelId: 'intermediate', nameId: 'Menengah', nameEn: 'Intermediate', descId: 'Angular menengah: routing, forms, HTTP, RxJS.', descEn: 'Intermediate Angular: routing, forms, HTTP, RxJS.' },
  { levelId: 'advanced', nameId: 'Lanjutan', nameEn: 'Advanced', descId: 'Angular lanjutan: state, testing, performance, proyek.', descEn: 'Advanced Angular: state, testing, performance, project.' },
];

const MODULES = [
  {
    week: 1, level: 'beginer', topicId: 'components-templates',
    titleId: 'Components & Templates', titleEn: 'Components & Templates',
    programId: 'Halo Angular', programEn: 'Hello Angular',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'typescript',
    code: `// Angular = platform untuk membangun mobile dan desktop web apps
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: '<h1>Halo, {{ name }}!</h1><button (click)="greet()">Klik</button><p *ngIf="showMessage">{{ message }}</p>',
})
export class AppComponent {
  name = 'Tryngo';
  message = 'Tombol diklik!';
  showMessage = false;
  greet() { this.showMessage = true; console.log('Halo dari Angular!'); }
}
console.log('Angular app siap dijalankan');`,
    objectivesId: ['Memahami Angular sebagai platform web app', 'Component: selector, template, class', 'Interpolation: {{ }} untuk display data', 'Event binding: (click)="method()"', 'Structural directive: *ngIf, *ngFor'],
    objectivesEn: ['Understand Angular as web app platform', 'Component: selector, template, class', 'Interpolation: {{ }} for data display', 'Event binding: (click)="method()"', 'Structural directive: *ngIf, *ngFor'],
    explanationId: '### Component\nBuilding block Angular. @Component decorator.\n\n### Template\nHTML + Angular syntax. Interpolation {{ }}, event binding ( ).\n\n### Structural Directives\n*ngIf = conditional. *ngFor = loop.\n\n### Module\n@NgModule mengorganisir components.',
    explanationEn: '### Component\nBuilding block with @Component.\n\n### Template\nHTML + Angular syntax.\n\n### Structural Directives\n*ngIf conditional, *ngFor loop.\n\n### Module\n@NgModule organizes components.',
    experimentsId: ['Ubah property dan lihat template update', 'Tambah method baru dengan event', 'Buat conditional display', 'Render list dengan *ngFor'],
    experimentsEn: ['Change property and observe template update', 'Add new method with event', 'Create conditional display', 'Render list with *ngFor'],
    challengeId: 'Buat counter app: increment, decrement, reset. Tampilkan pesan berbeda berdasarkan nilai.',
    challengeEn: 'Build a counter app: increment, decrement, reset. Show different messages based on value.',
    summaryId: 'Minggu 1 dari 14: **Components & Templates** (Level: Pemula). Minggu depan: **Directives & Pipes**.',
    summaryEn: 'Week 1 of 14: **Components & Templates** (Level: Beginner). Next week: **Directives & Pipes**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'directives-pipes',
    titleId: 'Directives & Pipes', titleEn: 'Directives & Pipes',
    programId: 'List & Format', programEn: 'List & Format',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'typescript',
    code: `// Directives = mengubah appearance/behavior DOM elements
import { Component } from '@angular/core';
@Component({
  selector: 'app-product-list',
  template: '<h2>Daftar Produk</h2><ul><li *ngFor="let p of products" [ngClass]="{\'in-stock\': p.available}">{{ p.name | uppercase }} — {{ p.price | currency:\'IDR\':\'symbol\':\'1.0-0\' }}</li></ul><p>Tanggal: {{ today | date:\'fullDate\' }}</p>',
})
export class ProductListComponent {
  today = new Date();
  products = [
    { name: 'Laptop', price: 15000000, available: true },
    { name: 'Mouse', price: 250000, available: false },
  ];
}
console.log('Directives & Pipes siap digunakan');`,
    objectivesId: ['Attribute directives: ngClass, ngStyle', 'Structural directives: ngIf, ngFor', 'Built-in pipes: date, currency, uppercase', 'Custom pipe creation', 'Pipe parameters: date:"fullDate"'],
    objectivesEn: ['Attribute directives: ngClass, ngStyle', 'Structural directives: ngIf, ngFor', 'Built-in pipes: date, currency, uppercase', 'Custom pipe creation', 'Pipe parameters: date:"fullDate"'],
    explanationId: '### Attribute Directives\nngClass = dynamic classes. ngStyle = dynamic styles.\n\n### Structural Directives\n*ngIf = conditional render. *ngFor = loop render.\n\n### Pipes\nTransform data: date, currency, uppercase, lowercase, json.',
    explanationEn: '### Attribute Directives\nngClass, ngStyle for dynamic styling.\n\n### Structural Directives\n*ngIf, *ngFor for DOM manipulation.\n\n### Pipes\nTransform data for display.',
    experimentsId: ['Buat custom pipe', 'Implementasikan ngClass conditional', 'Gunakan multiple pipes', 'Buat ngFor dengan trackBy'],
    experimentsEn: ['Create custom pipe', 'Implement ngClass conditional', 'Use multiple pipes', 'Create ngFor with trackBy'],
    challengeId: 'Buat product list dengan filter, sorting, dan custom pipe untuk format harga.',
    challengeEn: 'Build a product list with filter, sorting, and custom pipe for price formatting.',
    summaryId: 'Minggu 2 dari 14: **Directives & Pipes** (Level: Pemula). Minggu depan: **Services & DI**.',
    summaryEn: 'Week 2 of 14: **Directives & Pipes** (Level: Beginner). Next week: **Services & DI**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'services-di',
    titleId: 'Services & Dependency Injection', titleEn: 'Services & Dependency Injection',
    programId: 'Data Service', programEn: 'Data Service',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'typescript',
    code: `// Services = class untuk business logic, data access
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = [
    { id: 1, name: 'Laptop', price: 15000000 },
    { id: 2, name: 'Mouse', price: 250000 },
  ];
  getProducts() { return this.products; }
  getProduct(id: number) { return this.products.find(p => p.id === id); }
  addProduct(product: { name: string; price: number }) { this.products.push({ ...product, id: this.products.length + 1 }); }
}
console.log('Services & DI siap digunakan');`,
    objectivesId: ['@Injectable decorator untuk service', 'providedIn: "root" untuk singleton', 'Constructor injection di component', 'Service untuk business logic', 'Separation of concerns'],
    objectivesEn: ['@Injectable decorator for service', 'providedIn: "root" for singleton', 'Constructor injection in component', 'Service for business logic', 'Separation of concerns'],
    explanationId: '### @Injectable\nDecorator untuk mark class sebagai service.\n\n### DI\nAngular inject service via constructor.\n\n### providedIn: "root"\nSingleton service untuk seluruh app.',
    explanationEn: '### @Injectable\nMarks class as service.\n\n### DI\nAngular injects via constructor.\n\n### providedIn: "root"\nSingleton for entire app.',
    experimentsId: ['Buat service baru', 'Inject service ke component', 'Implementasikan CRUD service', 'Buat service dengan state'],
    experimentsEn: ['Create new service', 'Inject service to component', 'Implement CRUD service', 'Create service with state'],
    challengeId: 'Buat product service dengan CRUD operations. Inject ke component.',
    challengeEn: 'Build a product service with CRUD operations. Inject into component.',
    summaryId: 'Minggu 3 dari 14: **Services & DI** (Level: Pemula). Minggu depan: **Component Communication**.',
    summaryEn: 'Week 3 of 14: **Services & DI** (Level: Beginner). Next week: **Component Communication**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'component-communication',
    titleId: 'Component Communication', titleEn: 'Component Communication',
    programId: 'Parent & Child', programEn: 'Parent & Child',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'typescript',
    code: `// Component Communication: parent-child via @Input/@Output
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({ selector: 'app-product-card', template: '<div><h3>{{ name }}</h3><p>Rp {{ price | number }}</p><button (click)="onAddToCart()">Tambah</button></div>' })
export class ProductCardComponent {
  @Input() name = '';
  @Input() price = 0;
  @Output() addToCart = new EventEmitter<string>();
  onAddToCart() { this.addToCart.emit(this.name); }
}
@Component({ selector: 'app-product-list', template: '<h2>Katalog</h2><app-product-card *ngFor="let p of products" [name]="p.name" [price]="p.price" (addToCart)="handleAddToCart($event)"></app-product-card><p>Keranjang: {{ cart.length }}</p>' })
export class ProductListComponent {
  cart: string[] = [];
  products = [{ name: 'Laptop', price: 15000000 }, { name: 'Mouse', price: 250000 }];
  handleAddToCart(name: string) { this.cart.push(name); }
}
console.log('Component Communication siap digunakan');`,
    objectivesId: ['@Input: receive data dari parent', '@Output: emit event ke parent', 'EventEmitter untuk custom events', 'ViewChild untuk akses child component', 'Service untuk sibling communication'],
    objectivesEn: ['@Input: receive data from parent', '@Output: emit event to parent', 'EventEmitter for custom events', 'ViewChild for child access', 'Service for sibling communication'],
    explanationId: '### @Input\nParent ke child: [property]="value".\n\n### @Output\nChild ke parent: (event)="handler($event)".\n\n### EventEmitter\n@Output() name = new EventEmitter<Type>().',
    explanationEn: '### @Input\nParent to child data flow.\n\n### @Output\nChild to parent event flow.\n\n### EventEmitter\nCustom event emission.',
    experimentsId: ['Buat child component dengan @Input', 'Implementasikan @Output event', 'Gunakan ViewChild', 'Buat shared service untuk siblings'],
    experimentsEn: ['Create child component with @Input', 'Implement @Output event', 'Use ViewChild', 'Create shared service for siblings'],
    challengeId: 'Buat shopping cart: ProductCard (child), ProductList (parent), CartService (shared).',
    challengeEn: 'Build a shopping cart: ProductCard (child), ProductList (parent), CartService (shared).',
    summaryId: 'Minggu 4 dari 14: **Component Communication** (Level: Pemula). Minggu depan: **Template-driven Forms**.',
    summaryEn: 'Week 4 of 14: **Component Communication** (Level: Beginner). Next week: **Template-driven Forms**.',
  },
  {
    week: 5, level: 'beginer', topicId: 'template-forms',
    titleId: 'Template-driven Forms', titleEn: 'Template-driven Forms',
    programId: 'Form Validasi', programEn: 'Form Validation',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'typescript',
    code: `// Template-driven Forms: form logic di template
import { Component } from '@angular/core';
@Component({
  selector: 'app-register-form',
  template: '<form #form="ngForm" (ngSubmit)="onSubmit(form)"><input name="name" [(ngModel)]="model.name" #name="ngModel" required minlength="3" placeholder="Nama"><div *ngIf="name.invalid && name.touched"><span *ngIf="name.errors?.[\'required\']">Wajib diisi</span></div><input name="email" [(ngModel)]="model.email" #email="ngModel" required email placeholder="Email"><button type="submit" [disabled]="form.invalid">Daftar</button></form>',
})
export class RegisterFormComponent {
  model = { name: '', email: '' };
  onSubmit(form: any) { if (form.valid) console.log('Data:', this.model); }
}
console.log('Template-driven Forms siap digunakan');`,
    objectivesId: ['NgModel untuk two-way binding', 'Form validation: required, minlength, email', 'ngForm untuk form state', 'Error display dengan *ngIf', 'ngSubmit untuk form submission'],
    objectivesEn: ['NgModel for two-way binding', 'Form validation: required, minlength, email', 'ngForm for form state', 'Error display with *ngIf', 'ngSubmit for form submission'],
    explanationId: '### NgModel\nTwo-way binding: [(ngModel)]="property".\n\n### Validation\nrequired, minlength, maxlength, pattern, email.\n\n### Form State\nngForm: valid, invalid, touched, dirty.',
    explanationEn: '### NgModel\nTwo-way binding.\n\n### Validation\nBuilt-in validators.\n\n### Form State\nvalid, invalid, touched, dirty.',
    experimentsId: ['Tambah validasi custom', 'Buat multi-step form', 'Implementasikan async validation', 'Buat reusable form component'],
    experimentsEn: ['Add custom validation', 'Create multi-step form', 'Implement async validation', 'Create reusable form component'],
    challengeId: 'Buat registration form dengan validasi: nama, email, password, konfirmasi password.',
    challengeEn: 'Build a registration form with validation: name, email, password, confirm password.',
    summaryId: 'Minggu 5 dari 14: **Template-driven Forms** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Routing**.',
    summaryEn: 'Week 5 of 14: **Template-driven Forms** (Level: Beginner). Beginner phase complete! Next week: **Routing**.',
  },

  {
    week: 6, level: 'intermediate', topicId: 'routing',
    titleId: 'Angular Router', titleEn: 'Angular Router',
    programId: 'Multi-Halaman', programEn: 'Multi-Page App',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'typescript',
    code: "// Angular Router = powerful routing untuk SPA\n// const routes: Routes = [\n//   { path: '', component: HomeComponent },\n//   { path: 'products/:id', component: ProductDetailComponent },\n// ];\nconsole.log('Angular Router siap digunakan');",
    objectivesId: ['Routes configuration', 'RouterLink dan RouterOutlet', 'Route parameters', 'Navigation guards: CanActivate', 'Lazy loading'],
    objectivesEn: ['Routes configuration', 'RouterLink and RouterOutlet', 'Route parameters', 'Navigation guards: CanActivate', 'Lazy loading'],
    explanationId: '### Routes\nArray of route objects.\n\n### RouterLink\nNavigation directive.\n\n### Guards\nCanActivate protects routes.',
    explanationEn: '### Routes\nArray of route objects.\n\n### RouterLink\nNavigation directive.\n\n### Guards\nCanActivate protects routes.',
    experimentsId: ['Buat nested routes', 'Implementasikan route guard', 'Tambah breadcrumb', 'Buat 404 page'],
    experimentsEn: ['Create nested routes', 'Implement route guard', 'Add breadcrumb', 'Create 404 page'],
    challengeId: 'Buat blog app dengan routing: Home, Posts, Post Detail, Admin (protected).',
    challengeEn: 'Build a blog app with routing: Home, Posts, Post Detail, Admin (protected).',
    summaryId: 'Minggu 6 dari 14: **Angular Router** (Level: Menengah). Minggu depan: **Reactive Forms**.',
    summaryEn: 'Week 6 of 14: **Angular Router** (Level: Intermediate). Next week: **Reactive Forms**.',
  },
  {
    week: 7, level: 'intermediate', topicId: 'reactive-forms',
    titleId: 'Reactive Forms', titleEn: 'Reactive Forms',
    programId: 'Form Dinamis', programEn: 'Dynamic Forms',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'typescript',
    code: "// Reactive Forms: form logic di component class\nimport { Component } from '@angular/core';\nimport { FormBuilder, FormGroup, Validators } from '@angular/forms';\n@Component({ selector: 'app-form', template: '<form [formGroup]=\"form\"><input formControlName=\"name\"></form>' })\nexport class DynamicFormComponent {\n  form: FormGroup;\n  constructor(private fb: FormBuilder) { this.form = this.fb.group({ name: ['', Validators.required] }); }\n}\nconsole.log('Reactive Forms siap digunakan');",
    objectivesId: ['FormControl, FormGroup, FormArray', 'FormBuilder untuk build form', 'Validators: required, minLength, email', 'Dynamic form: add/remove controls', 'Custom validators'],
    objectivesEn: ['FormControl, FormGroup, FormArray', 'FormBuilder for form building', 'Validators: required, minLength, email', 'Dynamic forms: add/remove controls', 'Custom validators'],
    explanationId: '### FormControl\nSingle form control.\n\n### FormGroup\nGroup of FormControls.\n\n### FormBuilder\nService untuk build form.',
    explanationEn: '### FormControl\nSingle control.\n\n### FormGroup\nGroup of controls.\n\n### FormBuilder\nService for building forms.',
    experimentsId: ['Buat custom validator', 'Implementasikan async validator', 'Buat multi-step reactive form', 'Tambah cross-field validation'],
    experimentsEn: ['Create custom validator', 'Implement async validator', 'Create multi-step reactive form', 'Add cross-field validation'],
    challengeId: 'Buat dynamic survey form: add/remove questions, validation, submit to API.',
    challengeEn: 'Build a dynamic survey form: add/remove questions, validation, submit to API.',
    summaryId: 'Minggu 7 dari 14: **Reactive Forms** (Level: Menengah). Minggu depan: **HTTP Client**.',
    summaryEn: 'Week 7 of 14: **Reactive Forms** (Level: Intermediate). Next week: **HTTP Client**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'http-client',
    titleId: 'HTTP Client & APIs', titleEn: 'HTTP Client & APIs',
    programId: 'REST API', programEn: 'REST API',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'typescript',
    code: "// HttpClient = Angular service untuk HTTP requests\nimport { Injectable } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\nimport { Observable } from 'rxjs';\nexport interface Product { id: number; name: string; price: number; }\n@Injectable({ providedIn: 'root' })\nexport class ProductApiService {\n  private apiUrl = 'https://api.example.com/products';\n  constructor(private http: HttpClient) {}\n  getProducts(): Observable<Product[]> { return this.http.get<Product[]>(this.apiUrl); }\n  getProduct(id: number): Observable<Product> { return this.http.get<Product>(this.apiUrl + '/' + id); }\n}\nconsole.log('HTTP Client siap digunakan');",
    objectivesId: ['HttpClient module setup', 'GET, POST, PUT, DELETE requests', 'Type-safe responses dengan interface', 'HttpHeaders dan HttpParams', 'Error handling dengan catchError'],
    objectivesEn: ['HttpClient module setup', 'GET, POST, PUT, DELETE requests', 'Type-safe responses with interface', 'HttpHeaders and HttpParams', 'Error handling with catchError'],
    explanationId: '### HttpClient\nInjectable service untuk HTTP.\n\n### Methods\nget(), post(), put(), delete().\n\n### Type-safe\nhttp.get<Type>(url) = typed response.',
    explanationEn: '### HttpClient\nInjectable HTTP service.\n\n### Methods\nget, post, put, delete.\n\n### Type-safe\nTyped responses with generics.',
    experimentsId: ['Buat API service dengan CRUD', 'Implementasikan error handling', 'Tambah request interceptor', 'Buat search dengan debounce'],
    experimentsEn: ['Create API service with CRUD', 'Implement error handling', 'Add request interceptor', 'Create search with debounce'],
    challengeId: 'Buat product CRUD app: fetch from API, display list, add/edit/delete products.',
    challengeEn: 'Build a product CRUD app: fetch from API, display list, add/edit/delete products.',
    summaryId: 'Minggu 8 dari 14: **HTTP Client & APIs** (Level: Menengah). Minggu depan: **RxJS Fundamentals**.',
    summaryEn: 'Week 8 of 14: **HTTP Client & APIs** (Level: Intermediate). Next week: **RxJS Fundamentals**.',
  },

  {
    week: 9, level: 'intermediate', topicId: 'rxjs',
    titleId: 'RxJS Fundamentals', titleEn: 'RxJS Fundamentals',
    programId: 'Reactive Programming', programEn: 'Reactive Programming',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'typescript',
    code: "// RxJS = Reactive Extensions untuk JavaScript\nimport { Observable, Subject, BehaviorSubject, of } from 'rxjs';\nimport { map, filter, switchMap, debounceTime } from 'rxjs/operators';\nconst numbers$ = of(1, 2, 3, 4, 5);\nconst doubled$ = numbers$.pipe(map(n => n * 2));\nconst searchSubject = new Subject<string>();\nsearchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe(q => console.log(q));\nconst userSubject = new BehaviorSubject<{name: string} | null>(null);\nconsole.log('RxJS Fundamentals siap digunakan');",
    objectivesId: ['Observable: stream of data', 'Operators: map, filter, switchMap', 'Subject dan BehaviorSubject', 'Subscription dan unsubscribe', 'Error handling dengan catchError'],
    objectivesEn: ['Observable: stream of data', 'Operators: map, filter, switchMap', 'Subject and BehaviorSubject', 'Subscription and unsubscribe', 'Error handling with catchError'],
    explanationId: '### Observable\nLazy stream of data.\n\n### Operators\nTransform stream: map, filter, switchMap.\n\n### Subject\nMulti-cast observable.',
    explanationEn: '### Observable\nLazy data stream.\n\n### Operators\nTransform streams.\n\n### Subject\nMulti-cast observable.',
    experimentsId: ['Buat observable dari array', 'Implementasikan search dengan debounce', 'Gunakan BehaviorSubject untuk state', 'Buat custom operator'],
    experimentsEn: ['Create observable from array', 'Implement search with debounce', 'Use BehaviorSubject for state', 'Create custom operator'],
    challengeId: 'Buat search component dengan RxJS: debounce, distinctUntilChanged, switchMap ke API.',
    challengeEn: 'Build a search component with RxJS: debounce, distinctUntilChanged, switchMap to API.',
    summaryId: 'Minggu 9 dari 14: **RxJS Fundamentals** (Level: Menengah). Minggu depan: **State Management**.',
    summaryEn: 'Week 9 of 14: **RxJS Fundamentals** (Level: Intermediate). Next week: **State Management**.',
  },
  {
    week: 10, level: 'intermediate', topicId: 'state-management',
    titleId: 'State Management', titleEn: 'State Management',
    programId: 'NgRx & Signals', programEn: 'NgRx & Signals',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'typescript',
    code: "// State Management: NgRx & Angular Signals\nimport { signal, computed, effect } from '@angular/core';\nconst count = signal(0);\nconst doubled = computed(() => count() * 2);\neffect(() => { console.log('Count:', count()); });\n// count.set(5);\nconsole.log('State Management siap digunakan');",
    objectivesId: ['NgRx: Store, Actions, Reducers', 'Selectors untuk derived state', 'Effects untuk side effects', 'Angular Signals: signal, computed, effect', 'Kapan pakai NgRx vs Signals'],
    objectivesEn: ['NgRx: Store, Actions, Reducers', 'Selectors for derived state', 'Effects for side effects', 'Angular Signals: signal, computed, effect', 'When to use NgRx vs Signals'],
    explanationId: '### NgRx\nRedux pattern: unidirectional data flow.\n\n### Signals\nReactive primitives: signal(), computed(), effect().',
    explanationEn: '### NgRx\nRedux pattern.\n\n### Signals\nReactive primitives.',
    experimentsId: ['Buat NgRx store dengan CRUD', 'Implementasikan Signal-based state', 'Buat custom selector', 'Tambah effect untuk API call'],
    experimentsEn: ['Create NgRx store with CRUD', 'Implement Signal-based state', 'Create custom selector', 'Add effect for API call'],
    challengeId: 'Buat shopping cart dengan Signals: add/remove items, total price, persist state.',
    challengeEn: 'Build a shopping cart with Signals: add/remove items, total price, persist state.',
    summaryId: 'Minggu 10 dari 14: **State Management** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Testing**.',
    summaryEn: 'Week 10 of 14: **State Management** (Level: Intermediate). Intermediate phase complete! Next week: **Testing**.',
  },

  {
    week: 11, level: 'advanced', topicId: 'testing-angular',
    titleId: 'Testing Angular', titleEn: 'Testing Angular',
    programId: 'Unit & Integration', programEn: 'Unit & Integration',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'typescript',
    code: "// Testing Angular: Jasmine + Karma\n// describe('AppComponent', () => {\n//   let component: AppComponent;\n//   let fixture: ComponentFixture<AppComponent>;\n//   beforeEach(async () => {\n//     await TestBed.configureTestingModule({ declarations: [AppComponent] }).compileComponents();\n//     fixture = TestBed.createComponent(AppComponent);\n//     component = fixture.componentInstance;\n//   });\n//   it('should create', () => { expect(component).toBeTruthy(); });\n// });\nconsole.log('Testing Angular siap digunakan');",
    objectivesId: ['Jasmine + Karma setup', 'TestBed untuk testing environment', 'ComponentFixture untuk component testing', 'Service testing dengan TestBed.inject', 'Async testing: fakeAsync, waitForAsync'],
    objectivesEn: ['Jasmine + Karma setup', 'TestBed for testing environment', 'ComponentFixture for component testing', 'Service testing with TestBed.inject', 'Async testing: fakeAsync, waitForAsync'],
    explanationId: '### TestBed\nConfigure testing module.\n\n### ComponentFixture\nWrapper untuk component + DOM.\n\n### Async Testing\nfakeAsync + tick = simulate async.',
    explanationEn: '### TestBed\nConfigure testing module.\n\n### ComponentFixture\nWrapper for component + DOM.\n\n### Async Testing\nfakeAsync, waitForAsync.',
    experimentsId: ['Test component dengan @Input/@Output', 'Test service dengan HTTP mocking', 'Test dengan reactive forms', 'Test route navigation'],
    experimentsEn: ['Test component with @Input/@Output', 'Test service with HTTP mocking', 'Test with reactive forms', 'Test route navigation'],
    challengeId: 'Buat test suite untuk product component: display, add to cart, remove from cart.',
    challengeEn: 'Build a test suite for product component: display, add to cart, remove from cart.',
    summaryId: 'Minggu 11 dari 14: **Testing Angular** (Level: Lanjutan). Minggu depan: **Performance**.',
    summaryEn: 'Week 11 of 14: **Testing Angular** (Level: Advanced). Next week: **Performance**.',
  },
  {
    week: 12, level: 'advanced', topicId: 'performance',
    titleId: 'Performance Optimization', titleEn: 'Performance Optimization',
    programId: 'Optimasi & SSR', programEn: 'Optimization & SSR',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'typescript',
    code: "// Performance: OnPush, trackBy, Lazy Loading, SSR\n// @Component({ changeDetection: ChangeDetectionStrategy.OnPush })\n// <li *ngFor='let item of items; trackBy: trackByFn'></li>\n// trackByFn(index: number, item: any) { return item.id; }\n// { path: 'admin', loadChildren: () => import('./admin.module').then(m => m.AdminModule) }\nconsole.log('Performance Optimization siap digunakan');",
    objectivesId: ['OnPush change detection strategy', 'trackBy untuk ngFor optimization', 'Lazy loading modules', 'Preloading strategies', 'Angular Universal SSR'],
    objectivesEn: ['OnPush change detection strategy', 'trackBy for ngFor optimization', 'Lazy loading modules', 'Preloading strategies', 'Angular Universal SSR'],
    explanationId: '### OnPush\nHanya check saat @Input berubah.\n\n### trackBy\nIdentifikasi item untuk hindari re-render semua.\n\n### Lazy Loading\nLoad module saat dibutuhkan.',
    explanationEn: '### OnPush\nOnly checks on @Input change.\n\n### trackBy\nIdentify items to avoid full re-render.\n\n### Lazy Loading\nLoad modules on demand.',
    experimentsId: ['Implementasikan OnPush', 'Tambah trackBy ke ngFor', 'Setup lazy loading route', 'Measure bundle size'],
    experimentsEn: ['Implement OnPush', 'Add trackBy to ngFor', 'Setup lazy loading route', 'Measure bundle size'],
    challengeId: 'Optimasi Angular app: OnPush, trackBy, lazy loading, measure performance.',
    challengeEn: 'Optimize Angular app: OnPush, trackBy, lazy loading, measure performance.',
    summaryId: 'Minggu 12 dari 14: **Performance** (Level: Lanjutan). Minggu depan: **Advanced Patterns**.',
    summaryEn: 'Week 12 of 14: **Performance** (Level: Advanced). Next week: **Advanced Patterns**.',
  },
  {
    week: 13, level: 'advanced', topicId: 'advanced-patterns',
    titleId: 'Advanced Patterns', titleEn: 'Advanced Patterns',
    programId: 'Architecture', programEn: 'Architecture',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'typescript',
    code: "// Advanced Patterns: Smart/Dumb components, Feature Modules\n// Smart: handle logic, data, state\n// Dumb: only display, receive via @Input, emit via @Output\n// @Component({ changeDetection: ChangeDetectionStrategy.OnPush })\nconsole.log('Advanced Patterns siap digunakan');",
    objectivesId: ['Smart/Dumb component pattern', 'Feature module architecture', 'Shared module untuk reusable components', 'Core module untuk singleton services', 'Lazy-loaded feature modules'],
    objectivesEn: ['Smart/Dumb component pattern', 'Feature module architecture', 'Shared module for reusable components', 'Core module for singleton services', 'Lazy-loaded feature modules'],
    explanationId: '### Smart/Dumb\nSmart = logic & state. Dumb = display only.\n\n### Feature Module\nSetiap fitur = module sendiri.\n\n### Shared Module\nComponents/directives/pipes yang dipakai banyak module.',
    explanationEn: '### Smart/Dumb\nSmart = logic, Dumb = display.\n\n### Feature Module\nEach feature = own module.\n\n### Shared Module\nReusable components.',
    experimentsId: ['Refactor ke smart/dumb pattern', 'Buat feature module', 'Setup shared module', 'Implementasikan lazy loading'],
    experimentsEn: ['Refactor to smart/dumb pattern', 'Create feature module', 'Setup shared module', 'Implement lazy loading'],
    challengeId: 'Refactor Angular app ke feature modules: products, cart, auth.',
    challengeEn: 'Refactor Angular app to feature modules: products, cart, auth.',
    summaryId: 'Minggu 13 dari 14: **Advanced Patterns** (Level: Lanjutan). Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 13 of 14: **Advanced Patterns** (Level: Advanced). Next week: **Capstone Project**!',
  },
  {
    week: 14, level: 'advanced', topicId: 'capstone',
    titleId: 'Capstone: Enterprise App', titleEn: 'Capstone: Enterprise App',
    programId: 'ERP System', programEn: 'ERP System',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'typescript',
    code: "// Capstone: Enterprise Resource Planning (ERP) System\n// Architecture: Angular + NgRx + Angular Material + JWT Auth\n// Features: Auth, Dashboard, Product CRUD, Order management, Admin panel\nconsole.log('Enterprise ERP System siap digunakan!');",
    objectivesId: ['Menggabungkan semua konsep Angular', 'Enterprise architecture: feature modules', 'NgRx state management', 'Role-based access control', 'Production deployment'],
    objectivesEn: ['Combine all Angular concepts', 'Enterprise architecture: feature modules', 'NgRx state management', 'Role-based access control', 'Production deployment'],
    explanationId: '### Architecture\nFeature modules + NgRx + Angular Material.\n\n### State Management\nNgRx: unidirectional data flow.\n\n### Auth\nJWT + role-based access + route guards.',
    explanationEn: '### Architecture\nFeature modules + NgRx + Angular Material.\n\n### State Management\nNgRx for unidirectional flow.\n\n### Auth\nJWT + role-based access.',
    experimentsId: ['Tambah real-time notifications', 'Implementasikan reports', 'Buat comprehensive test suite', 'Deploy ke production'],
    experimentsEn: ['Add real-time notifications', 'Implement reports', 'Build comprehensive test suite', 'Deploy to production'],
    challengeId: 'Buat ERP system lengkap: auth, dashboard, product management, orders, admin panel.',
    challengeEn: 'Build a complete ERP system: auth, dashboard, product management, orders, admin panel.',
    summaryId: 'Minggu 14 dari 14: **Capstone: Enterprise App** (Level: Lanjutan). Selesai! 🎉',
    summaryEn: 'Week 14 of 14: **Capstone: Enterprise App** (Level: Advanced). Complete! 🎉',
  },
];

for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({ week: m.week, topicId: m.topicId, titleId: m.titleId, titleEn: m.titleEn }));
}

gen.writeFiles(MODULES, LEVELS);
