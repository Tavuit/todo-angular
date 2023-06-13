import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoDetailComponent} from "./todo-detail.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [TodoDetailComponent],
  exports: [
    TodoDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TodoDetailModule {
}
