import { useSelector } from 'react-redux';
import { StoreStateType } from '../../store/store';
import { useParams } from 'react-router-dom';
import Page from '../../components/common/page';

const getFormattedDate = (date?: Date) => {
  if (!date) {
    date = new Date();
  } else {
    date = new Date(date);
  }
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export default function ViewContact() {
  const { contacts } = useSelector((state: StoreStateType) => state.contact);
  const { contactId } = useParams();
  const contact = contacts.find((c) => c.id === contactId);

  return (
    <Page className="flex-col">
      <div className="text-xl font-semibold pb-2 text-primary border-b-[1px] border-b-dark-secondary/30 mb-10">
        Contact Details
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex-row">
          <span className="text-dark-secondary font-semibold">ID: </span>
          <span>{contact?.id}</span>
        </div>
        <div className="w-full flex-row">
          <span className="text-dark-secondary font-semibold">First Name: </span>
          <span>{contact?.firstName}</span>
        </div>
        <div className="w-full flex-row">
          <span className="text-dark-secondary font-semibold">Last Name: </span>
          <span>{contact?.lastName}</span>
        </div>
        <div className="w-full flex-row">
          <span className="text-dark-secondary font-semibold">Is Active: </span>
          <span>{contact?.isActive ? 'Yes' : 'No'}</span>
        </div>
        <div className="w-full flex-row">
          <span className="text-dark-secondary font-semibold">Added On: </span>
          <span>{getFormattedDate(contact?.addedOn)}</span>
        </div>
      </div>
    </Page>
  );
}
