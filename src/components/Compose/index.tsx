import React, { FormEvent, useState } from 'react';
import './Compose.css';

type Props = {
  addMessage: Function;
}
export default function Compose(props: Props) {
  const [value, setValue] = useState('')
    const submit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.addMessage(value);
      setValue('');
    }
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }
    return (
        <form onSubmit={submit} className="compose">
        <input
          type="text"
          value={value}
          className="compose-input"
          placeholder="Aa"
          onChange={change}
        />
        </form>
    );
}