import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import BUEForm from './pages/BUEForm'
import UsersTable from './pages/UsersTable'

const sidebarWidthClass = 'w-64';

function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'users'>('form');

  const items = [
    { id: 'form', label: 'Registration Form' },
    { id: 'users', label: 'Users Table' },
  ];

  return (
    <>
      <Sidebar
        title="BUE System"
        items={items}
        activeId={activeTab}
        onSelect={(id) => setActiveTab(id as 'form' | 'users')}
        widthClassName={sidebarWidthClass}
      />
      <div className="min-h-screen" style={{ marginLeft: '16rem' }}>
        {activeTab === 'form' ? <BUEForm /> : <UsersTable />}
      </div>
    </>
  )
}

export default App
