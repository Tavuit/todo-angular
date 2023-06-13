import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoListComponent} from "./todo-list.component";
import {FormsModule} from "@angular/forms";
import {TodoDetailModule} from "../../components/todo-detail/todo-detail.module";


@NgModule({
  declarations: [TodoListComponent],
  exports: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TodoDetailModule
  ]
})
export class TodoListModule {
}
