import { useCallback, useState } from 'react';
import {MdAdd} from 'react-icons/md';
import './TodoInsert.scss';

function TodoInsert({onInsert}) {
  const [value, setValue] = useState('');

  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(e => {
    e.preventDefault(); // submit 새로고침 방지
    onInsert(value);
    setValue(''); // value값 초기화
  }, [value, onInsert]);

  return (
    <form className='TodoInsert' onSubmit={onSubmit}>
      <input
        placeholder='할 일을 입력하세요'
        onChange={onChange}
        value={value}  
      />
      <button type='submit'>
        <MdAdd />
      </button>
    </form>
  )
}

export default TodoInsert;