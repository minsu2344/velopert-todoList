import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

function TodoListItem({todo, onRemove, onToggle, style}) {
  const {id, text, checked} = todo;
  return (
    // TodoListItem-virtualized로 묶어줌
    <div className="TodoListItem-virtualized" style={style}>
      <div className='TodoListItem'>
        <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className='text'>{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  )
}

export default React.memo(TodoListItem);