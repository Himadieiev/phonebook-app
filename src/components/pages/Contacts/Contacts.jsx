import css from './Contacts.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export default function Contacts() {
  return (
    <main className={css.contacts}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={css.subtitle}>Contacts</h2>
      <Filter />
      <ContactList />
    </main>
  );
}
