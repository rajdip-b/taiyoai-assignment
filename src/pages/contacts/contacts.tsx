import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Page from '../../components/common/page';
import ContactItem from '../../components/contacts/contact-item';
import Button from '../../components/common/button';
import { AddRounded } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';
import { StoreStateType } from '../../store/store';

function AddContactButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="w-fit flex flex-row items-center gap-x-1">
      <AddRounded fontSize="small" />
      <div>Create Contact</div>
    </Button>
  );
}

export default function Contact() {
  const location = useLocation();
  const navigate = useNavigate();
  const { contacts } = useSelector((state: StoreStateType) => state.contact);

  const navigateToAddContact = React.useCallback(() => {
    navigate('/contacts/add');
  }, [navigate]);

  return (
    <>
      {location.pathname === '/contacts/' || location.pathname === '/contacts' ? (
        <Page className="flex-col gap-y-10">
          <div className="flex w-full items-center justify-between border-b-[1px] border-b-dark-secondary/30 mb-5 pb-2">
            <div className="text-xl font-semibold text-primary ">Contacts</div>
            <AddContactButton onClick={navigateToAddContact} />
          </div>
          {contacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-fit">
              {contacts.map((c, i) => (
                <ContactItem
                  key={i}
                  firstName={c.firstName}
                  lastName={c.lastName}
                  isActive={c.isActive}
                  addedOn={c.addedOn}
                  id={c.id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-5 items-center justify-center">
              <div className="text-xl text-dark-secondary/40 ">No contacts found</div>
              <AddContactButton onClick={navigateToAddContact} />
            </div>
          )}
        </Page>
      ) : (
        <Outlet />
      )}
    </>
  );
}
