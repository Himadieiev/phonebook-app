import css from './ContactElement.module.css';

const ContactElement = ({ contact, onDeleteContact }) => {
  const getInitials = name => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className={css.card}>
      <div className={css.avatar}>
        <span className={css.initials}>{getInitials(contact.name)}</span>
      </div>

      <div className={css.info}>
        <span className={css.name}>{contact.name}</span>
        <span className={css.number}>{contact.number}</span>
      </div>

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
  );
};

export default ContactElement;
