import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoTaskComponent} from "./todo-task.component";
import {FormsModule} from "@angular/forms";
import {TodoDetailComponent} from "../../components/todo-detail/todo-detail.component";
import {TodoDetailModule} from "../../components/todo-detail/todo-detail.module";


@NgModule({
  declarations: [TodoTaskComponent],
  exports: [
    TodoTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TodoDetailModule
  ]
})
export class TodoTaskModule {
}
