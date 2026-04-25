import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/Filter/filterSlice';

import css from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(state => state.filter.value);
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <div className={css.filter}>
      <label className={css.label}>
        <svg
          className={css.icon}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span>Find contacts by name</span>
      </label>
      <input
        className={css.input}
        value={filter}
        onChange={handleChange}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default Filter;
