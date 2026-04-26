import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import EditContactModal from 'components/EditContactModal/EditContactModal';
import ContactElement from 'components/ContactElement/ContactElement';
import Loader from 'components/Loader/Loader';
import { getStateContacts } from 'redux/Contacts/selectors';
import { deleteContactThunk, getContactsThunk } from 'redux/Contacts/thunks';

import css from './ContactList.module.css';

const ContactList = () => {
  const [editingContact, setEditingContact] = useState(null);

  const filter = useSelector(state => state.filter.value);
  const contacts = useSelector(state => state.contacts.items);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getStateContacts);

  const handleDeleteContact = async contactId => {
    try {
      await dispatch(deleteContactThunk(contactId)).unwrap();
      toast.success('Contact deleted successfully');
      await dispatch(getContactsThunk());
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete contact');
    }
  };

  const handleEditContact = contact => {
    setEditingContact(contact);
  };

  const handleUpdateComplete = () => {
    dispatch(getContactsThunk());
  };

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className={css.error}>{error}</div>;
  }

  if (filteredContacts.length === 0) {
    return (
      <div className={css.empty}>
        <p className={css.emptyText}>
          {filter
            ? 'No matching contacts found'
            : 'No contacts yet. Add your first contact!'}
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className={css.list}>
        {filteredContacts.map(item => (
          <li key={item._id}>
            <ContactElement
              contact={item}
              onDeleteContact={handleDeleteContact}
              onEditContact={handleEditContact}
            />
          </li>
        ))}
      </ul>

      {editingContact && (
        <EditContactModal
          contact={editingContact}
          onClose={() => setEditingContact(null)}
          onUpdate={handleUpdateComplete}
        />
      )}
    </>
  );
};

export default ContactList;
