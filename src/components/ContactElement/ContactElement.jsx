import { toast } from 'react-toastify';

import css from './ContactElement.module.css';

const ContactElement = ({ contact, onDeleteContact, onEditContact }) => {
  const getInitials = name => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(contact.number);
      toast.success('Phone number copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy number');
    }
  };

  return (
    <div className={css.card}>
      <div className={css.avatar}>
        <span className={css.initials}>{getInitials(contact.name)}</span>
      </div>

      <div className={css.info}>
        <span className={css.name}>{contact.name}</span>
        <div className={css.numberWrapper}>
          <span className={css.number}>{contact.number}</span>
          <button
            type="button"
            className={css.copyBtn}
            onClick={handleCopyNumber}
            aria-label="Copy number"
          >
            <svg
              className={css.copyIcon}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path
                d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.editBtn}
          onClick={() => onEditContact(contact)}
          aria-label="Edit contact"
        >
          <svg
            className={css.editIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M17 3L21 7L7 21H3V17L17 3Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={css.editText}>Edit</span>
        </button>

        <button
          type="button"
          className={css.deleteBtn}
          onClick={() => onDeleteContact(contact._id)}
          aria-label="Delete contact"
        >
          <svg
            className={css.deleteIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M4 7H20" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 11V16" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 11V16" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M9 7L9.5 3H14.5L15 7"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className={css.deleteText}>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default ContactElement;
