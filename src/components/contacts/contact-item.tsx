import { DeleteRounded, EditRounded, InfoRounded } from '@mui/icons-material';
import IContact from '../../types';
import { useDispatch } from 'react-redux';
import React from 'react';
import { contactActions } from '../../store/contact-slice';
import { useNavigate } from 'react-router-dom';

// Returns date in format: January 19, 2022
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

export default function ContactItem({ contact, disableActions }: { contact: IContact; disableActions?: boolean }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, firstName, lastName, addedOn, isActive } = contact;

  const handleDeleteContact = React.useCallback(() => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    if (confirmDelete) {
      dispatch(contactActions.deleteContact(id!));
    }
  }, [dispatch, id]);

  const handleEditContact = React.useCallback(() => {
    navigate(`/contacts/edit/${id}`);
  }, [navigate, id]);

  const handleViewContact = React.useCallback(() => {
    navigate(`/contacts/${id}`);
  }, [navigate, id]);

  return (
    <div className="group flex flex-col rounded-lg border-2 border-gray-400 p-4 h-fit hover:border-primary transition-all shadow-none hover:shadow-md">
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-row w-full items-center gap-x-2 max-w-[90%] overflow-clip">
          <div className="text-lg text-dark-secondary font-semibold">{firstName || 'First Name'},</div>
          <div className="text-sm text-dark-secondary font-semilight">{lastName || 'Last Name'}</div>
        </div>
        <div className="flex flex-row items-center gap-x-1">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
          <div className={`text-sm font-semilight ${isActive ? 'text-green-500' : 'text-red-500'}`}>
            {isActive ? 'Active' : 'Inactive'}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="text-sm font-light mt-2">Added on: {getFormattedDate(addedOn)}</div>
        {!disableActions && (
          <div className="flex flex-row gap-x-3 text-dark-secondary group-hover:opacity-100 opacity-0 transition-all duration-200">
            <button onClick={handleViewContact}>
              <InfoRounded fontSize="small" />
            </button>
            <button onClick={handleEditContact}>
              <EditRounded fontSize="small" />
            </button>
            <button onClick={handleDeleteContact}>
              <DeleteRounded fontSize="small" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
