import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, changeService, fetchService } from '../actions/actionCreators.js';

export default function ServiceChange(props) {
  const {match, history} = props;
  const { item, chLoading, chError} = useSelector((state) => state.serviceChange);
  const { loading, error } = useSelector((state) => state.serviceList);
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useDispatch();

  const id = Number(match.params.id);

  useEffect (() => {
    if (!firstLoad && !chLoading) {
      history.goBack();
    }
    if (firstLoad) {
      setFirstLoad(false);
      fetchService(dispatch, id);
    }

  },[dispatch, chLoading])

  const handleSubmit = (event) => {
    event.preventDefault();
    changeService(dispatch, 
      id,
      item.name,
      item.price,
      item.content,
    );
  }

  const handleCancel = () => {
    history.goBack();
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    dispatch(changeServiceField(name, value))
  }

  const handleBack = () => {
    history.goBack();
  };

  if (loading) {
    return <div className='loading'></div>
  }

  if (error) {
    return (
      <div>
        <div>Произошла ошибка!</div>
        <div onClick={handleBack}>Назад</div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} disabled={chLoading}>
        <label>Название
          <input name='name' onChange={handleChange} value={item.name} />
        </label>
        <label>Стоимость
          <input name='price' onChange={handleChange} value={item.price} />
        </label>
        <label>Описание
          <input name='content' onChange={handleChange} value={item.content} />
        </label>
        <button type='button'onClick={handleCancel}>Отмена</button>
        {!chLoading && <button type='submit'>Сохранить</button>}
      </form>
      {chLoading && <div className='loading'></div>}
      {chError && <p>{chError.message}</p>}
    </React.Fragment>
  )
}
