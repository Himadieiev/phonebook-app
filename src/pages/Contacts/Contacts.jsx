import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';

import css from './Contacts.module.css';

const Contacts = () => {
  return (
    <div className={css.container}>
      <div className={css.hero}>
        <div className={css.badge}>
          <span className={css.badgeText}>
            <span className={css.badgeIcon}>📞</span> Your Contacts
          </span>
        </div>

        <h1 className={css.title}>
          Manage your<span className={css.gradient}> Phonebook</span>
        </h1>

        <p className={css.description}>
          Add, edit, and organize your contacts in one place
        </p>
      </div>

      <div className={css.content}>
        <ContactForm />
        <Filter />
        <ContactList />
      </div>
    </div>
  );
};

export default Contacts;
