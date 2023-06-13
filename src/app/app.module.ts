import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TodoTaskModule} from "./module/todo-task/todo-task.module";
import {TodoListModule} from "./module/todo-list/todo-list.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TodoTaskModule,
    TodoListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
