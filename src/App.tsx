import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/common/sidebar';
import Navbar from './components/common/navbar';
import ChartsAndMaps from './pages/charts-and-maps';
import Contacts from './pages/contacts/contacts';
import AddContact from './pages/contacts/add-contact';
import ToastCard from './components/common/toast-card';
import EditContact from './pages/contacts/edit-contact';
import ViewContact from './pages/contacts/view-contact';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastCard>
        <div className="font-nunito flex flex-col w-screen h-screen">
          <Navbar />
          <BrowserRouter>
            <div className="flex flex-row w-screen">
              <Sidebar />
              <Routes>
                <Route path="/" element={<Navigate to="/contacts" />} />
                <Route path="contacts" element={<Contacts />}>
                  <Route path="add" element={<AddContact />} />
                  <Route path=":contactId" element={<ViewContact />} />
                  <Route path="edit/:contactId" element={<EditContact />} />
                </Route>
                <Route path="charts-and-maps" element={<ChartsAndMaps />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </ToastCard>
    </QueryClientProvider>
  );
}

export default App;
