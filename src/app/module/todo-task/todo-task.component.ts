import {Component, OnInit} from '@angular/core';
import {TodoBox} from "../../utils/enums/todo-box.enum";

@Component({
  selector: 'todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss']
})
export class TodoTaskComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

}
