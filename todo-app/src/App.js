import React, { useCallback, useReducer, useRef } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos() {
  const array = [];
  for(let i=0; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch(action.type) {
    case 'INSERT': // 추가
      // { type: 'INSERT', todo: { id: 1, text: 'todo', checked: false } }
      return todos.concat(action.todo);
    case 'REMOVE': // 제거
      // { type: 'REMOVE', id: 1 }
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE': // 토글
      // { type: 'TOGGLE', id: 1 }
      return todos.map(todo => todo.id === action.id ? {...todo, checked: true} : todo);
    default:
      return todos
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  // props로 전달되는 함수는 useCallback으로 전달
  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({type: 'INSERT', todo})
    nextId.current++;
  }, []);

  // remove 함수
  const onRemove = useCallback(id => {
    dispatch({type: 'REMOVE', id})
  }, []);

  // checked: true 변경 함수
  const onToggle = useCallback(id => {
    dispatch({type: 'TOGGLE', id})
  }, []);

  return (
    <>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList
          todos={todos}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      </TodoTemplate>
    </>
  );
}

export default App;
