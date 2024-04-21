import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

import css from './ElementContacts.module.css';

export function ElementContacts({ contact, onDeleteContact }) {
  return (
    <p className={css.element}>
      <span className={css.name}>{contact.name}</span>
      <span className={css.tel}>{contact.number}</span>
      <button type="button" className={css.btnDelete} onClick={() => onDeleteContact(contact._id)}>
        <DeleteIcon className={css.icon} />
      </button>
    </p>
  );
}

ElementContacts.propTypes = {
  contact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
