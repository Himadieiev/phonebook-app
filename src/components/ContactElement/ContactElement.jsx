import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

import css from './ContactElement.module.css';

const ContactElement = ({ contact, onDeleteContact }) => {
  return (
    <p className={css.element}>
      <span className={css.name}>{contact.name}</span>
      <span className={css.tel}>{contact.number}</span>
      <button type="button" className={css.btnDelete} onClick={() => onDeleteContact(contact._id)}>
        <DeleteIcon className={css.icon} />
      </button>
    </p>
  );
};

ContactElement.propTypes = {
  contact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactElement;
