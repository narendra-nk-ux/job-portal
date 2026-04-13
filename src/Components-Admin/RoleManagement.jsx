import React, { useState } from 'react';
import { Edit, Trash2, Search } from 'lucide-react';
import './RoleManagement.css';
import RoleIcon from '../assets/AdminAssets/Role-icon.png'
import SecurityIcon from '../assets/AdminAssets/Security-icon.png'
import UsersIcon from '../assets/AdminAssets/Users-icon.png'
import ActionsIcon from '../assets/AdminAssets/Actions-icon.png'

import Company from '../assets/AdminAssets/company-icon.png'
import Jobseeker from '../assets/AdminAssets/Jobseeker-icon.png'

const INITIAL_ROLES = [
    { id: 1, name: 'Candidate', description: 'Job seeker: Search jobs...', userCount: 370, color: '#dcfce7', textColor: '#166534', img: Jobseeker },
    { id: 2, name: 'Employer', description: 'Company representative...', userCount: 85, color: '#f3e8ff', textColor: '#6b21a8', img: Company },
];

const INITIAL_PERMISSIONS = {
    Candidate: {
        Dashboard: { read: true, create: false, update: true, delete: false },
        Jobs: { read: true, create: false, update: false, delete: false },
        Applicants: { read: false, create: false, update: false, delete: false },
        Users: { read: true, create: false, update: true, delete: false },
        Reports: { read: false, create: false, update: false, delete: false },
        Company: { read: true, create: false, update: false, delete: false },
    },
    Employer: {
        Dashboard: { read: true, create: false, update: true, delete: false },
        Jobs: { read: false, create: true, update: true, delete: false },
        Applicants: { read: true, create: true, update: false, delete: false },
        Users: { read: true, create: false, update: true, delete: false },
        Reports: { read: false, create: true, update: false, delete: true },
        Company: { read: false, create: false, update: true, delete: true },
    },
};

export const RoleManagement = () => {
    const [selectedRole, setSelectedRole] = useState('Employer');
    const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // FLOW 1: Handle "Add New Role" Action
    const handleAddNewRole = () => {
        setIsAddModalOpen(true);
        // In a real app, this would open a form to name the role and set initial perms
        console.log("Opening Add Role Modal...");
    };

    // FLOW 2: Handle "Edit Permissions" Save Action
    const handleSavePermissions = () => {
        console.log(`Saving updated permissions for ${selectedRole}:`, permissions[selectedRole]);
        alert(`Permissions for ${selectedRole} have been updated in the system.`);
    };

    // FLOW 3: Permission Toggle Logic (Existing)
    const handleToggle = (module, action) => {
        setPermissions(prev => ({
            ...prev,
            [selectedRole]: {
                ...prev[selectedRole],
                [module]: {
                    ...prev[selectedRole][module],
                    [action]: !prev[selectedRole][module][action]
                }
            }
        }));
    };
    // FLOW 4: Row Action Handling (Edit/Delete icons)
    const handleAction = (e, actionType, roleName) => {
        e.stopPropagation(); // Prevents triggering the row selection
        if (actionType === 'delete') {
            if (window.confirm(`Are you sure you want to delete the ${roleName} role?`)) {
                console.log(`Deleting role: ${roleName}`);
            }
        } else {
            console.log(`Editing details for: ${roleName}`);
        }
    };

    return (
        <div className="role-management">
            {/* 1. Header */}
            <header className="role-management__header">
                <div className="role-management__title-group">
                    <h1 className="role-management__h1">Role Management</h1>
                    <p className="role-management__subtitle">Define And Manage Access Control Layers For The Enterprise Ecosystem</p>
                </div>
                {/* <div className="role-management__user-nav">
                    <Bell className="role-management__icon--bell" />
                    <div className="role-management__profile">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Naveen" alt="User" className="role-management__avatar" />
                        <span className="role-management__user-name">Narendra</span>
                        <ChevronDown size={14} />
                    </div>
                </div> */}
            </header>

            {/* 2. Stats Grid */}
            <section className="role-management__stats">
                <StatCard icon={RoleIcon} label="Total roles" val="5" trend="+1 this month" type="blue" />
                <StatCard icon={UsersIcon} label="Total users" val="568" trend="+12 this month" type="orange" />
                <StatCard icon={SecurityIcon} label="Permissions" val="6" trend="24 Modules" type="green" />
                <StatCard icon={ActionsIcon} label="Recent actions" val="5" trend="2 days ago" type="red" />
            </section>

            <div className="role-management__action-bar">
                <button className="role-management__btn--add" onClick={handleAddNewRole} >
                    + Add New Roles
                </button>
            </div>

            <div className="role-management__search-container">
                <Search className="role-management__search-icon" size={18} />
                <input type="text" className="role-management__input" placeholder="Search specific roles..." />
            </div>

            {/* 3. Main Content Split */}
            <main className="role-management__content">
                {/* Left List */}
                <div className="role-management__panel role-management__panel--left">


                    <div className="role-management__list">
                        <div className="role-management__list-header">
                            <span>Role</span>
                            <span className="text-center">User</span>
                            <span className="text-right">Actions</span>
                        </div>
                        {INITIAL_ROLES.map((role) => (
                            <div
                                key={role.id}
                                className={`role-management__item ${selectedRole === role.name ? 'role-management__item--active' : ''}`}
                                onClick={() => setSelectedRole(role.name)}
                            >
                                <div className="role-management__role-info">
                                    <div className="role-management__role-icon" style={{ backgroundColor: role.color }}>
                                        <img
                                            src={role.img}
                                            alt={role.name}
                                            className="role-management__role-img"
                                        />
                                    </div>
                                    <div className="role-management__role-text">
                                        <strong className="role-management__role-name">{role.name}</strong>
                                        <span className="role-management__role-desc">{role.description}</span>
                                    </div>
                                </div>
                                <div className="role-management__user-count">{role.userCount}</div>
                                <div className="role-management__item-actions">
                                    <Edit size={16} className="text-blue" onClick={(e) => handleAction(e, 'edit', role.name)} />
                                    <Trash2 size={16} className="text-red" onClick={(e) => handleAction(e, 'delete', role.name)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Matrix */}
                <div className="role-management__panel role-management__panel--right">
                    <div className="role-management__panel-header">
                        <h2 className="role-management__h2">Permissions</h2>
                        <div className="role-management__select-wrapper">
                            <span className="role-management__label">Select Role:</span>
                            <select
                                className="role-management__select"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <option value="Employer">Employer</option>
                                <option value="Candidate">Candidate</option>
                            </select>
                        </div>
                    </div>

                    <table className="role-management__table">
                        <thead>
                            <tr>
                                <th>Module</th>
                                <th>Read</th>
                                <th>Create</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(permissions[selectedRole]).map((mod) => (
                                <tr key={mod}>
                                    <td className="role-management__module-name">{mod}</td>
                                    {['read', 'create', 'update', 'delete'].map(act => (
                                        <td key={act} className="text-center">
                                            <input
                                                type="checkbox"
                                                className="role-management__checkbox"
                                                checked={permissions[selectedRole][mod][act]}
                                                onChange={() => handleToggle(mod, act)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="role-management__footer">
                        <div className="role-management__legend">
                            <span className="role-management__legend-item"><i className="bg-blue"></i> Allowed</span>
                            <span className="role-management__legend-item"><i className="border-gray"></i> Not Allowed</span>
                        </div>
                        <button className="role-management__btn--save" onClick={handleSavePermissions}
                        >
                            Edit Permissions
                        </button>
                    </div>
                </div>
            </main>
            {/* Minimal Add Role Modal UI Example */}
            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add New Role</h3>
                        <input type="text" placeholder="Enter Role Name" className="role-management__input" />
                        <div className="modal-actions">
                            <button onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                            <button className="role-management__btn--add">Create</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ icon, label, val, trend, type }) {
    return (
        <div className="role-management__stat-card">
            <div className={`role-management__stat-icon role-management__stat-icon--${type}`}>
                <img src={icon} alt={label} className="role-management__stat-img" />
            </div>
            <div className="role-management__stat-data">
                <span className="role-management__stat-value">{val}</span>
                <span className="role-management__stat-label">{label}</span>
                <span className="role-management__stat-trend">{trend}</span>
            </div>
        </div>
    );
}