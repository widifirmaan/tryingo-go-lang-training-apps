import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/angular', import.meta.url).pathname;
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

const PKG_NODE = (name, dev) => `{
  "name": "${name}",
  "version": "1.0.0",
  "private": true,
  "scripts": { "dev": "${dev}" }
}
`;

const DEV_SERVE = 'npx serve';

const LESSONS = [
  {
    num: 1, topicId: 'pengenalan-angular',
    titleId: 'Pengenalan Angular & Setup', titleEn: 'Introduction to Angular & Setup',
    codeFile: 'src/main.ts',
    files: {
      'src/main.ts': 'import { platformBrowserDynamic } from \'@angular/platform-browser-dynamic\';\nimport { AppModule } from \'./app/app.module\';\n\nplatformBrowserDynamic().bootstrapModule(AppModule)\n  .catch(err => console.error(err));\n',
      'src/app/app.module.ts': 'import { NgModule } from \'@angular/core\';\nimport { BrowserModule } from \'@angular/platform-browser\';\nimport { AppComponent } from \'./app.component\';\n\n@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule],\n  providers: [],\n  bootstrap: [AppComponent],\n})\nexport class AppModule {}\n',
      'src/app/app.component.ts': 'import { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'app-root\',\n  template: \'<h1>Hello, Angular!</h1>\',\n})\nexport class AppComponent {}\n',
      'src/index.html': '<!DOCTYPE html>\n<html>\n<head><title>Angular App</title></head>\n<body>\n  <app-root></app-root>\n</body>\n</html>\n',
      'composer.json': PKG_NODE('angular-lesson-1', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-1', DEV_SERVE),
      'README.md': '# Angular Lesson 1 - Introduction\n\nJalankan: npm install && npm run dev\nBuka: http://localhost:3000\n',
    },
    objId: ['Memahami posisi Angular: framework TypeScript untuk web', 'Mengenal struktur proyek Angular (src/app/, src/index.html)', 'Memahami modul AppModule dan komponen AppComponent', 'Menjalankan Angular app via serve dan melihat output di browser'],
    objEn: ['Understand Angular: TypeScript framework for web', 'Learn Angular project structure (src/app/, src/index.html)', 'Understand AppModule and AppComponent', 'Run Angular app via serve and view output in browser'],
    expId: `## Struktur Proyek Angular\nsrc/app/ = kode aplikasi (components, services, modules). src/index.html = HTML template utama. src/main.ts = titik masuk aplikasi.\n## Modul & Komponen\n@NgModule({ declarations, imports, providers, bootstrap }) — mendefinisikan modul Angular. @Component({ selector, template }) — mendefinisikan komponen.\n## Menjalankan Angular\nnpm install && npm run dev — instal dependency dan jalankan development server. Buka http://localhost:3000.`,
    expEn: `## Angular Project Structure\nsrc/app/ = application code (components, services, modules). src/index.html = main HTML template. src/main.ts = application entry point.\n## Module & Component\n@NgModule({ declarations, imports, providers, bootstrap }) — defines Angular module. @Component({ selector, template }) — defines component.\n## Running Angular\nnpm install && npm run dev — install dependencies and start dev server. Open http://localhost:3000.`,
    chId: 'Eksplorasi: (1) ubah "Hello, Angular!" menjadi "Selamat datang di Angular!" di template AppComponent, (2) tambah h2 dengan nama framework Anda, (3) coba akses http://localhost:3000 dan liat perubahan, (4) tambah tombol di template yang menampilkan alert saat diklik.',
    chEn: 'Explore: (1) change "Hello, Angular!" to your welcome message in AppComponent template, (2) add an h2 with your name, (3) try accessing http://localhost:3000 and see the change, (4) add a button in template that shows alert on click.',
    sumId: 'Angular = framework TypeScript. src/app/ = kode Anda. @NgModule = modul. @Component = komponen. Lanjut: data binding.',
    sumEn: 'Angular = TypeScript framework. src/app/ = your code. @NgModule = module. @Component = component. Next: data binding.',
  },
  {
    num: 2, topicId: 'components-templates',
    titleId: 'Components & Templates', titleEn: 'Components & Templates',
    codeFile: 'src/app/app.component.ts',
    files: {
      'src/app/app.component.ts': 'import { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'app-root\',\n  template: `<div>\n    <h1>{{ title }}</h1>\n    <p>{{ message }}</p>\n    <button (click)="onClick()">Klik Saya</button>\n  </div>`,\n})\nexport class AppComponent {\n  title = \'Angular Components\';\n  message = \'Belajar data binding di Angular\';\n\n  onClick(): void {\n    this.message = \'Tombol diklik!\';\n  }\n}\n',
      'src/app/app.component.html': '<div>\n  <h1>{{ title }}</h1>\n  <p>{{ message }}</p>\n  <button (click)="onClick()">Klik Saya</button>\n</div>\n',
      'composer.json': PKG_NODE('angular-lesson-2', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-2', DEV_SERVE),
      'README.md': '# Angular Lesson 2 - Components & Templates\n\nJalankan: npm install && npm run dev\n\nTemplate: interpolation {{ }}, event binding (click), property binding.\n',
    },
    objId: ['Memahami komponen Angular: @Component dengan selector dan template', 'Menggunakan interpolation {{ }} untuk menampilkan data', 'Menggunakan event binding (click) untuk menangani aksi user', 'Memisahkan template ke file .html terpisah dengan templateUrl'],
    objEn: ['Understand Angular component: @Component with selector and template', 'Use interpolation {{ }} to display data', 'Use event binding (click) to handle user actions', 'Separate template to .html file with templateUrl'],
    expId: `## Komponen Angular\n@Component({ selector, template }) — decorator yang mendefinisikan komponen. selector = nama tag HTML. template = HTML template inline.\n## Interpolation\n{{ title }} — menampilkan nilai properti title dari komponen ke HTML. Angular secara otomatis mendeteksi perubahan dan memperbarui view.\n## Event Binding\n(click)="onClick()" — mendengarkan event click dan memanggil method onClick() di komponen.\n## Template URL\ntemplateUrl: './app.component.html' — memisahkan template ke file HTML terpisah untuk kode yang lebih bersih.`,
    expEn: `## Angular Component\n@Component({ selector, template }) — decorator that defines the component. selector = HTML tag name. template = inline HTML template.\n## Interpolation\n{{ title }} — displays the title property value from the component into HTML. Angular automatically detects changes and updates the view.\n## Event Binding\n(click)="onClick()" — listens for click event and calls onClick() method in the component.\n## Template URL\ntemplateUrl: './app.component.html' — separates template to HTML file for cleaner code.`,
    chId: 'Kembangkan komponen: (1) tambah properti baru "nama" dan tampilkan di template, (2) tambah method "ubahPesan()" yang mengubah message, (3) buat komponen anak dengan selector "app-child" dan tampilkan di parent, (4) tambah input field dengan [(ngModel)] untuk two-way binding.',
    chEn: 'Expand component: (1) add new property "nama" and display in template, (2) add method "ubahPesan()" that changes message, (3) create child component with selector "app-child" and display in parent, (4) add input field with [(ngModel)] for two-way binding.',
    sumId: 'Component = @Component. Interpolation = {{ }}. Event binding = (click). templateUrl = file terpisah. Lanjut: directives.',
    sumEn: 'Component = @Component. Interpolation = {{ }}. Event binding = (click). templateUrl = separate file. Next: directives.',
  },
  {
    num: 3, topicId: 'data-binding',
    titleId: 'Data Binding & Interpolation', titleEn: 'Data Binding & Interpolation',
    codeFile: 'src/app/app.component.ts',
    files: {
      'src/app/app.component.ts': 'import { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'app-root\',\n  template: `<div>\n    <h1>{{ title }}</h1>\n    <p [class.highlight]="isHighlighted">Text dengan class binding</p>\n    <p [style.color]="warna">Text dengan style binding</p>\n    <input [value]="nama" (input)="nama = $any($event.target).value">\n    <p>Halo, {{ nama }}!</p>\n  </div>`,\n})\nexport class AppComponent {\n  title = \'Data Binding\';\n  isHighlighted = true;\n  warna = \'blue\';\n  nama = \'Dunia\';\n}\n',
      'composer.json': PKG_NODE('angular-lesson-3', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-3', DEV_SERVE),
      'README.md': '# Angular Lesson 3 - Data Binding & Interpolation\n\nJalankan: npm install && npm run dev\n\nTypes of binding: interpolation, property, style, class, two-way.\n',
    },
    objId: ['Memahami 4 jenis data binding: interpolation, property, style, class', 'Menggunakan [class.className] untuk conditional class', 'Menggunakan [style.property] untuk inline style', 'Menggunakan [(ngModel)] untuk two-way data binding'],
    objEn: ['Understand 4 types of data binding: interpolation, property, style, class', 'Use [class.className] for conditional class', 'Use [style.property] for inline style', 'Use [(ngModel)] for two-way data binding'],
    expId: `## Jenis Data Binding\n1. Interpolation: {{ value }} — one-way, data ke view. 2. Property Binding: [property]="value" — one-way, data ke DOM property. 3. Event Binding: (event)="handler()" — one-way, DOM event ke komponen. 4. Two-way Binding: [(ngModel)]="value" — kedua arah.\n## Class Binding\n[class.highlight]="condition" — menambah/hapus class berdasarkan kondisi. [class.active]="isActive" — lebih spesifik.\n## Style Binding\n[style.color]="warna" — mengatur style inline dynamically. [style.fontSize.px]="size" — dengan unit.`,
    expEn: `## Types of Data Binding\n1. Interpolation: {{ value }} — one-way, data to view. 2. Property Binding: [property]="value" — one-way, data to DOM property. 3. Event Binding: (event)="handler()" — one-way, DOM event to component. 4. Two-way Binding: [(ngModel)]="value" — both directions.\n## Class Binding\n[class.highlight]="condition" — toggle class based on condition. [class.active]="isActive" — more specific.\n## Style Binding\n[style.color]="warna" — set inline style dynamically. [style.fontSize.px]="size" — with unit.`,
    chId: 'Tingkatkan data binding: (1) buat komponen dengan 3 input dan 3 output binding berbeda, (2) tambah class binding dengan beberapa kondisi (class-merah, class-biru, class-hijau), (3) buat style binding dengan multiple properties (color, fontSize, fontWeight), (4) implementasi two-way binding dengan form input dan display di bawahnya.',
    chEn: 'Level up data binding: (1) create component with 3 inputs and 3 different output bindings, (2) add class binding with multiple conditions (class-red, class-blue, class-green), (3) create style binding with multiple properties (color, fontSize, fontWeight), (4) implement two-way binding with form input and display below.',
    sumId: 'Interpolation = {{ }}. Property = []. Style = [style]. Class = [class]. Two-way = [(ngModel)]. Lanjut: directives.',
    sumEn: 'Interpolation = {{ }}. Property = []. Style = [style]. Class = [class]. Two-way = [(ngModel)]. Next: directives.',
  },
  {
    num: 4, topicId: 'directives',
    titleId: 'Directives (Structural & Attribute)', titleEn: 'Directives (Structural & Attribute)',
    codeFile: 'src/app/app.component.ts',
    files: {
      'src/app/app.component.ts': 'import { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'app-root\',\n  template: `<div>\n    <h2>Structural Directives</h2>\n    <ul>\n      <li *ngFor="let item of items; let i = index">{{ i + 1 }}. {{ item }}</li>\n    </ul>\n    <p *ngIf="showHello">Hello dengan *ngIf</p>\n    <p *ngIf="!showHello; else elseBlock">Else block</p>\n    <ng-template #elseBlock><p>Template else</p></ng-template>\n\n    <h2>Attribute Directives</h2>\n    <div [class.active]="isActive" [style.background]="bgColor">Div dengan attribute directive</div>\n    <input [(ngModel)]="nama" placeholder="Ketik nama Anda">\n    <p>{{ nama }}</p>\n  </div>`,\n})\nexport class AppComponent {\n  items = [\'Angular\', \'React\', \'Vue\'];\n  showHello = true;\n  isActive = true;\n  bgColor = \'#f0f0f0\';\n  nama = \'\';\n}\n',
      'composer.json': PKG_NODE('angular-lesson-4', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-4', DEV_SERVE),
      'README.md': '# Angular Lesson 4 - Directives\n\nJalankan: npm install && npm run dev\n\nStructural: *ngFor, *ngIf. Attribute: [class], [style], [(ngModel)].\n',
    },
    objId: ['Menggunakan *ngFor untuk iterasi array', 'Menggunakan *ngIf untuk conditional rendering', 'Memahami perbedaan structural dan attribute directives', 'Menggunakan [(ngModel)] untuk two-way binding'],
    objEn: ['Use *ngFor for array iteration', 'Use *ngIf for conditional rendering', 'Understand structural vs attribute directives', 'Use [(ngModel)] for two-way binding'],
    expId: `## Structural Directives\n*ngFor="let item of items; let i = index" — loop dengan index. *ngIf="condition" — conditional render. *ngIf="condition; else elseTemplate" — dengan else block.\n## Attribute Directives\n[class.active]="condition" — toggle class. [style.color]="value" — set style. [(ngModel)]="value" — two-way binding (requires FormsModule).\n## ng-template\n<ng-template #templateRef> — mendefinisikan template yang bisa dirujuk dengan #ref. Digunakan untuk *ngIf else dan *ngFor template.\n## FormsModule\nImport FormsModule di app.module.ts untuk menggunakan ngModel. Tanpa FormsModule, ngModel tidak akan berfungsi.`,
    expEn: `## Structural Directives\n*ngFor="let item of items; let i = index" — loop with index. *ngIf="condition" — conditional render. *ngIf="condition; else elseTemplate" — with else block.\n## Attribute Directives\n[class.active]="condition" — toggle class. [style.color]="value" — set style. [(ngModel)]="value" — two-way binding (requires FormsModule).\n## ng-template\n<ng-template #templateRef> — defines template that can be referenced with #ref. Used for *ngIf else and *ngFor template.\n## FormsModule\nImport FormsModule in app.module.ts to use ngModel. Without FormsModule, ngModel will not work.`,
    chId: 'Tingkatkan directives: (1) buat list dengan *ngFor dan filter berdasarkan search input, (2) buat nested *ngIf dengan beberapa kondisi, (3) buat custom attribute directive yang mengubah background color pada hover, (4) implementasi *ngSwitch untuk menampilkan konten berdasarkan kondisi multiple.',
    chEn: 'Level up directives: (1) create list with *ngFor and filter based on search input, (2) create nested *ngIf with multiple conditions, (3) create custom attribute directive that changes background on hover, (4) implement *ngSwitch for displaying content based on multiple conditions.',
    sumId: '*ngFor = loop. *ngIf = conditional. [class] = attribute directive. ngModel = two-way. Lanjut: forms.',
    sumEn: '*ngFor = loop. *ngIf = conditional. [class] = attribute directive. ngModel = two-way. Next: forms.',
  },
  {
    num: 5, topicId: 'forms',
    titleId: 'Forms (Template-driven & Reactive)', titleEn: 'Forms (Template-driven & Reactive)',
    codeFile: 'src/app/app.component.ts',
    files: {
      'src/app/app.component.ts': 'import { Component } from \'@angular/core\';\nimport { FormBuilder, FormGroup, Validators } from \'@angular/forms\';\n\n@Component({\n  selector: \'app-root\',\n  template: `<div>\n    <h2>Template-driven Form</h2>\n    <form #f="ngForm" (ngSubmit)="onSubmit(f)">\n      <input name="nama" [(ngModel)]="nama" required #namaInput="ngModel">\n      <span *ngIf="namaInput.invalid && namaInput.touched">Nama wajib diisi</span>\n      <button type="submit" [disabled]="f.invalid">Kirim</button>\n    </form>\n\n    <h2>Reactive Form</h2>\n    <form [formGroup]="form" (ngSubmit)="onReactiveSubmit()">\n      <input formControlName="nama">\n      <span *ngIf="form.get(\'nama\')?.invalid && form.get(\'nama\')?.touched">Nama wajib</span>\n      <button type="submit" [disabled]="form.invalid">Kirim</button>\n    </form>\n  </div>`,\n})\nexport class AppComponent {\n  nama = \'\';\n  form: FormGroup;\n\n  constructor(private fb: FormBuilder) {\n    this.form = this.fb.group({\n      nama: [\'\', Validators.required],\n    });\n  }\n\n  onSubmit(form: any): void {\n    console.log(\'Template-driven:\', form.value);\n  }\n\n  onReactiveSubmit(): void {\n    console.log(\'Reactive:\', this.form.value);\n  }\n}\n',
      'composer.json': PKG_NODE('angular-lesson-5', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-5', DEV_SERVE),
      'README.md': '# Angular Lesson 5 - Forms\n\nJalankan: npm install && npm run dev\n\nTemplate-driven vs Reactive forms. Validators.\n',
    },
    objId: ['Memahami perbedaan template-driven dan reactive forms', 'Menggunakan ngModel untuk template-driven forms', 'Menggunakan FormBuilder dan FormGroup untuk reactive forms', 'Menggunakan Validators untuk validasi form'],
    objEn: ['Understand template-driven vs reactive forms', 'Use ngModel for template-driven forms', 'Use FormBuilder and FormGroup for reactive forms', 'Use Validators for form validation'],
    expId: `## Template-driven Forms\n#f="ngForm" — reference ke form directive. (ngSubmit)="onSubmit(f)" — submit handler. [(ngModel)]="nama" — two-way binding. required — built-in validator.\n## Reactive Forms\nFormBuilder — service untuk membuat FormGroup. FormGroup — mengelompokkan FormControl. Validators.required — validasi wajib diisi.\n## Validators\nrequired, minLength(3), maxLength(255), email, pattern. Custom validator: function that returns validation error or null.\n## Comparison\nTemplate-driven: simpler, good for simple forms. Reactive: more control, good for complex forms. Both can be used in same app.`,
    expEn: `## Template-driven Forms\n#f="ngForm" — reference to form directive. (ngSubmit)="onSubmit(f)" — submit handler. [(ngModel)]="nama" — two-way binding. required — built-in validator.\n## Reactive Forms\nFormBuilder — service to create FormGroup. FormGroup — groups FormControls. Validators.required — required validator.\n## Validators\nrequired, minLength(3), maxLength(255), email, pattern. Custom validator: function that returns validation error or null.\n## Comparison\nTemplate-driven: simpler, good for simple forms. Reactive: more control, good for complex forms. Both can be used in same app.`,
    chId: 'Tingkatkan forms: (1) buat form registrasi dengan validasi email dan password confirmation, (2) buat custom validator untuk username yang cek duplikat, (3) tambah form array untuk dynamic list input, (4) implementasi form wizard multi-step dengan navigasi next/prev.',
    chEn: 'Level up forms: (1) create registration form with email and password confirmation validation, (2) create custom validator for username that checks duplicates, (3) add form array for dynamic list input, (4) implement multi-step form wizard with next/prev navigation.',
    sumId: 'Template-driven = ngModel sederhana. Reactive = FormBuilder kontrol penuh. Validators = validasi. Lanjut: services.',
    sumEn: 'Template-driven = simple ngModel. Reactive = FormBuilder full control. Validators = validation. Next: services.',
  },
  {
    num: 6, topicId: 'services-di',
    titleId: 'Services & Dependency Injection', titleEn: 'Services & Dependency Injection',
    codeFile: 'src/app/services/data.service.ts',
    files: {
      'src/app/services/data.service.ts': 'import { Injectable } from \'@angular/core\';\n\n@Injectable({\n  providedIn: \'root\',\n})\nexport class DataService {\n  private data: string[] = [\'Item 1\', \'Item 2\', \'Item 3\'];\n\n  getData(): string[] {\n    return this.data;\n  }\n\n  addItem(item: string): void {\n    this.data.push(item);\n  }\n\n  removeItem(index: number): void {\n    this.data.splice(index, 1);\n  }\n}\n',
      'src/app/app.component.ts': 'import { Component } from \'@angular/core\';\nimport { DataService } from \'./services/data.service\';\n\n@Component({\n  selector: \'app-root\',\n  template: `<div>\n    <h2>Items</h2>\n    <ul>\n      <li *ngFor="let item of items; let i = index">\n        {{ item }}\n        <button (click)="remove(i)">Hapus</button>\n      </li>\n    </ul>\n    <input #newItem placeholder="Item baru">\n    <button (click)="add(newItem.value); newItem.value=\'\'">Tambah</button>\n  </div>`,\n})\nexport class AppComponent {\n  items: string[];\n\n  constructor(private dataService: DataService) {\n    this.items = this.dataService.getData();\n  }\n\n  add(item: string): void {\n    this.dataService.addItem(item);\n  }\n\n  remove(index: number): void {\n    this.dataService.removeItem(index);\n  }\n}\n',
      'composer.json': PKG_NODE('angular-lesson-6', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-6', DEV_SERVE),
      'README.md': '# Angular Lesson 6 - Services & DI\n\nJalankan: npm install && npm run dev\n\n@Injectable, providedIn: root, constructor injection.\n',
    },
    objId: ['Membuat service dengan @Injectable decorator', 'Menggunakan providedIn: root untuk root-level provider', 'Menginjeksi service via constructor', 'Memahami singleton service di Angular'],
    objEn: ['Create service with @Injectable decorator', 'Use providedIn: root for root-level provider', 'Inject service via constructor', 'Understand singleton service in Angular'],
    expId: `## @Injectable\n@Injectable({ providedIn: 'root' }) — mendefinisikan service yang tersedia di seluruh aplikasi. providedIn: 'root' membuat service sebagai singleton.\n## Dependency Injection\nconstructor(private dataService: DataService) — Angular otomatis menginjeksi DataService. Tidak perlu manual registration di providers array.\n## Service Pattern\nService menyimpan data dan logika bisnis. Komponen hanya bertanggung jawab untuk menampilkan data dan menangani interaksi user. Pemisahan ini memudahkan testing dan reuse.\n## providedIn Options\n'root' — singleton untuk seluruh aplikasi. 'any' — new instance per lazy-loaded module. Component-level — instance per component.`,
    expEn: `## @Injectable\n@Injectable({ providedIn: 'root' }) — defines service available throughout the app. providedIn: 'root' makes service a singleton.\n## Dependency Injection\nconstructor(private dataService: DataService) — Angular auto-injects DataService. No manual registration in providers array needed.\n## Service Pattern\nService stores data and business logic. Component only responsible for displaying data and handling user interaction. This separation makes testing and reuse easier.\n## providedIn Options\n'root' — singleton for entire app. 'any' — new instance per lazy-loaded module. Component-level — instance per component.`,
    chId: 'Kembangkan service: (1) tambah method updateItem() di DataService, (2) buat service kedua (AuthService) dengan method login/logout, (3) buat service dengan HttpClient untuk fetch data dari API, (4) implementasi service caching yang menyimpan data di memory dan mengembalikan cached data jika tersedia.',
    chEn: 'Expand service: (1) add updateItem() method in DataService, (2) create second service (AuthService) with login/logout methods, (3) create service with HttpClient for fetching data from API, (4) implement caching service that stores data in memory and returns cached data if available.',
    sumId: '@Injectable = service. providedIn: root = singleton. constructor = DI. Service = data + logic. Lanjut: routing.',
    sumEn: '@Injectable = service. providedIn: root = singleton. constructor = DI. Service = data + logic. Next: routing.',
  },
  {
    num: 7, topicId: 'routing',
    titleId: 'Routing & Navigation', titleEn: 'Routing & Navigation',
    codeFile: 'src/app/app.routes.ts',
    files: {
      'src/app/app.routes.ts': 'import { Routes } from \'@angular/router\';\nimport { HomeComponent } from \'./home/home.component\';\nimport { AboutComponent } from \'./about/about.component\';\n\nexport const routes: Routes = [\n  { path: \'\', component: HomeComponent },\n  { path: \'about\', component: AboutComponent },\n  { path: \'**\', redirectTo: \'\' },\n];\n',
      'src/app/app.component.ts': 'import { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'app-root\',\n  template: `<div>\n    <nav>\n      <a routerLink="/">Beranda</a>\n      <a routerLink="/about">Tentang</a>\n    </nav>\n    <router-outlet></router-outlet>\n  </div>`,\n})\nexport class AppComponent {}\n',
      'src/app/home/home.component.ts': 'import { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'app-home\',\n  template: \'<h1>Beranda</h1><p>Selamat datang di aplikasi Angular.</p>\',\n})\nexport class HomeComponent {}\n',
      'src/app/about/about.component.ts': 'import { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'app-about\',\n  template: \'<h1>Tentang</h1><p>Ini adalah halaman tentang.</p>\',\n})\nexport class AboutComponent {}\n',
      'composer.json': PKG_NODE('angular-lesson-7', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-7', DEV_SERVE),
      'README.md': '# Angular Lesson 7 - Routing & Navigation\n\nJalankan: npm install && npm run dev\n\nRouterModule, routerLink, router-outlet, Routes config.\n',
    },
    objId: ['Mengatur routes dengan array Routes', 'Menggunakan routerLink untuk navigasi', 'Menggunakan router-outlet untuk menampilkan komponen', 'Menggunakan wildcard route untuk 404 handling'],
    objEn: ['Configure routes with Routes array', 'Use routerLink for navigation', 'Use router-outlet to display components', 'Use wildcard route for 404 handling'],
    expId: `## Routes Configuration\nRoutes = array of route objects. path = URL path. component = component to render. redirectTo = redirect path. ** = wildcard (404).\n## Navigation\nrouterLink="/about" — navigasi ke /about. routerLinkActive — tambah class aktif. routerLink dengan query params: routerLink="/about" [queryParams]="{page: 1}".\n## Router Outlet\n<router-outlet> — placeholder di mana komponen route ditampilkan. Setiap navigasi mengganti konten di outlet.\n## Lazy Loading\nloadComponent: () => import('./about/about.component').then(m => m.AboutComponent) — load component on demand untuk performa lebih baik.`,
    expEn: `## Routes Configuration\nRoutes = array of route objects. path = URL path. component = component to render. redirectTo = redirect path. ** = wildcard (404).\n## Navigation\nrouterLink="/about" — navigate to /about. routerLinkActive — add active class. routerLink with query params: routerLink="/about" [queryParams]="{page: 1}".\n## Router Outlet\n<router-outlet> — placeholder where route component is displayed. Each navigation replaces content in outlet.\n## Lazy Loading\nloadComponent: () => import('./about/about.component').then(m => m.AboutComponent) — load component on demand for better performance.`,
    chId: 'Tingkatkan routing: (1) tambah route parameter /detail/:id dengan ActivatedRoute, (2) tambah route guards (CanActivate) untuk proteksi halaman, (3) buat nested routes dengan children, (4) implementasi lazy loading untuk setiap modul.',
    chEn: 'Level up routing: (1) add route parameter /detail/:id with ActivatedRoute, (2) add route guards (CanActivate) for page protection, (3) create nested routes with children, (4) implement lazy loading for each module.',
    sumId: 'Routes = array config. routerLink = navigasi. router-outlet = display. ** = wildcard. Lanjut: HTTP client.',
    sumEn: 'Routes = array config. routerLink = navigation. router-outlet = display. ** = wildcard. Next: HTTP client.',
  },
  {
    num: 8, topicId: 'http-client',
    titleId: 'HTTP Client & API Integration', titleEn: 'HTTP Client & API Integration',
    codeFile: 'src/app/services/api.service.ts',
    files: {
      'src/app/services/api.service.ts': 'import { Injectable } from \'@angular/core\';\nimport { HttpClient } from \'@angular/common/http\';\nimport { Observable } from \'rxjs\';\n\n@Injectable({\n  providedIn: \'root\',\n})\nexport class ApiService {\n  private baseUrl = \'https://jsonplaceholder.typicode.com\';\n\n  constructor(private http: HttpClient) {}\n\n  getPosts(): Observable<any[]> {\n    return this.http.get<any[]>(this.baseUrl + \'/posts\');\n  }\n\n  getPost(id: number): Observable<any> {\n    return this.http.get<any>(this.baseUrl + \'/posts/\' + id);\n  }\n\n  createPost(post: any): Observable<any> {\n    return this.http.post(this.baseUrl + \'/posts\', post);\n  }\n}\n',
      'src/app/app.component.ts': 'import { Component, OnInit } from \'@angular/core\';\nimport { ApiService } from \'./services/api.service\';\n\n@Component({\n  selector: \'app-root\',\n  template: `<div>\n    <h2>Posts</h2>\n    <ul>\n      <li *ngFor="let post of posts">\n        {{ post.title }}\n      </li>\n    </ul>\n  </div>`,\n})\nexport class AppComponent implements OnInit {\n  posts: any[] = [];\n\n  constructor(private apiService: ApiService) {}\n\n  ngOnInit(): void {\n    this.apiService.getPosts().subscribe(data => {\n      this.posts = data;\n    });\n  }\n}\n',
      'composer.json': PKG_NODE('angular-lesson-8', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-8', DEV_SERVE),
      'README.md': '# Angular Lesson 8 - HTTP Client & API Integration\n\nJalankan: npm install && npm run dev\n\nHttpClient, Observable, subscribe.\n',
    },
    objId: ['Menggunakan HttpClient untuk melakukan HTTP request', 'Memahami Observable dari RxJS', 'Menggunakan subscribe() untuk menerima data', 'Mengimplementasikan GET, POST, PUT, DELETE methods'],
    objEn: ['Use HttpClient for HTTP requests', 'Understand RxJS Observable', 'Use subscribe() to receive data', 'Implement GET, POST, PUT, DELETE methods'],
    expId: `## HttpClient\nHttpClient dari @angular/common/http — module untuk melakukan HTTP request. Harus di-import di app.module.ts providers.\n## Observable\nObservable = lazy collection of multiple values. subscribe() = menjalankan Observable dan menerima data. Angular HTTP methods return Observable.\n## HTTP Methods\nget() — fetch data. post() — create data. put() — update data. delete() — remove data. Semua return Observable.\n## Error Handling\n.subscribe({ next: (data) => ..., error: (err) => ... }) — handle success dan error. catchError() operator dari RxJS untuk handle error di stream.`,
    expEn: `## HttpClient\nHttpClient from @angular/common/http — module for making HTTP requests. Must be imported in app.module.ts providers.\n## Observable\nObservable = lazy collection of multiple values. subscribe() = execute Observable and receive data. Angular HTTP methods return Observable.\n## HTTP Methods\nget() — fetch data. post() — create data. put() — update data. delete() — remove data. All return Observable.\n## Error Handling\n.subscribe({ next: (data) => ..., error: (err) => ... }) — handle success and error. catchError() RxJS operator for error handling in stream.`,
    chId: 'Tingkatkan HTTP client: (1) tambah error handling dengan catchError dan menampilkan pesan error di UI, (2) tambah loading state dengan isLoading flag, (3) implementasi HTTP interceptor untuk menambahkan auth header ke semua request, (4) buat service dengan retry logic untuk request yang gagal.',
    chEn: 'Level up HTTP client: (1) add error handling with catchError and display error message in UI, (2) add loading state with isLoading flag, (3) implement HTTP interceptor to add auth header to all requests, (4) create service with retry logic for failed requests.',
    sumId: 'HttpClient = HTTP request. Observable = lazy data stream. subscribe() = execute. catchError = error handling. Lanjut: pipes.',
    sumEn: 'HttpClient = HTTP request. Observable = lazy data stream. subscribe() = execute. catchError = error handling. Next: pipes.',
  },
  {
    num: 9, topicId: 'pipes',
    titleId: 'Pipes & Data Transformation', titleEn: 'Pipes & Data Transformation',
    codeFile: 'src/app/pipes/uppercase.pipe.ts',
    files: {
      'src/app/pipes/uppercase.pipe.ts': 'import { Pipe, PipeTransform } from \'@angular/core\';\n\n@Pipe({\n  name: \'uppercase\',\n  pure: true,\n})\nexport class UppercasePipe implements PipeTransform {\n  transform(value: string): string {\n    return value ? value.toUpperCase() : \'\';\n  }\n}\n',
      'src/app/app.component.ts': 'import { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'app-root\',\n  template: `<div>\n    <h2>Built-in Pipes</h2>\n    <p>{{ "hello world" | uppercase }}</p>\n    <p>{{ "hello world" | lowercase }}</p>\n    <p>{{ 1234567 | number }}</p>\n    <p>{{ "2024-01-15" | date:"mediumDate" }}</p>\n    <p>{{ 0.123456 | percent:"1.2-2" }}</p>\n    <p>{{ "Hello World" | slice:0:5 }}</p>\n\n    <h2>Custom Pipe</h2>\n    <p>{{ "hello world" | uppercase }}</p>\n  </div>`,\n})\nexport class AppComponent {}\n',
      'composer.json': PKG_NODE('angular-lesson-9', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-9', DEV_SERVE),
      'README.md': '# Angular Lesson 9 - Pipes & Data Transformation\n\nJalankan: npm install && npm run dev\n\nBuilt-in pipes: uppercase, lowercase, date, number, percent, slice. Custom pipes.\n',
    },
    objId: ['Menggunakan built-in pipes (uppercase, lowercase, date, number)', 'Membuat custom pipe dengan @Pipe decorator', 'Memahami pure vs impure pipes', 'Menggunakan pipe chaining (| pipe1 | pipe2)'],
    objEn: ['Use built-in pipes (uppercase, lowercase, date, number)', 'Create custom pipe with @Pipe decorator', 'Understand pure vs impure pipes', 'Use pipe chaining (| pipe1 | pipe2)'],
    expId: `## Built-in Pipes\nuppercase — convert to uppercase. lowercase — convert to lowercase. date — format date. number — format number. percent — format as percentage. slice — extract substring.\n## Custom Pipe\n@Pipe({ name: 'myPipe' }) — decorator untuk pipe. implements PipeTransform — wajib implement transform method. pure: true (default) — hanya re-run when input changes.\n## Pipe Chaining\n{{ value | pipe1 | pipe2 }} — pipe output jadi input pipe berikutnya. {{ date | date:'short' | uppercase }}.`,
    expEn: `## Built-in Pipes\nuppercase — convert to uppercase. lowercase — convert to lowercase. date — format date. number — format number. percent — format as percentage. slice — extract substring.\n## Custom Pipe\n@Pipe({ name: 'myPipe' }) — decorator for pipe. implements PipeTransform — must implement transform method. pure: true (default) — only re-run when input changes.\n## Pipe Chaining\n{{ value | pipe1 | pipe2 }} — pipe output becomes input for next pipe. {{ date | date:'short' | uppercase }}.`,
    chId: 'Tingkatkan pipes: (1) buat custom pipe untuk truncate text dengan parameter panjang, (2) buat impure pipe yang update setiap detik (untuk live clock), (3) buat custom pipe untuk currency formatting dengan simbol lokal, (4) buat custom pipe untuk masking nomor telepon.',
    chEn: 'Level up pipes: (1) create custom pipe for text truncation with length parameter, (2) create impure pipe that updates every second (for live clock), (3) create custom pipe for currency formatting with local symbol, (4) create custom pipe for phone number masking.',
    sumId: 'Built-in pipes = uppercase, date, number. Custom pipe = @Pipe + PipeTransform. Pure = default. Chaining = | pipe1 | pipe2. Lanjut: component communication.',
    sumEn: 'Built-in pipes = uppercase, date, number. Custom pipe = @Pipe + PipeTransform. Pure = default. Chaining = | pipe1 | pipe2. Next: component communication.',
  },
  {
    num: 10, topicId: 'component-communication',
    titleId: 'Component Communication (Input/Output)', titleEn: 'Component Communication (Input/Output)',
    codeFile: 'src/app/parent/parent.component.ts',
    files: {
      'src/app/parent/parent.component.ts': 'import { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'app-parent\',\n  template: `<div>\n    <h2>Parent Component</h2>\n    <p>Data dari parent: {{ parentData }}</p>\n    <app-child [inputData]="parentData" (outputEvent)="handleOutput($event)"></app-child>\n    <button (click)="parentData = \'Data baru dari parent\'">Ubah Data</button>\n  </div>`,\n})\nexport class ParentComponent {\n  parentData = \'Halo dari parent\';\n\n  handleOutput(data: string): void {\n    this.parentData = data;\n  }\n}\n',
      'src/app/child/child.component.ts': 'import { Component, Input, Output, EventEmitter } from \'@angular/core\';\n\n@Component({\n  selector: \'app-child\',\n  template: `<div>\n    <h3>Child Component</h3>\n    <p>Data dari parent: {{ inputData }}</p>\n    <button (click)="sendToParent()">Kirim ke Parent</button>\n  </div>`,\n})\nexport class ChildComponent {\n  @Input() inputData: string = \'\';\n  @Output() outputEvent = new EventEmitter<string>();\n\n  sendToParent(): void {\n    this.outputEvent.emit(\'Data dari child\');\n  }\n}\n',
      'composer.json': PKG_NODE('angular-lesson-10', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-10', DEV_SERVE),
      'README.md': '# Angular Lesson 10 - Component Communication\n\nJalankan: npm install && npm run dev\n\n@Input, @Output, EventEmitter, parent-child communication.\n',
    },
    objId: ['Menggunakan @Input untuk mengirim data dari parent ke child', 'Menggunakan @Output dan EventEmitter untuk mengirim data dari child ke parent', 'Memahami one-way data flow di Angular', 'Membuat komponen parent dan child yang saling berkomunikasi'],
    objEn: ['Use @Input to send data from parent to child', 'Use @Output and EventEmitter to send data from child to parent', 'Understand one-way data flow in Angular', 'Create parent and child components that communicate'],
    expId: `## @Input\n@Input() propertyName: string — decorator untuk menerima data dari parent ke child. Parent mengirim via [propertyName]="value" di template.\n## @Output & EventEmitter\n@Output() eventName = new EventEmitter<string>() — decorator untuk mengirim data dari child ke parent. Child memanggil eventName.emit(value). Parent mendengarkan dengan (eventName)="handler($event)".\n## One-way Data Flow\nData mengalir satu arah: parent → child (via @Input), child → parent (via @Output). Angular menggunakan unidirectional data flow untuk predictability dan easier debugging.\n## Services for Communication\nUntuk komunikasi antar komponen yang tidak berhubungan (siblings), gunakan shared service dengan BehaviorSubject dari RxJS.`,
    expEn: `## @Input\n@Input() propertyName: string — decorator to receive data from parent to child. Parent sends via [propertyName]="value" in template.\n## @Output & EventEmitter\n@Output() eventName = new EventEmitter<string>() — decorator to send data from child to parent. Child calls eventName.emit(value). Parent listens with (eventName)="handler($event)".\n## One-way Data Flow\nData flows one direction: parent → child (via @Input), child → parent (via @Output). Angular uses unidirectional data flow for predictability and easier debugging.\n## Services for Communication\nFor communication between unrelated components (siblings), use shared service with BehaviorSubject from RxJS.`,
    chId: 'Tingkatkan komunikasi komponen: (1) buat sibling communication dengan shared service dan BehaviorSubject, (2) buat komponen grandparent-parent-child dengan data flow 3 level, (3) implementasi query params untuk passing data antar route, (4) buat state management sederhana dengan service dan Observable.',
    chEn: 'Level up component communication: (1) create sibling communication with shared service and BehaviorSubject, (2) create grandparent-parent-child component with 3-level data flow, (3) implement query params for passing data between routes, (4) create simple state management with service and Observable.',
    sumId: '@Input = parent ke child. @Output = child ke parent. EventEmitter = emit event. One-way flow. Lanjut: lifecycle hooks.',
    sumEn: '@Input = parent to child. @Output = child to parent. EventEmitter = emit event. One-way flow. Next: lifecycle hooks.',
  },
  {
    num: 11, topicId: 'lifecycle-hooks',
    titleId: 'Lifecycle Hooks', titleEn: 'Lifecycle Hooks',
    codeFile: 'src/app/app.component.ts',
    files: {
      'src/app/app.component.ts': 'import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from \'@angular/core\';\n\n@Component({\n  selector: \'app-root\',\n  template: `<div>\n    <h2>Lifecycle Hooks Demo</h2>\n    <p>Status: {{ status }}</p>\n    <button (click)="toggle()">Toggle Component</button>\n    <app-child *ngIf="showChild" [inputData]="data"></app-child>\n  </div>`,\n})\nexport class AppComponent implements OnInit, OnDestroy, OnChanges {\n  status = \'init\';\n  showChild = true;\n  data = \'Halo\';\n\n  ngOnInit(): void {\n    this.status = \'initialized\';\n    console.log(\'ngOnInit: Component initialized\');\n  }\n\n  ngOnChanges(changes: SimpleChanges): void {\n    console.log(\'ngOnChanges:\', changes);\n    this.status = \'changed\';\n  }\n\n  ngOnDestroy(): void {\n    console.log(\'ngOnDestroy: Component destroyed\');\n    this.status = \'destroyed\';\n  }\n\n  toggle(): void {\n    this.showChild = !this.showChild;\n  }\n}\n',
      'composer.json': PKG_NODE('angular-lesson-11', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-11', DEV_SERVE),
      'README.md': '# Angular Lesson 11 - Lifecycle Hooks\n\nJalankan: npm install && npm run dev\n\nngOnInit, ngOnDestroy, ngOnChanges, ngDoCheck.\n',
    },
    objId: ['Memahami lifecycle hooks Angular', 'Menggunakan ngOnInit untuk inisialisasi', 'Menggunakan ngOnDestroy untuk cleanup', 'Menggunakan ngOnChanges untuk mendeteksi perubahan input'],
    objEn: ['Understand Angular lifecycle hooks', 'Use ngOnInit for initialization', 'Use ngOnDestroy for cleanup', 'Use ngOnChanges to detect input changes'],
    expId: `## Lifecycle Hooks\nngOnInit() — dipanggil setelah komponen diinisialisasi. Cocok untuk fetch data dan setup subscription.\nngOnDestroy() — dipanggil sebelum komponen dihancurkan. Cocok untuk unsubscribe dari Observable dan cleanup.\nngOnChanges(changes) — dipanggil saat @Input properties berubah. Menerima SimpleChanges object.\nngDoCheck() — dipanggil setiap change detection cycle. Untuk custom change detection.\n## Cleanup Pattern\nsubscription = this.data$.subscribe(...). Di ngOnDestroy: subscription.unsubscribe() — mencegah memory leak.\n## ngOnChanges\nchanges.currentValue — nilai baru. changes.previousValue — nilai sebelumnya. changes.firstChange — apakah ini perubahan pertama.`,
    expEn: `## Lifecycle Hooks\nngOnInit() — called after component initialized. Good for fetching data and setting up subscriptions.\nngOnDestroy() — called before component destroyed. Good for unsubscribing from Observables and cleanup.\nngOnChanges(changes) — called when @Input properties change. Receives SimpleChanges object.\nngDoCheck() — called on every change detection cycle. For custom change detection.\n## Cleanup Pattern\nsubscription = this.data$.subscribe(...). In ngOnDestroy: subscription.unsubscribe() — prevents memory leak.\n## ngOnChanges\nchanges.currentValue — new value. changes.previousValue — previous value. changes.firstChange — whether this is the first change.`,
    chId: 'Tingkatkan lifecycle hooks: (1) buat komponen dengan subscription yang di-cleanup di ngOnDestroy, (2) implementasi ngDoCheck untuk custom validation, (3) buat komponen yang menggunakan AfterViewInit untuk akses ke DOM element, (4) implementasi retry logic di ngOnInit dengan timer dan retry count.',
    chEn: 'Level up lifecycle hooks: (1) create component with subscription cleaned up in ngOnDestroy, (2) implement ngDoCheck for custom validation, (3) create component using AfterViewInit for DOM element access, (4) implement retry logic in ngOnInit with timer and retry count.',
    sumId: 'ngOnInit = init. ngOnDestroy = cleanup. ngOnChanges = input change. ngDoCheck = custom check. Lanjut: RxJS.',
    sumEn: 'ngOnInit = init. ngOnDestroy = cleanup. ngOnChanges = input change. ngDoCheck = custom check. Next: RxJS.',
  },
  {
    num: 12, topicId: 'rxjs',
    titleId: 'Reactive Programming with RxJS', titleEn: 'Reactive Programming with RxJS',
    codeFile: 'src/app/services/rxjs.service.ts',
    files: {
      'src/app/services/rxjs.service.ts': 'import { Injectable } from \'@angular/core\';\nimport { Observable, of, fromEvent } from \'rxjs\';\nimport { map, filter, debounceTime, distinctUntilChanged, switchMap } from \'rxjs/operators\';\n\n@Injectable({\n  providedIn: \'root\',\n})\nexport class RxJsService {\n  getNumbers(): Observable<number[]> {\n    return of([1, 2, 3, 4, 5]);\n  }\n\n  getProcessedNumbers(): Observable<number[]> {\n    return of([1, 2, 3, 4, 5]).pipe(\n      map(n => n * 2),\n      filter(n => n > 4),\n    );\n  }\n\n  search(terms: Observable<string>): Observable<any[]> {\n    return terms.pipe(\n      debounceTime(300),\n      distinctUntilChanged(),\n      switchMap(term => this.fetchResults(term)),\n    );\n  }\n\n  private fetchResults(term: string): Observable<any[]> {\n    return of([{ title: \'Result for \' + term }]);\n  }\n}\n',
      'src/app/app.component.ts': 'import { Component, OnInit } from \'@angular/core\';\nimport { RxJsService } from \'./services/rxjs.service\';\nimport { Subject } from \'rxjs\';\n\n@Component({\n  selector: \'app-root\',\n  template: `<div>\n    <h2>RxJS Demo</h2>\n    <input #search (input)="searchTerms.next(search.value)">\n    <ul>\n      <li *ngFor="let result of results">{{ result.title }}</li>\n    </ul>\n  </div>`,\n})\nexport class AppComponent implements OnInit {\n  results: any[] = [];\n  searchTerms = new Subject<string>();\n\n  constructor(private rxjsService: RxJsService) {}\n\n  ngOnInit(): void {\n    this.rxjsService.search(this.searchTerms).subscribe(data => {\n      this.results = data;\n    });\n  }\n}\n',
      'composer.json': PKG_NODE('angular-lesson-12', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-12', DEV_SERVE),
      'README.md': '# Angular Lesson 12 - RxJS\n\nJalankan: npm install && npm run dev\n\nObservable, operators: map, filter, debounceTime, switchMap.\n',
    },
    objId: ['Memahami Observable dari RxJS', 'Menggunakan operator map, filter, debounceTime', 'Menggunakan Subject untuk custom Observable', 'Menggunakan switchMap untuk request cancellation'],
    objEn: ['Understand RxJS Observable', 'Use operators map, filter, debounceTime', 'Use Subject for custom Observable', 'Use switchMap for request cancellation'],
    expId: `## Observable\nObservable = lazy collection of multiple values over time. of() — create Observable from static values. fromEvent() — create Observable from DOM events.\n## Operators\nmap() — transform values. filter() — filter values. debounceTime(300) — wait 300ms between emissions. distinctUntilChanged() — skip duplicate values. switchMap() — cancel previous inner Observable.\n## Subject\nSubject = both Observable and Observer. new Subject<string>() — create Subject. subject.next(value) — emit value. subject.subscribe() — listen for values.\n## Common Patterns\ndebounceTime + distinctUntilChanged — untuk search input. switchMap — untuk autocomplete/search. forkCombine — untuk parallel requests.`,
    expEn: `## Observable\nObservable = lazy collection of multiple values over time. of() — create Observable from static values. fromEvent() — create Observable from DOM events.\n## Operators\nmap() — transform values. filter() — filter values. debounceTime(300) — wait 300ms between emissions. distinctUntilChanged() — skip duplicate values. switchMap() — cancel previous inner Observable.\n## Subject\nSubject = both Observable and Observer. new Subject<string>() — create Subject. subject.next(value) — emit value. subject.subscribe() — listen for values.\n## Common Patterns\ndebounceTime + distinctUntilChanged — for search input. switchMap — for autocomplete/search. forkCombine — for parallel requests.`,
    chId: 'Tingkatkan RxJS: (1) buat custom operator untuk retry dengan max retry count, (2) implementasi BehaviorSubject untuk state management sederhana, (3) buat autocomplete search dengan switchMap dan debounceTime, (4) implementasi WebSocket connection dengan Observable dan reconnect logic.',
    chEn: 'Level up RxJS: (1) create custom operator for retry with max retry count, (2) implement BehaviorSubject for simple state management, (3) create autocomplete search with switchMap and debounceTime, (4) implement WebSocket connection with Observable and reconnect logic.',
    sumId: 'Observable = lazy data stream. map/filter = transform/filter. Subject = custom Observable. switchMap = cancel previous. Lanjut: route guards.',
    sumEn: 'Observable = lazy data stream. map/filter = transform/filter. Subject = custom Observable. switchMap = cancel previous. Next: route guards.',
  },
  {
    num: 13, topicId: 'route-guards',
    titleId: 'Route Guards & Resolvers', titleEn: 'Route Guards & Resolvers',
    codeFile: 'src/app/guards/auth.guard.ts',
    files: {
      'src/app/guards/auth.guard.ts': 'import { Injectable } from \'@angular/core\';\nimport { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from \'@angular/router\';\nimport { Observable } from \'rxjs\';\n\n@Injectable({\n  providedIn: \'root\',\n})\nexport class AuthGuard implements CanActivate {\n  constructor(private router: Router) {}\n\n  canActivate(\n    route: ActivatedRouteSnapshot,\n    state: RouterStateSnapshot\n  ): boolean {\n    const isLoggedIn = localStorage.getItem(\'token\') !== null;\n    if (!isLoggedIn) {\n      this.router.navigate([\'/login\']);\n      return false;\n    }\n    return true;\n  }\n}\n',
      'src/app/app.routes.ts': 'import { Routes } from \'@angular/router\';\nimport { HomeComponent } from \'./home/home.component\';\nimport { AboutComponent } from \'./about/about.component\';\nimport { AuthGuard } from \'./guards/auth.guard\';\n\nexport const routes: Routes = [\n  { path: \'\', component: HomeComponent },\n  { path: \'about\', component: AboutComponent },\n  { path: \'admin\', component: AdminComponent, canActivate: [AuthGuard] },\n  { path: \'**\', redirectTo: \'\' },\n];\n',
      'composer.json': PKG_NODE('angular-lesson-13', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-13', DEV_SERVE),
      'README.md': '# Angular Lesson 13 - Route Guards & Resolvers\n\nJalankan: npm install && npm run dev\n\nCanActivate, CanDeactivate, Resolve guards.\n',
    },
    objId: ['Membuat custom guard dengan CanActivate interface', 'Menggunakan guard untuk proteksi route', 'Menggunakan router.navigate untuk redirect', 'Memahami perbedaan guard types (CanActivate, CanDeactivate, Resolve)'],
    objEn: ['Create custom guard with CanActivate interface', 'Use guard for route protection', 'Use router.navigate for redirect', 'Understand guard types (CanActivate, CanDeactivate, Resolve)'],
    expId: `## CanActivate\ncanActivate() — dipanggil sebelum route diaktifkan. Return true = izinkan navigasi. Return false = blokir navigasi. Bisa return Observable<boolean> atau Promise<boolean> untuk async check.\n## CanDeactivate\ncanDeactivate() — dipanggil sebelum route ditinggalkan. Cocok untuk konfirmasi "Anda yakin ingin keluar?" jika ada perubahan yang belum disimpan.\n## Resolve\nresolve() — dipanggil sebelum route diaktifkan untuk mengambil data. Data tersedia di komponen via route.snapshot.data.\n## Route Configuration\ncanActivate: [AuthGuard] — proteksi route. canDeactivate: [LeaveGuard] — konfirmasi sebelum leave. resolve: { data: DataResolver } — pre-fetch data.`,
    expEn: `## CanActivate\ncanActivate() — called before route is activated. Return true = allow navigation. Return false = block navigation. Can return Observable<boolean> or Promise<boolean> for async check.\n## CanDeactivate\ncanDeactivate() — called before route is left. Good for "Are you sure you want to leave?" confirmation if there are unsaved changes.\n## Resolve\nresolve() — called before route is activated to fetch data. Data available in component via route.snapshot.data.\n## Route Configuration\ncanActivate: [AuthGuard] — protect route. canDeactivate: [LeaveGuard] — confirm before leaving. resolve: { data: DataResolver } — pre-fetch data.`,
    chId: 'Tingkatkan route guards: (1) buat guard dengan role-based access (admin vs user), (2) buat guard dengan async check via Observable (cek token di API), (3) buat resolver yang fetch data dari API sebelum route diaktifkan, (4) implementasi CanDeactivate guard untuk form dengan unsaved changes confirmation.',
    chEn: 'Level up route guards: (1) create guard with role-based access (admin vs user), (2) create guard with async check via Observable (check token via API), (3) create resolver that fetches data from API before route activation, (4) implement CanDeactivate guard for form with unsaved changes confirmation.',
    sumId: 'CanActivate = proteksi route. CanDeactivate = konfirmasi leave. Resolve = pre-fetch data. Lanjut: state management.',
    sumEn: 'CanActivate = route protection. CanDeactivate = leave confirmation. Resolve = pre-fetch data. Next: state management.',
  },
  {
    num: 14, topicId: 'state-management',
    titleId: 'State Management (Signals & NgRx)', titleEn: 'State Management (Signals & NgRx)',
    codeFile: 'src/app/state/app.state.ts',
    files: {
      'src/app/state/app.state.ts': 'import { signal, computed } from \'@angular/core\';\n\nexport interface AppState {\n  count: number;\n  items: string[];\n}\n\nexport const count = signal(0);\nexport const doubled = computed(() => count() * 2);\nexport const items = signal<string[]>([]);\n\nexport function increment(): void {\n  count.update(value => value + 1);\n}\n\nexport function decrement(): void {\n  count.update(value => value - 1);\n}\n\nexport function addItem(item: string): void {\n  items.update(current => [...current, item]);\n}\n',
      'src/app/app.component.ts': 'import { Component } from \'@angular/core\';\nimport { count, doubled, items, increment, decrement, addItem } from \'./state/app.state\';\n\n@Component({\n  selector: \'app-root\',\n  template: `<div>\n    <h2>State Management with Signals</h2>\n    <p>Count: {{ count() }}</p>\n    <p>Doubled: {{ doubled() }}</p>\n    <button (click)="increment()">+</button>\n    <button (click)="decrement()">-</button>\n    <input #newItem placeholder="Item baru">\n    <button (click)="addItem(newItem.value); newItem.value=\'\'">Tambah</button>\n    <ul>\n      <li *ngFor="let item of items()">{{ item }}</li>\n    </ul>\n  </div>`,\n})\nexport class AppComponent {\n  count = count;\n  doubled = doubled;\n  items = items;\n\n  increment = increment;\n  decrement = decrement;\n  addItem = addItem;\n}\n',
      'composer.json': PKG_NODE('angular-lesson-14', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-14', DEV_SERVE),
      'README.md': '# Angular Lesson 14 - State Management\n\nJalankan: npm install && npm run dev\n\nAngular Signals: signal(), computed(), update().\n',
    },
    objId: ['Memahami Angular Signals untuk state management', 'Menggunakan signal() untuk membuat reactive state', 'Menggunakan computed() untuk derived state', 'Menggunakan update() untuk memodifikasi signal value'],
    objEn: ['Understand Angular Signals for state management', 'Use signal() to create reactive state', 'Use computed() for derived state', 'Use update() to modify signal value'],
    expId: `## Signals\nsignal(initialValue) — create reactive state. signal() — read current value. signal.set(newValue) — set new value. signal.update(fn) — modify value with updater function.\n## Computed\ncomputed(() => expression) — create derived state that auto-updates when dependencies change. read with computed() — no subscription needed.\n## NgRx (Alternative)\nNgRx = Redux pattern for Angular. Store = single source of truth. Actions = describe what happened. Reducers = pure function that updates state. Effects = handle side effects.\n## Comparison\nSignals = simpler, built-in, great for local component state. NgRx = more powerful, better for complex global state with many components sharing data.`,
    expEn: `## Signals\nsignal(initialValue) — create reactive state. signal() — read current value. signal.set(newValue) — set new value. signal.update(fn) — modify value with updater function.\n## Computed\ncomputed(() => expression) — create derived state that auto-updates when dependencies change. read with computed() — no subscription needed.\n## NgRx (Alternative)\nNgRx = Redux pattern for Angular. Store = single source of truth. Actions = describe what happened. Reducers = pure function that updates state. Effects = handle side effects.\n## Comparison\nSignals = simpler, built-in, great for local component state. NgRx = more powerful, better for complex global state with many components sharing data.`,
    chId: 'Tingkatkan state management: (1) buat store NgRx dengan Actions, Reducers, Effects untuk counter app, (2) implementasi localStorage persistence untuk signals state, (3) buat state management untuk shopping cart dengan add/remove/clear, (4) bandingkan performa Signals vs NgRx dengan Angular DevTools Profiler.',
    chEn: 'Level up state management: (1) create NgRx store with Actions, Reducers, Effects for counter app, (2) implement localStorage persistence for signals state, (3) create state management for shopping cart with add/remove/clear, (4) compare Signals vs NgRx performance with Angular DevTools Profiler.',
    sumId: 'signal() = reactive state. computed() = derived state. update() = modify. NgRx = Redux pattern. Lanjut: testing.',
    sumEn: 'signal() = reactive state. computed() = derived state. update() = modify. NgRx = Redux pattern. Next: testing.',
  },
  {
    num: 15, topicId: 'testing-jasmine',
    titleId: 'Testing dengan Jasmine & Karma', titleEn: 'Testing with Jasmine & Karma',
    codeFile: 'src/app/app.component.spec.ts',
    files: {
      'src/app/app.component.spec.ts': 'import { ComponentFixture, TestBed } from \'@angular/core/testing\';\nimport { AppComponent } from \'./app.component\';\n\ndescribe(\'AppComponent\', () => {\n  let component: AppComponent;\n  let fixture: ComponentFixture<AppComponent>;\n\n  beforeEach(async () => {\n    await TestBed.configureTestingModule({\n      declarations: [AppComponent],\n    }).compileComponents();\n\n    fixture = TestBed.createComponent(AppComponent);\n    component = fixture.componentInstance;\n    fixture.detectChanges();\n  });\n\n  it(\'should create the app\', () => {\n    expect(component).toBeTruthy();\n  });\n\n  it(\'should render title\', () => {\n    const compiled = fixture.nativeElement as HTMLElement;\n    expect(compiled.querySelector(\'h1\')?.textContent).toContain(\'Angular\');\n  });\n\n  it(\'should increment count on button click\', () => {\n    const compiled = fixture.nativeElement as HTMLElement;\n    const button = compiled.querySelector(\'button\') as HTMLButtonElement;\n    button.click();\n    fixture.detectChanges();\n    expect(component.count).toBe(1);\n  });\n});\n',
      'composer.json': PKG_NODE('angular-lesson-15', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-15', DEV_SERVE),
      'README.md': '# Angular Lesson 15 - Testing\n\nJalankan: npm install && npm run dev\n\nJasmine + Karma. TestBed, ComponentFixture, describe/it/expect.\n',
    },
    objId: ['Menulis test dengan Jasmine dan Karma', 'Menggunakan TestBed untuk konfigurasi testing module', 'Menggunakan ComponentFixture untuk testing komponen', 'Menggunakan describe/it/expect untuk test structure'],
    objEn: ['Write tests with Jasmine and Karma', 'Use TestBed for testing module configuration', 'Use ComponentFixture for component testing', 'Use describe/it/expect for test structure'],
    expId: `## Testing Setup\nJasmine = test framework. Karma = test runner. TestBed = Angular testing utility.\n## Test Structure\ndescribe(\'suite\', () => { it(\'test name\', () => { expect(...).toBe(...) }) }) — nested test suites and individual test cases.\n## TestBed\nTestBed.configureTestingModule({ declarations: [Component] }) — configure testing module. compileComponents() — compile templates. TestBed.createComponent(Component) — create test fixture.\n## Assertions\nexpect(component).toBeTruthy() — check truthy. expect(value).toBe(expected) — check equality. expect(el.textContent).toContain(\'text\') — check DOM content.\n## Running Tests\nng test — run all tests in watch mode. ng test --watch=false — run once and exit. ng test --include src/app/app.component.spec.ts — run specific test file.`,
    expEn: `## Testing Setup\nJasmine = test framework. Karma = test runner. TestBed = Angular testing utility.\n## Test Structure\ndescribe(\'suite\', () => { it(\'test name\', () => { expect(...).toBe(...) }) }) — nested test suites and individual test cases.\n## TestBed\nTestBed.configureTestingModule({ declarations: [Component] }) — configure testing module. compileComponents() — compile templates. TestBed.createComponent(Component) — create test fixture.\n## Assertions\nexpect(component).toBeTruthy() — check truthy. expect(value).toBe(expected) — check equality. expect(el.textContent).toContain(\'text\') — check DOM content.\n## Running Tests\nng test — run all tests in watch mode. ng test --watch=false — run once and exit. ng test --include src/app/app.component.spec.ts — run specific test file.`,
    chId: 'Tingkatkan testing: (1) buat test service dengan dependency injection mock, (2) buat test untuk route guards dengan RouterTestingModule, (3) tambah test untuk HTTP client dengan HttpTestingController, (4) implementasi test coverage report dan target minimal 80%.',
    chEn: 'Level up testing: (1) create service test with mock dependency injection, (2) create test for route guards with RouterTestingModule, (3) add test for HTTP client with HttpTestingController, (4) implement test coverage report and target minimum 80%.',
    sumId: 'Jasmine = framework. Karma = runner. TestBed = setup. describe/it/expect = structure. Lanjut: proyek akhir.',
    sumEn: 'Jasmine = framework. Karma = runner. TestBed = setup. describe/it/expect = structure. Next: final project.',
  },
  {
    num: 16, topicId: 'capstone-project',
    titleId: 'Proyek Akhir: Task Manager App', titleEn: 'Final Project: Task Manager App',
    codeFile: 'src/app/app.component.ts',
    files: {
      'src/app/app.component.ts': 'import { Component } from \'@angular/core\';\nimport { CommonModule } from \'@angular/common\';\nimport { FormsModule, ReactiveFormsModule } from \'@angular/forms\';\nimport { RouterModule, Routes } from \'@angular/router\';\nimport { HttpClientModule } from \'@angular/common/http\';\n\n@Component({\n  selector: \'app-root\',\n  template: `<div>\n    <nav>\n      <a routerLink="/">Task Manager</a>\n      <a routerLink="/about">About</a>\n    </nav>\n    <router-outlet></router-outlet>\n  </div>`,\n  standalone: true,\n  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],\n})\nexport class AppComponent {}\n',
      'src/app/app.routes.ts': 'import { Routes } from \'@angular/router\';\nimport { TaskListComponent } from \'./task-list/task-list.component\';\nimport { TaskFormComponent } from \'./task-form/task-form.component\';\n\nexport const routes: Routes = [\n  { path: \'\', component: TaskListComponent },\n  { path: \'add\', component: TaskFormComponent },\n  { path: \'edit/:id\', component: TaskFormComponent },\n];\n',
      'src/app/task-list/task-list.component.ts': 'import { Component, OnInit } from \'@angular/core\';\nimport { TaskService } from \'../services/task.service\';\nimport { Task } from \'../models/task.model\';\n\n@Component({\n  selector: \'app-task-list\',\n  template: `<div>\n    <h1>Task Manager</h1>\n    <a routerLink="/add">Tambah Task</a>\n    <ul>\n      <li *ngFor="let task of tasks">\n        {{ task.title }} - {{ task.status }}\n        <a [routerLink]="[\'/edit\', task.id]">Edit</a>\n        <button (click)="delete(task.id)">Hapus</button>\n      </li>\n    </ul>\n  </div>`,\n})\nexport class TaskListComponent implements OnInit {\n  tasks: Task[] = [];\n\n  constructor(private taskService: TaskService) {}\n\n  ngOnInit(): void {\n    this.tasks = this.taskService.getTasks();\n  }\n\n  delete(id: number): void {\n    this.taskService.deleteTask(id);\n    this.tasks = this.taskService.getTasks();\n  }\n}\n',
      'composer.json': PKG_NODE('angular-lesson-16', DEV_SERVE),
      'package.json': PKG_NODE('angular-lesson-16', DEV_SERVE),
      'README.md': '# Angular Lesson 16 - Final Project: Task Manager App\n\nJalankan: npm install && npm run dev\n\nFull Angular app with: Components, Routing, Forms, Services, HTTP Client, RxJS, Guards, Signals, Testing.\n',
    },
    objId: ['Merangkus semua konsep Angular ke dalam satu proyek Task Manager', 'Menerapkan routing dengan RouterModule dan router-outlet', 'Menggunakan FormsModule dan ReactiveFormsModule untuk form input', 'Mengamankan route dengan AuthGuard dan proteksi halaman admin'],
    objEn: ['Assemble all Angular concepts into one Task Manager project', 'Implement routing with RouterModule and router-outlet', 'Use FormsModule and ReactiveFormsModule for form input', 'Secure routes with AuthGuard and protect admin pages'],
    expId: `## Proyek Akhir: Menyatukan Semua\n16 pelajaran Angular dirangkum di sini: components & templates (Lesson 2), data binding (Lesson 3), directives (Lesson 4), forms (Lesson 5), services & DI (Lesson 6), routing (Lesson 7), HTTP client (Lesson 8), pipes (Lesson 9), component communication (Lesson 10), lifecycle hooks (Lesson 11), RxJS (Lesson 12), route guards (Lesson 13), state management (Lesson 14), testing (Lesson 15).\n## Arsitektur Task Manager\nRoute -> Component -> Service -> Model. Setiap request melewati router, diarahkan ke komponen, komponen berinteraksi dengan service untuk data, dan merender template untuk output HTML.\n## Dari Angular ke Production\nUntuk deployment: gunakan ng build --prod untuk build production. Deploy ke Firebase Hosting, Netlify, atau Vercel. Aktifkan production mode di environment.prod.ts. Setup backend API untuk data persistence.`,
    expEn: `## Final Project: Bringing It All Together\n16 Angular lessons summarized here: components & templates (Lesson 2), data binding (Lesson 3), directives (Lesson 4), forms (Lesson 5), services & DI (Lesson 6), routing (Lesson 7), HTTP client (Lesson 8), pipes (Lesson 9), component communication (Lesson 10), lifecycle hooks (Lesson 11), RxJS (Lesson 12), route guards (Lesson 13), state management (Lesson 14), testing (Lesson 15).\n## Task Manager Architecture\nRoute -> Component -> Service -> Model. Every request goes through router, routed to component, component interacts with service for data, and renders template for HTML output.\n## From Angular to Production\nFor deployment: use ng build --prod for production build. Deploy to Firebase Hosting, Netlify, or Vercel. Enable production mode in environment.prod.ts. Setup backend API for data persistence.`,
    chId: 'Tingkatkan proyek akhir: (1) tambah fitur kategori task dengan filter, (2) tambah drag-and-drop untuk reorder task, (3) implementasi real-time sync dengan Firebase atau WebSocket, (4) tambah dark mode toggle dengan Angular Material theme.',
    chEn: 'Level up the final project: (1) add task category feature with filter, (2) add drag-and-drop for task reorder, (3) implement real-time sync with Firebase or WebSocket, (4) add dark mode toggle with Angular Material theme.',
    sumId: 'Task Manager = semua konsep Angular. Routing + Forms + Services + RxJS + Guards + Signals + Testing. Anda siap build Angular app nyata!',
    sumEn: 'Task Manager = all Angular concepts. Routing + Forms + Services + RxJS + Guards + Signals + Testing. You are ready to build real Angular apps!',
  },
];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const levelDir = 'angular';
  const mdDir = path.join(BASE_DIR, levelDir);
  fs.mkdirSync(mdDir, { recursive: true });

  const objListId = lesson.objId.map((o) => `- ${o}`).join('\\n');
  const objListEn = lesson.objEn.map((o) => `- ${o}`).join('\\n');

  for (const lang of ['id', 'en']) {
    const langDir = path.join(mdDir, lang);
    fs.mkdirSync(langDir, { recursive: true });
    const isId = lang === 'id';
    const title = isId ? lesson.titleId : lesson.titleEn;
    const objList = isId ? objListId : objListEn;
    const exp = isId ? lesson.expId : lesson.expEn;
    const ch = isId ? lesson.chId : lesson.chEn;
    const sum = isId ? lesson.sumId : lesson.sumEn;
    const lessonLabel = isId ? `Pelajaran ${lesson.num}` : `Lesson ${lesson.num}`;

    const code = lesson.files[lesson.codeFile] || '';
    const filename = `lesson${lesson.num}-${lesson.topicId}.md`;
    const content = `# ${title}

> Angular | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## Program: ${isId ? 'Angular' : 'Angular'}

\`\`\`typescript
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${exp}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${exp.split('\\n').map((l) => l.trim()).filter((l) => l.startsWith('##')).map((h, i) => `${i + 1}. **${h.replace(/^#+\\s*/, '')}**`).join('\\n')}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${ch}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${sum}
`;

    fs.writeFileSync(path.join(langDir, filename), content);

    const filesJson = path.join(langDir, `lesson${lesson.num}-${lesson.topicId}.json`);
    fs.writeFileSync(filesJson, JSON.stringify(lesson.files, null, 2));
  }

  console.log(`  ${lesson.num}. ${lesson.titleId} / ${lesson.titleEn}`);
}

const total = LESSONS.length * 2;
console.log(`\\nGenerated ${total} Angular curriculum files (${LESSONS.length} lessons x 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);