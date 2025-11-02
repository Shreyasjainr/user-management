import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import ContentHeader from './components/ContentHeader';
import Modal from './components/Modal';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import EmptyState from './components/EmptyState';
import { User, UserFormData, Country } from './types/user';
import { fetchUsers, fetchCountries, createUser, updateUser } from './services/api';
import './App.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  useEffect(() => {
    loadUsers();
    loadCountries();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  const loadCountries = async () => {
    try {
      const data = await fetchCountries();
      setCountries(data);
    } catch (error) {
      toast.error('Error fetching countries');
    }
  };

  const handleCreateUser = async (data: UserFormData) => {
    try {
          const userWithId = {
        ...data,
        id: String(Date.now()) 
      };
      const newUser = await createUser(userWithId);
      setUsers(prev => [...prev, newUser]);
      toast.success('User created successfully');
      closeModal();
    } catch (error) {
      toast.error('Error creating user');
    }
  };

  const handleUpdateUser = async (data: UserFormData) => {
    if (!selectedUser) return;

    try {
      const updatedUser = await updateUser(selectedUser.id, {
        ...selectedUser,
        ...data
      });
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id ? updatedUser : user
      ));
      toast.success('User updated successfully');
      closeModal();
    } catch (error) {
      toast.error('Error updating user');
    }
  };

  const openModal = (mode: 'create' | 'edit' | 'view', user?: User) => {
    setModalMode(mode);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getModalTitle = () => {
    switch (modalMode) {
      case 'create':
        return 'New User';
      case 'edit':
        return 'Edit User';
      case 'view':
        return 'View Details';
      default:
        return '';
    }
  };

  return (
    <Layout onNewUser={() => openModal('create')}>
      <ContentHeader />
      
      {users.length === 0 ? (
        <div className="px-8">
          <EmptyState onNewUser={() => openModal('create')} />
        </div>
      ) : (
        <UserList
          users={users}
          countries={countries}
          onView={(user) => openModal('view', user)}
          onEdit={(user) => openModal('edit', user)}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={getModalTitle()}
      >
        <UserForm
          user={selectedUser}
          onSubmit={modalMode === 'create' ? handleCreateUser : handleUpdateUser}
          onCancel={closeModal}
          isView={modalMode === 'view'}
          onEdit={() => selectedUser && openModal('edit', selectedUser)}
          onAddNew={() => openModal('create')}
        />
      </Modal>

      <ToastContainer />
    </Layout>
  );
}

export default App;

