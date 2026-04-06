import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './Billing.css';
import FileIcon from '../assets/Billing/File_icon.png';
import DeleteIcon from '../assets/Billing/Delete_icon.png';
import { MembershipPlans } from './MembershipPlans';


export const BillingSec = ({ onUpgradeClick }) => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planStatus, setPlanStatus] = useState('ACTIVE');

  const billingHistory = [
    { plan: 'PREMIUM / ENTERPRISE', date: 'MARCH 10, 2026', price: '₹ 4999 /-', status: 'ACTIVE', invoice: '#1831' },
    { plan: 'PRO / STANDARD +', date: 'FEBRUARY 10, 2026', price: '₹ 1999 /-', status: 'EXPIRED', invoice: '#1832' },
    { plan: 'BUSINESS / PRO', date: 'FEBRUARY 05, 2026', price: '₹ 2999 /-', status: 'PENDING', invoice: '#1833' },
    { plan: 'BASIC / STARTER', date: 'JANUARY 02, 2026', price: '₹ 599 /-', status: 'ON-HOLD', invoice: '#1834' },
    { plan: 'PRO / STANDARD', date: 'JANUARY 10, 2026', price: '₹ 1299 /-', status: 'EXPIRED', invoice: '#1835' },
    { plan: 'BASIC / STARTER', date: 'DECEMBER 10, 2026', price: '₹ 599 /-', status: 'EXPIRED', invoice: '#1836' },
    { plan: 'FREE / FREEMIUM', date: 'DECEMBER 10, 2026', price: '₹ 0 /-', status: 'CANCELLED', invoice: '#1837' },
    { plan: 'FREE / FREEMIUM', date: 'NOVEMBER 10, 2026', price: '₹ 0 /-', status: 'EXPIRED', invoice: '#1838' },
  ];

  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  const handleConfirmCancellation = () => {
    setTimeout(() => {
      setPlanStatus('CANCELLED');
      setIsModalOpen(false);
      alert("Subscription cancelled successfully.");
    }, 1000);
  };

  const handleUpgradeRedirect = () => {
  navigate('/Job-portal/Employer/Membership');
};

  const handleReactivate = () => {
    setPlanStatus('ACTIVE');
  };

  return (
    <div className="Billing-container">
      {/* Header */}
      <div className="Billing-card Billing-header-card">
        <h2 className="Billing-title-main">Plans & Billing</h2>
        <p className="Billing-subtitle">Manage your details and personal preferences here</p>
      </div>

      {/* Current Plan */}
      <div className="Billing-card Billing-current-plan-card">
        <div className="Billing-plan-info">
          <p className="Billing-section-label">Current Plan</p>
          <div className="Billing-plan-title-row">
            <h3 className="Billing-plan-name-main">Premium / Enterprise</h3>
            <span className={`Billing-badge Billing-badge-${planStatus.toLowerCase()}`}>
              {planStatus}
            </span>
          </div>
          <p className="Billing-plan-desc">Providing the core tools and services you need at an affordable price</p>
        </div>
        <div className="Billing-plan-actions">
          <span className="Billing-main-price">₹ 4999<small className="Billing-per-month">/month</small></span>

          {planStatus === 'ACTIVE' ? (
            <button className="Billing-btn Billing-btn-outline" onClick={handleToggleModal}>
              Cancel Plan
            </button>
          ) : (
            <button className="Billing-btn Billing-btn-primary" onClick={handleReactivate}>
              Reactivate Plan
            </button>
          )}
          <button className="Billing-btn Billing-btn-primary" onClick={handleUpgradeRedirect}>  Upgrade Plan </button>

          {/* Cancellation Modal */}
          {isModalOpen && (
            <div className="Billing-modal-overlay">
              <div className="Billing-modal-content">
                <h2 className="Billing-modal-title">CONFIRM PLAN CANCELLATION</h2>

                {/* Inner Info Card */}
                <div className="Billing-modal-info-card">
                  <div className="Billing-modal-card-header">
                    <div>
                      <span className="Billing-modal-label">Current Plan</span>
                      <div className="Billing-plan-title-row">
                        <h3 className="Billing-modal-plan-name">Premium / Enterprise</h3>
                        <span className="Billing-badge Billing-badge-active">ACTIVE</span>
                      </div>
                    </div>
                  </div>
                  <p className="Billing-plan-desc">Providing the core tools and services you need at an affordable price</p>
                </div>

                <p className="Billing-modal-text">
                  Are you sure you want to cancel your Premium subscription?
                  Cancelling will prevent any future charges, and access to premium
                  features will cease at the end of your current billing period.
                </p>

                <div className="Billing-modal-actions">
                  <button className="Billing-modal-btn-grey" onClick={handleToggleModal}>
                    Keep My Current Plan
                  </button>
                  <button
                    className="Billing-modal-btn-confirm"
                    onClick={handleConfirmCancellation}
                  >
                    CONFIRM CANCELLATION
                  </button>
                </div>
              </div>
            </div>
          )}


        </div>
      </div>

      {/* Grid: Next Invoice & Payment Method */}
      <div className="Billing-grid">
        <div className="Billing-card">
          <p className="Billing-section-label">Next Invoices</p>
          <h3 className="Billing-grid-price">₹ 4999/-</h3>
          <div className="Billing-grid-details">
            <p className="Billing-detail-item"><span>Plan Type</span> : Premium / Enterprise (Monthly)</p>
            <p className="Billing-detail-item"><span>Next Invoice</span> : April 10, 2026</p>
          </div>
        </div>

        <div className="Billing-card">
          <div className="Billing-flex-between">
            <p className="Billing-section-label">Payment Method</p>
            <div className="Billing-visa-logo">VISA</div>
          </div>
          <h3 className="Billing-card-number">**** 8721</h3>
          <div className="Billing-flex-between">
            <div className="Billing-grid-details">
              <p className="Billing-detail-item"><span>Name Card</span> : James Calzoni</p>
              <p className="Billing-detail-item"><span>Expired Date</span> : 12/2026</p>
            </div>
            <div className="Billing-card-btn-group">
              <button className="Billing-btn Billing-btn-outline Billing-btn-sm">Change Card</button>
              <button className="Billing-btn-icon-del" aria-label="Delete">
                <img src={DeleteIcon} alt="Delete" className="Billing-delete-icon-img" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="Billing-card Billing-history-card">
        <div className="Billing-table-title-row">
          <h3 className="Billing-history-title">BILLING HISTORY</h3>
          <Link to="/Job-portal/Employer/Billing" className="Billing-view-link">View history</Link>
        </div>

        <div className="Billing-list-container">
          <div className="Billing-list-header">
            <div className="Billing-col-plan">PLAN</div>
            <div className="Billing-col-date">DATE</div>
            <div className="Billing-col-price">PRICE</div>
            <div className="Billing-col-status">STATUS</div>
            <div className="Billing-col-invoice">INVOICE</div>
          </div>

          {billingHistory.map((item, index) => (
            <div className="Billing-list-row" key={index}>
              <div className="Billing-col-plan font-bold">{item.plan}</div>
              <div className="Billing-col-date">{item.date}</div>
              <div className="Billing-col-price">{item.price}</div>
              <div className="Billing-col-status">
                <span className={`Billing-status-pill Billing-status-${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
              <div className="Billing-col-invoice">
                <span className="Billing-invoice-id">{item.invoice}</span>
                <img src={FileIcon} alt="Invoice Icon" className="Billing-doc-icon-img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

// EmployerMembership- Monthly 


