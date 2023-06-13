import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Todo} from "../../Domain/Interface/Todo.interface";
import {TodoDetailComponent} from "../../components/todo-detail/todo-detail.component";
import {TodoBox} from "../../utils/enums/todo-box.enum";
import {TodoService} from "../../services/todo.service";
import {debounceTime, of, Subject, switchMap, takeUntil, tap} from "rxjs";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  @ViewChildren(TodoDetailComponent) todoDetail: QueryList<TodoDetailComponent>;
  private $destroy: Subject<void> = new Subject<void>()
  public todos: Todo[] = []
  public TodoBox = TodoBox
  public todoSearch: Subject<string> = new Subject<string>()
  public onSearch: boolean = false

  constructor(
    private cdr: ChangeDetectorRef,
    private todoService: TodoService
  ) {
    this.todoService.getTodos()
      .pipe(
        tap((result) => {
          this.todos = result
        }),
        takeUntil(this.$destroy)
      )
      .subscribe()
    this.todoSearch
      .pipe(
        tap((keyword) => {
          this.onSearch = !!keyword
        }),
        debounceTime(300),
        switchMap(async (keyword) => this.todoService.filterTodo(keyword)),
        takeUntil(this.$destroy)
      )
      .subscribe()
  }

  ngOnInit(): void {
    this.todoService.getStorage()
  }

  onShowDetail(todo: Todo): void {
    todo.isShowDetail = !todo.isShowDetail
    this.cdr.detectChanges()
    this.todoDetail.toArray().forEach(item => item.updateFormValue())
  }

  onRemove(todo: Todo): void {
    this.todoService.removeTodo([todo])
  }

  onRemoveAll(): void {
    this.todoService.removeTodo([...this.todos].filter(item => item.isChecked))
  }

  canShowRemoveAll(): boolean {
    return this.todos.some(item => item.isChecked)
  }

  onChangeTodo(todo: Todo): void {
    this.todoService.updateTodo(todo)
  }


  ngOnDestroy() {
    this.$destroy.next()
    this.$destroy.complete()
  }
}
