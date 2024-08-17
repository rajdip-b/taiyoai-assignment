import { useDispatch } from 'react-redux';
import Page from '../../components/common/page';
import ContactForm from '../../components/contacts/form';
import IContact from '../../types';
import { contactActions } from '../../store/contact-slice';
import { toast } from 'react-toastify';

export default function AddContact() {
  const dispatch = useDispatch();

  const handleOnSave = (contact: IContact) => {
    dispatch(contactActions.addContact(contact));

    toast.success('Contact added successfully!');
  };

  return (
    <Page className="flex-col">
      <div className="text-xl font-semibold pb-2 text-primary border-b-[1px] border-b-dark-secondary/30 mb-10">
        Add a contact
      </div>
      <ContactForm onSave={handleOnSave} />
    </Page>
  );
}
