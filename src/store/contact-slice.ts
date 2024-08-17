import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IContact from '../types';

interface ContactSliceInitialState {
  contacts: IContact[];
}

const initialState: ContactSliceInitialState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: 'taiyo-assignment',
  initialState,
  reducers: {
    addContact(state: ContactSliceInitialState, action: PayloadAction<IContact>) {
      state.contacts.push(action.payload);
    },
    editContact(state: ContactSliceInitialState, action: PayloadAction<IContact>) {
      state.contacts = state.contacts.map((c) => (c.id === action.payload.id ? action.payload : c));
    },
    deleteContact(state: ContactSliceInitialState, action: PayloadAction<string>) {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload);
    },
  },
});

const contactActions = contactSlice.actions;
const contactReducer = contactSlice.reducer;

export { contactActions, contactReducer };
export type { ContactSliceInitialState };
