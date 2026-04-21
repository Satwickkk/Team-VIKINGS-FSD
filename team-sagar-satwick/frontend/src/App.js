import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar       from './components/Navbar';
import Home         from './pages/Home';
import AddMember    from './pages/AddMember';
import ViewMembers  from './pages/ViewMembers';
import MemberDetails from './pages/MemberDetails';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/add"        element={<AddMember />} />
        <Route path="/members"    element={<ViewMembers />} />
        <Route path="/members/:id" element={<MemberDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
