import {AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Todo} from "../../Domain/Interface/Todo.interface";
import {TodoDetailComponent} from "../../components/todo-detail/todo-detail.component";
import {TodoBox} from "../../utils/enums/todo-box.enum";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @ViewChildren(TodoDetailComponent) todoDetail: QueryList<TodoDetailComponent>;
  public todos: Todo[] = []
  public TodoBox = TodoBox

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    for (let i = 0; i < 5; i++) {
      this.todos.push({
        id: i + 1,
        name: `Do homeword ${i}`,
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

  onShowDetail(todo: Todo): void {
    todo.isShowDetail = !todo.isShowDetail
    this.cdr.detectChanges()
    this.todoDetail.toArray().forEach(item => item.updateFormValue())
  }

  onRemove(todo: Todo): void {
    this.todos = [...this.todos].filter(item => item.id !== todo.id)
  }

  onRemoveAll(): void {
    this.todos = [...this.todos].filter(item => !item.isChecked)
  }

  canShowRemoveAll(): boolean {
    return this.todos.some(item => item.isChecked)
  }
}
