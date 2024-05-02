import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo.model';
import { TodoKeyLocalStorage } from '../models/enum/todoKeyLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalService {

  public todoState = signal<Array<Todo>>([]);

  public updateTodos({id, title, description, done}:Todo): void {
    if((id && title && description !==null) || undefined){
      const newTodo = new Todo(id, title, description, done);
      this.todoState.set([...this.todoState(), newTodo]);
    }
  }

  public saveTodosLocalStorage(): void{
    const todos = JSON.stringify(this.todoState());
    todos && localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todos)
  }
}
