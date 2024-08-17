import React, { useState } from 'react';
import Input from '../common/input';
import Switch from '../common/switch';
import Button from '../common/button';
import ContactItem from './contact-item';
import { useNavigate } from 'react-router-dom';
import IContact from '../../types';
import { v4 } from 'uuid';
import { z } from 'zod';
import { toast } from 'react-toastify';

// Zod schema for validating the form
const contactSchema = z.object({
  firstName: z.string().refine((value) => value.length > 0, { message: 'First name is required' }),
  lastName: z.string().refine((value) => value.length > 0, { message: 'Last name is required' }),
});

export default function ContactForm({ onSave, contact }: { onSave: (contact: IContact) => void; contact?: IContact }) {
  // Form to save the contact
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    isActive: boolean;
  }>({
    firstName: contact?.firstName || '',
    lastName: contact?.lastName || '',
    isActive: contact?.isActive || false,
  });

  const navigate = useNavigate();

  // Update the form
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm({
      ...form,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });

  // Parses the form into a type that can be persisted
  // in redux
  const getPersistableContact = React.useCallback(() => {
    // Parse using zod
    const { error } = contactSchema.safeParse(form);
    if (error) {
      error.issues.forEach(({ message }) => toast.error(message));
      return;
    }

    // If parsing is successful, create a persistable contact
    let persistentContact: IContact = {
      ...form,
      id: contact?.id || v4(),
      addedOn: contact?.addedOn || new Date(),
    };

    return persistentContact;
  }, [form, contact]);

  const handleCancelClick = React.useCallback(() => navigate(-1), [navigate]);

  const handleSaveClick = React.useCallback(() => {
    const contact = getPersistableContact();
    if (contact) {
      onSave(contact);
      navigate(-1);
    }
  }, [onSave, getPersistableContact, navigate]);

  return (
    <div className="flex flex-col gap-y-5 lg:w-[40%] md:w-[60%] w-full">
      <Input name="firstName" type="text" placeholder="First Name" value={form.firstName} onChange={onChange} />
      <Input name="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={onChange} />
      <Switch name="isActive" value={form.isActive} title="Active" onChange={onChange} />
      <div className="flex flex-col md:flex-row gap-3">
        <Button onClick={handleCancelClick} text="Cancel" type="secondary" className="md:w-[50%]" />
        <Button onClick={handleSaveClick} text="Save" className="md:w-[50%]" />
      </div>
      <div className="flex flex-col w-full">
        <div className="text-lg text-dark-secondary">Preview</div>
        <ContactItem contact={form} disableActions={true} />
      </div>
    </div>
  );
}
