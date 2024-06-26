import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import ContactElement from 'components/ContactElement/ContactElement';
import Loader from 'components/Loader/Loader';
import { getStateContacts } from 'redux/Contacts/selectors';
import { deleteContactThunk, getContactsThunk } from 'redux/Contacts/thunks';

import css from './ContactList.module.css';

const ContactList = () => {
  const filter = useSelector(state => state.filter.value);
  const contacts = useSelector(state => state.contacts.items);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizedFilter));
  };

  const filteredContacts = getFilteredContacts();

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getStateContacts);

  const handleDeleteContact = async contactId => {
    await dispatch(deleteContactThunk(contactId));
    await dispatch(getContactsThunk());
  };

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [contacts.length, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <b>{error}</b>}
      {!isLoading &&
        (filteredContacts.length > 0 ? (
          <ul className={css.list}>
            {filteredContacts.map(item => (
              <li key={item._id}>
                <ContactElement contact={item} onDeleteContact={handleDeleteContact} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={css.text}>No contacts...</p>
        ))}
    </>
  );
};

export default ContactList;
