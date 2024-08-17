import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/common/page';
import { StoreStateType } from '../../store/store';
import { useParams } from 'react-router-dom';
import IContact from '../../types';
import { contactActions } from '../../store/contact-slice';
import ContactForm from '../../components/contacts/form';
import { toast } from 'react-toastify';

export default function EditContact() {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state: StoreStateType) => state.contact);
  const { contactId } = useParams();
  const contact = contacts.find((c) => c.id === contactId);

  const handleOnSave = (contact: IContact) => {
    dispatch(contactActions.editContact(contact));
    toast.success('Contact added successfully!');
  };

  return (
    <Page className="flex-col">
      <div className="text-xl font-semibold pb-2 text-primary border-b-[1px] border-b-dark-secondary/30 mb-10">
        Edit Contact
      </div>
      <ContactForm contact={contact} onSave={handleOnSave} />
    </Page>
  );
}
