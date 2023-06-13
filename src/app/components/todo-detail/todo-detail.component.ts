import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Todo} from "../../Domain/Interface/Todo.interface";
import {formatDate} from '@angular/common';

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  private $destroyed: Subject<void> = new Subject<void>();

  public priorities: { label: string, value: string }[] = [{
    label: "High", value: "high"
  }, {
    label: "Normal", value: "normal"
  }, {
    label: "Low", value: "low"
  }]
  public todoForm: FormGroup;
  private _todo: Todo = {
    name: "",
    description: "",
    dueDate: new Date(),
    priority: "normal"
  }

  @Input()
  set todo(todo: Todo) {
    this._todo = todo
  }

  get todo(): Todo {
    return this._todo
  }

  @Output() submit: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() {
    this.todoForm = new FormGroup<any>({
      name: new FormControl(this._todo.name, [Validators.required]),
      description: new FormControl(this._todo.description, []),
      dueDate: new FormControl(formatDate(this._todo.dueDate, 'yyyy-MM-dd', 'en'), []),
      priority: new FormControl(this._todo.priority, [])
    })
  }

  ngOnInit(): void {
  }

}
