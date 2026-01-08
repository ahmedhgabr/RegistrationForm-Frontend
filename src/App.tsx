import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import BUEForm from './pages/BUEForm'
import UsersTable from './pages/UsersTable'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'

const sidebarWidthClass = 'w-64';

function AppContent() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'form' | 'users'>('form');

  const items = [
    { id: 'form', label: t('registrationForm') },
    { id: 'users', label: t('usersTable') },
  ];

  return (
    <>
      <Sidebar
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

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
