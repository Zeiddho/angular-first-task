import {Component, inject} from "@angular/core";
import {TodosApiService} from "../todos-api.service";
import {TodosListInterface} from "./todos-list.interface";
import {NgFor} from "@angular/common";/*check it*/
import {TodoCardComponent} from "./todo-card/todo-card.component";

@Component({
  selector: 'app-todos-list',
  templateUrl: 'todos-list.component.html',
  styleUrl: 'todos-list.component.scss',
  standalone: true,
  imports: [TodoCardComponent, NgFor]
})

export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);

  todos: TodosListInterface[] =[]

  constructor() {
    this.todosApiService.getTodos().subscribe(
      (response: any) => {
        this.todos = response;
        console.log('TODO: ', this.todos)
      }
    )
  }

  deleteTodos(id: number) {
    this.todos = this.todos.filter(
      todos => todos.id !== id
    )
  }
}
