import './App.css'
import Navbar from './components/Navbar'
import ClientList from './components/clientList'
import DebtList from './components/DebtList'
import AddEditClient from './components/AddEditClient'
import EmploymentHistoryList from './components/EmploymentHistoryList'
import BankAccountList from './components/BankAccountList'
import CreditSimulation from './components/CreditSimulation'
import DocumentList from './components/DocumentList'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className ="container">
        <Navbar></Navbar>
        <Routes>
          <Route path="/client/list" element={<ClientList />} />
          <Route path="/debts/:rut" element={<DebtList />} />
          <Route path="/client/add" element={<AddEditClient />} />
          <Route path="/client/edit/:id" element={<AddEditClient />} />
          <Route path="/employment/:rut" element={<EmploymentHistoryList />} />
          <Route path="/bankAccount/:rut" element={<BankAccountList />} />
          <Route path="/creditSimulation" element={<CreditSimulation />} />
          <Route path="/document/" element={<DocumentList />} />
          
        </Routes>
      </div>
    </Router>
  );
}


export default App;