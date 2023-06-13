import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Todo} from "../../Domain/Interface/Todo.interface";
import {formatDate} from '@angular/common';
import {TodoBox} from "../../utils/enums/todo-box.enum";

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  private $destroyed: Subject<void> = new Subject<void>();
  public minDate: Date = new Date();
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
  public TodoBox = TodoBox
  @Input('box-type') boxType: TodoBox = TodoBox.CREATE

  @Input()
  set todo(todo: Todo) {
    this._todo = todo
  }

  get todo(): Todo {
    return this._todo
  }

  @Output() todoChange: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(
    private fbuilder: FormBuilder
  ) {
    this.todoForm = this.fbuilder.group({
      id: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", []),
      dueDate: new FormControl("", []),
      priority: new FormControl("", [])
    })
  }

  ngOnInit(): void {
    this.updateFormValue()
  }

  updateFormValue(): void {
    this.todoForm.controls['id'].patchValue(this._todo.id)
    this.todoForm.controls['name'].patchValue(this._todo.name)
    this.todoForm.controls['description'].patchValue(this._todo.description)
    this.todoForm.controls['dueDate'].patchValue(formatDate(this._todo.dueDate, 'yyyy-MM-dd', 'en'))
    this.todoForm.controls['priority'].patchValue(this._todo.priority)
  }

  hasError(controlName: string, type: string): boolean {
    switch (type) {
      case 'required': {
        return this.todoForm.controls[controlName].dirty && this.todoForm.controls[controlName].hasError('required')
      }
    }
  }

  isControlError(controlName: string): string {
    return this.todoForm.controls[controlName].dirty && this.todoForm.controls[controlName].invalid ? 'invalid' : ''
  }

  submit(): void {
    if (this.todoForm.invalid) {
      return
    }
    this.todoChange.emit(this.todoForm.getRawValue())

    if (this.boxType === TodoBox.CREATE) {
      this.todoForm.reset({dueDate: formatDate(this._todo.dueDate, 'yyyy-MM-dd', 'en'), priority: 'normal'})
    }
  }
}
