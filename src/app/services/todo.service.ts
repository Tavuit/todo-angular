import {AfterViewInit, Injectable, OnInit} from '@angular/core';
import {Todo} from "../Domain/Interface/Todo.interface";
import {BehaviorSubject, Subject} from "rxjs";
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private KEY: string = '@Storage::todo'
  private _todos: Todo[] = []
  private _todoSubject: Subject<Todo[]>;
  private currentSearch: string;

  constructor() {
    this._todoSubject = new Subject<Todo[]>()
  }

  public getStorage(): void {
    let todoStorage = localStorage.getItem(this.KEY)
    if (!!todoStorage) {
      this._todos = JSON.parse(todoStorage)
    }
    this.reduceTodoByDueDate()
  }

  private setStorage(): void {
    localStorage.setItem(this.KEY, JSON.stringify(this._todos))
  }

  public getTodos(): Subject<Todo[]> {
    return this._todoSubject
  }

  public createTodo(todo: Todo): void {
    const id: string = uuid();
    todo.id = id
    this._todos.push(todo)
    this.reduceTodoByDueDate()
    if (!!this.currentSearch) {
      this.filterTodo(this.currentSearch)
    }
  }

  public updateTodo(todo: Todo): void {
    this._todos = this._todos.map(item => {
      if (item.id === todo.id) {
        return todo
      }
      return item
    })
    this.reduceTodoByDueDate()
  }

  public removeTodo(todos: Todo[]): void {
    this._todos = this._todos.filter(item => ![...todos].map(v => v.id).includes(item.id))
    this.reduceTodoByDueDate()
  }

  public filterTodo(keyword: string): void {
    if (!keyword.length) {
      this._todoSubject.next(this._todos)
    }
    this.currentSearch = keyword
    let todos = [...this._todos].filter(item => item.name.search(keyword) !== -1)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      // .sort((a, b) => a.priority > b.priority ? 1 : -1)
    this._todoSubject.next(todos)
  }

  private reduceTodoByDueDate(): void {
    this._todos = [...this._todos]
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      // .sort((a, b) => a.priority > b.priority ? 1 : -1)
    this.setStorage()
    this._todoSubject.next(this._todos)
  }
}
