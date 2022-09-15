import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import './TodoList.scss';
import TodoListItem from './TodoListItem';

function TodoList({todos, onRemove, onToggle}) {
  // useCallback으로 rowRenderer 선언
  // rowRenderer를 List의 props로 꼭 넣어줘야함
  const rowRenderer = useCallback(({index, key, style}) => {
    const todo = todos[index];
    return (
      <TodoListItem
        todo={todo}
        key={key}
        onRemove={onRemove}
        onToggle={onToggle}
        style={style}
      />
    );
  }, [onRemove, todos, onToggle])
  return (
    // List의 전체 크기, 각 항목의 높이, 각 항목을 렌더링 할 때 사용하는 함수(rowRenderer), 배열을 props로 넣어주면 자동 최적화
    <List
      className='TodoList'
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{outline: 'none'}} // List에 기본 적용되는 outline 스타일 제거
    />
  )
}

export default React.memo(TodoList); // React.memo 추가