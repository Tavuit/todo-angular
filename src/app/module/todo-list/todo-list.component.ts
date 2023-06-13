import {Component, OnInit} from '@angular/core';
import {Todo} from "../../Domain/Interface/Todo.interface";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todos: Todo[] = []

  constructor() {
    for (let i = 0; i < 30; i++) {
      this.todos.push({
        id: i + 1,
        name: "Do homeword",
        description: "",
        dueDate: new Date(),
        priority: "high",
        isShowDetail: false,
        isChecked: false
      })
    }
  }

  ngOnInit(): void {
  }

}
