import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoTaskComponent} from "./todo-task.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [TodoTaskComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TodoTaskModule {
}
