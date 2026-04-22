import React, { useState } from 'react';
import { Edit, Search, Trash2, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import './RoleManagement.css';

import RoleIcon from '../assets/AdminAssets/Role-icon.png';
import SecurityIcon from '../assets/AdminAssets/Security-icon.png';
import UsersIcon from '../assets/AdminAssets/Users-icon.png';
import ActionsIcon from '../assets/AdminAssets/Actions-icon.png';
import Company from '../assets/AdminAssets/company-icon.png';
import Jobseeker from '../assets/AdminAssets/Jobseeker-icon.png';

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

// Mock data for the Employers Table View
const MOCK_EMPLOYERS = [
    { id: 1, company: 'Infosys', recruiter: 'SARAH CONNOR', status: 'SUBSCRIBER', date: 'Oct 24, 2026' },
    { id: 2, company: 'Wipro', recruiter: 'SARAH CONNOR', status: 'NON SUBSCRIBER', date: 'Oct 24, 2026' },
    { id: 3, company: 'CompuSoft', recruiter: 'SARAH CONNOR', status: 'NON SUBSCRIBER', date: 'Oct 24, 2026' },
    { id: 4, company: 'TATA', recruiter: 'SARAH CONNOR', status: 'SUBSCRIBER', date: 'Oct 24, 2026' },
    { id: 5, company: 'HCL', recruiter: 'SARAH CONNOR', status: 'SUBSCRIBER', date: 'Oct 24, 2026' },
    { id: 6, company: 'R&D Corp', recruiter: 'SARAH CONNOR', status: 'NON SUBSCRIBER', date: 'Oct 24, 2026' },
    { id: 7, company: 'Infosys', recruiter: 'SARAH CONNOR', status: 'NON SUBSCRIBER', date: 'Oct 24, 2026' },
    { id: 8, company: 'Infosys', recruiter: 'SARAH CONNOR', status: 'NON SUBSCRIBER', date: 'Oct 24, 2026' },
    { id: 9, company: 'Infosys', recruiter: 'SARAH CONNOR', status: 'SUBSCRIBER', date: 'Oct 24, 2026' },
];

export const RoleManagement = () => {
    const [activeView, setActiveView] = useState('roles');
    const [selectedRole, setSelectedRole] = useState('Employer');
    const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [editingEmployer, setEditingEmployer] = useState(null);

    const [legendAllowed, setLegendAllowed] = useState(true);
    const [legendNotAllowed, setLegendNotAllowed] = useState(false);

    const handleAddNewRole = () => {
        setIsAddModalOpen(true);
    };

    const handleSavePermissions = () => {
        alert(`Permissions for ${selectedRole} have been updated in the system.`);
    };

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
    const handleAction = (e, actionType, roleName) => {
        e.stopPropagation();
        if (actionType === 'edit') {
            if (roleName === 'Employer') {
                setActiveView('employersList');
            } else {
                alert(`Detailed list for ${roleName} is not yet implemented.`);
            }
        }
    };

    return (
        <div className="role-management">
            <header className="role-management__header">
                <div className="role-management__title-group">
                    <h1 className="role-management__h1">Role Management</h1>
                    <p className="role-management__subtitle">Define And Manage Access Control Layers For The Enterprise Ecosystem</p>
                </div>
            </header>

            {activeView === 'roles' ? (
                <>
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

                    <main className="role-management__content">
                        <div className="role-management__panel role-management__panel--left">
                            <div className="role-management__list">
                                <div className="role-management__list-header">
                                    <span>Role</span>
                                    <span className="text-center">User</span>
                                    <span className="text-center">Actions</span>
                                </div>
                                {INITIAL_ROLES.map((role) => (
                                    <div
                                        key={role.id}
                                        className={`role-management__item ${selectedRole === role.name ? 'role-management__item--active' : ''}`}
                                        onClick={() => setSelectedRole(role.name)}
                                    >
                                        <div className="role-management__role-info">
                                            <div className="role-management__role-icon" style={{ backgroundColor: role.color }}>
                                                <img src={role.img} alt={role.name} className="role-management__role-img" />
                                            </div>
                                            <div className="role-management__role-text">
                                                <strong className="role-management__role-name">{role.name}</strong>
                                                <span className="role-management__role-desc">{role.description}</span>
                                            </div>
                                        </div>
                                        <div className="role-management__user-count">{role.userCount}</div>
                                        <div className="role-management__item-actions">
                                            <Edit size={16} className="text-blue" onClick={(e) => handleAction(e, 'edit', role.name)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

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
                                <button className="role-management__btn--save" onClick={handleSavePermissions}>
                                    Edit Permissions
                                </button>
                            </div>
                        </div>
                    </main>
                </>
            ) : (
                <div className="employers-inner-view">
                    <button className="employers-back-btn" onClick={() => setActiveView('roles')}>
                        <ArrowLeft size={16} /> Back to Roles
                    </button>
                    <h2 className="employers-title">Employers</h2>

                    <div className="employers-search-container">
                        <Search className="employers-search-icon" size={18} />
                        <input type="text" placeholder="Search by name, email or Role" className="employers-search-input" />
                    </div>

                    <div className="employers-table-card">
                        <table className="employers-table">
                            <thead>
                                <tr>
                                    <th>COMPANY</th>
                                    <th>EMPLOYER/RECRUITER</th>
                                    {/* REMOVED .text-center from here */}
                                    <th>STATUS</th>
                                    <th>JOINED DATE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_EMPLOYERS.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>{emp.company}</td>
                                        <td>{emp.recruiter}</td>
                                        {/* REMOVED .text-center from here */}
                                        <td>
                                            <span className={`status-badge ${emp.status === 'SUBSCRIBER' ? 'badge-green' : 'badge-red'}`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td>{emp.date}</td>
                                        <td className="actions-cell">
                                            <button className="action-btn btn-edit" onClick={() => setEditingEmployer(emp)}>
                                                <Edit size={14} />
                                            </button>
                                            <button className="action-btn btn-delete"><Trash2 size={14} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="employers-pagination">
                            <span className="page-info">Page 1 of 150</span>
                            <div className="page-controls">
                                <button className="page-btn"><ChevronLeft size={16} /></button>
                                <button className="page-btn"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isAddModalOpen && (
                <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Add New Role</h3>
                        <input type="text" placeholder="Enter Role Name" className="role-management__input" />
                        <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ccc', cursor: 'pointer', background: 'white' }}>Cancel</button>
                            <button className="role-management__btn--save">Create</button>
                        </div>
                    </div>
                </div>
            )}

            {editingEmployer && (
                <div className="modal-overlay" onClick={() => setEditingEmployer(null)}>
                    <div className="modal-content permissions-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="role-management__panel-header">
                            <h2 className="role-management__h2">Permissions</h2>
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

                        <div className="role-management__footer" style={{ justifyContent: 'space-between', marginTop: '30px' }}>
                            <div className="role-management__legend">
                                <label className="role-management__legend-item">
                                    <input
                                        type="checkbox"
                                        className="role-management__checkbox"
                                        checked={legendAllowed}
                                        onChange={() => setLegendAllowed(!legendAllowed)}
                                    />
                                    Allowed
                                </label>
                                <label className="role-management__legend-item">
                                    <input
                                        type="checkbox"
                                        className="role-management__checkbox"
                                        checked={legendNotAllowed}
                                        onChange={() => setLegendNotAllowed(!legendNotAllowed)}
                                    />
                                    Not Allowed
                                </label>
                            </div>
                            <button
                                className="role-management__btn--save"
                                onClick={() => {
                                    handleSavePermissions();
                                    setEditingEmployer(null);
                                }}
                            >
                                Edit Permissions
                            </button>
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