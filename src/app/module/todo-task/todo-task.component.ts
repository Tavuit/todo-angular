import {Component, OnInit} from '@angular/core';
import {TodoBox} from "../../utils/enums/todo-box.enum";
import {TodoService} from "../../services/todo.service";
import {Todo} from '../../Domain/Interface/Todo.interface';
import {TodoPriority} from "../../utils/enums/todo-priority.enum";

@Component({
  selector: 'todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss']
})
export class TodoTaskComponent implements OnInit {
  public todo: Todo = {
    name: "",
    description: "",
    dueDate: new Date(),
    priority: TodoPriority.NORMAL
  }

  constructor(
    private todoService: TodoService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(event: Todo): void {
    this.todoService.createTodo(event)
  }

}
