import React, { useCallback, useRef, useState } from 'react';
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

function App() {
  const [todos, setTodos] = useState(createBulkTodos);

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
    setTodos(todos => todos.concat(todo));
    nextId.current++;
  }, []);

  // remove 함수
  const onRemove = useCallback(id => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }, []);

  // checked: true 변경 함수
  const onToggle = useCallback(id => {
    setTodos(todos => todos.map(todo => 
      todo.id === id ? {...todo, checked: true} : todo
    ))
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
