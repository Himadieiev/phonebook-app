import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import css from './Filter.module.css';
import { setFilter } from 'redux/Filter/filterSlice';

export function Filter() {
  const filter = useSelector(state => state.filter.value);
  const dispatch = useDispatch();
  const handleChange = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <div className={css.filter}>
      <label className={css.label}>
        Find contacts by name
        <br />
        <input
          className={css.input}
          value={filter}
          onChange={handleChange}
          type="text"
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
