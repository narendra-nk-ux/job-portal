import React, { useState, useMemo } from 'react';
import { Edit, Trash2, Search, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import './RolePermission.css';

// Mock Assets
import RoleIcon from '../assets/AdminAssets/Role-icon.png'
import SecurityIcon from '../assets/AdminAssets/Security-icon.png'
import UsersIcon from '../assets/AdminAssets/Users-icon.png'
import ActionsIcon from '../assets/AdminAssets/Actions-icon.png'

const MOCK_DATA = {
    Employer: [
        { id: 1, company: 'Infosys', name: 'SARAH CONNOR', status: 'SUBSCRIBER', date: 'Oct 24, 2026' },
        { id: 2, company: 'Wipro', name: 'SARAH CONNOR', status: 'NON SUBSCRIBER', date: 'Oct 24, 2026' },
        { id: 3, company: 'CompuSoft', name: 'SARAH CONNOR', status: 'NON SUBSCRIBER', date: 'Oct 24, 2026' },
        { id: 4, company: 'TATA', name: 'SARAH CONNOR', status: 'SUBSCRIBER', date: 'Oct 24, 2026' },
        { id: 5, company: 'HCL', name: 'SARAH CONNOR', status: 'SUBSCRIBER', date: 'Oct 24, 2026' },
        { id: 6, company: 'R&D Corp', name: 'SARAH CONNOR', status: 'NON SUBSCRIBER', date: 'Oct 24, 2026' },
    ],
    Candidate: [
        { id: 7, company: 'N/A', name: 'JOHN DOE', status: 'SUBSCRIBER', date: 'Nov 12, 2026' },
        { id: 8, company: 'N/A', name: 'JANE SMITH', status: 'NON SUBSCRIBER', date: 'Nov 15, 2026' },
    ]
};

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

export const RolePermission = () => {
    const [view, setView] = useState('management'); 
    const [selectedRole, setSelectedRole] = useState('Employer'); 
    const [searchQuery, setSearchQuery] = useState('');
    const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS);

    // Filter Logic
    const filteredData = useMemo(() => {
        const data = MOCK_DATA[selectedRole] || [];
        if (!searchQuery) return data;
        return data.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.company.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [selectedRole, searchQuery]);

    const handleToggle = (module, action) => {
        setPermissions(prev => ({
            ...prev,
            [selectedRole]: {
                ...prev[selectedRole],
                [module]: { ...prev[selectedRole][module], [action]: !prev[selectedRole][module][action] }
            }
        }));
    };

    return (
        <div className="rolepermission">
            <header className="role-management__header">
                <div className="role-management__title-group">
                    <h1 className="role-management__h1">Role Management</h1>
                    <p className="role-management__subtitle">Manage Access Control Layers For The Enterprise Ecosystem</p>
                </div>
            </header>

            {view === 'management' ? (
                <div className="main-dashboard-view">
                    <section className="role-management__stats">
                        <StatCard icon={RoleIcon} label="Total roles" val="5" type="blue" />
                        <StatCard icon={UsersIcon} label="Total users" val="568" type="orange" />
                        <StatCard icon={SecurityIcon} label="Permissions" val="6" type="green" />
                        <StatCard icon={ActionsIcon} label="Recent actions" val="5" type="red" />
                    </section>

                    <div className="center-action-btn">
                        <button className="btn-edit-main" onClick={() => setView('details')}>
                            Go to Details Table
                        </button>
                    </div>
                </div>
            ) : (
                <div className="details-view-container">
                    <div className="details-view-header">
                        <button className="back-link" onClick={() => setView('management')}>
                            <ArrowLeft size={16} /> Dashboard
                        </button>
                        <h1 className="central-title">{selectedRole}s</h1>
                        
                        <div className="top-right-filter">
                            <span>Filter by:</span>
                            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                                <option value="Employer">Employer</option>
                                <option value="Candidate">Candidate</option>
                            </select>
                        </div>
                    </div>

                    <div className="search-bar-wrapper">
                        <Search className="search-icon-gray" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name, email or Role" 
                            className="main-search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="table-card-wrapper">
                        <table className="design-table">
                            <thead>
                                <tr>
                                    <th>COMPANY</th>
                                    <th>{selectedRole.toUpperCase()}/RECRUITER</th>
                                    <th>STATUS</th>
                                    <th>JOINED DATE</th>
                                    <th className="text-center">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.id}>
                                        <td className="company-cell">{item.company}</td>
                                        <td className="name-cell">{item.name}</td>
                                        <td>
                                            <span className={`pill-status ${item.status === 'SUBSCRIBER' ? 'sub-green' : 'sub-red'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>{item.date}</td>
                                        <td className="actions-cell">
                                            <div className="flex-actions">
                                                <div className="icon-wrapper blue-bg"><Edit size={14} /></div>
                                                <div className="icon-wrapper red-bg"><Trash2 size={14} /></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="table-pagination">
                            <span>Page 1 of 150</span>
                            <div className="arrow-group">
                                <ChevronLeft size={18} />
                                <ChevronRight size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <hr className="divider" />

            {/* Matrix Section */}
            <div className="permission-matrix-box">
                <div className="matrix-top">
                    <h3>Permissions Management</h3>
                </div>
                <table className="matrix-table">
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
                        {permissions[selectedRole] && Object.keys(permissions[selectedRole]).map((mod) => (
                            <tr key={mod}>
                                <td>{mod}</td>
                                {['read', 'create', 'update', 'delete'].map(act => (
                                    <td key={act} className="text-center">
                                        <input
                                            type="checkbox"
                                            checked={permissions[selectedRole][mod][act]}
                                            onChange={() => handleToggle(mod, act)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

function StatCard({ icon, label, val, type }) {
    return (
        <div className="role-management__stat-card">
            <div className={`role-management__stat-icon role-management__stat-icon--${type}`}>
                <img src={icon} alt={label} />
            </div>
            <div className="role-management__stat-data">
                <span className="role-management__stat-value">{val}</span>
                <span className="role-management__stat-label">{label}</span>
            </div>
        </div>
    );
}