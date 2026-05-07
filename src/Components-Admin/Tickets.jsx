import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Tickets.css';

// Import images from assets folder
import TicketIcon from '../assets/AdminAssets/TicketIcon.png';
import Watchgreen from '../assets/AdminAssets/Watchgreen.png';
import Watchyellow from '../assets/AdminAssets/Watchyellow.png';
import FlameIcon from '../assets/AdminAssets/FlameIcon.png';
import WatchPurple from '../assets/AdminAssets/WatchPurple.png';

export const Tickets = () => {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, title: '', value: '' });
  
  // Refs
  const ticketListRef = useRef(null);
  const exportRef = useRef(null); // Ref for handling outside clicks on the export menu

  // Filter States
  const [priorityFilter, setPriorityFilter] = useState('High');

  // Export & Notification States
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // State to hold and update the tickets in the list
  const [ticketsList, setTicketsList] = useState([
    { id: 'TKT-1023', subject: 'Payment not processing.', assignee: 'Trisha', time: '2 hours ago', priority: 'High' },
    { id: 'TKT-0987', subject: 'Login failure', assignee: 'Hari', time: '22 mins ago', priority: 'High' },
    { id: 'TKT-0876', subject: 'Application error on submit', assignee: 'Lithin', time: '18 mins ago', priority: 'High' }
  ]);

  // Close export dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setExportMenuOpen(false);
      }
    };

    if (exportMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [exportMenuOpen]);

  const handleMouseMove = (e, title, value) => {
    setTooltip({ visible: true, x: e.clientX, y: e.clientY, title, value });
  };

  const handleMouseLeave = () => setTooltip({ ...tooltip, visible: false });

  // Function to handle changing the priority dropdown for a specific row
  const handlePriorityChange = (id, newPriority) => {
    setTicketsList(ticketsList.map(ticket => 
      ticket.id === id ? { ...ticket, priority: newPriority } : ticket
    ));
  };

  // Filter the tickets based on the selected top dropdown value
  const filteredTickets = ticketsList.filter(ticket => {
    if (priorityFilter === 'All') return true; 
    return ticket.priority === priorityFilter; 
  });

  // Robust helper function to trigger browser downloads
  const forceDownload = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      if (url.startsWith('blob:')) URL.revokeObjectURL(url); 
    }, 100);
  };

  // --- Core Export Logic ---
  const handleExportSelect = async (format) => {
    setExportMenuOpen(false); // Close the menu

    try {
      if (format === 'Excel Spreadsheet') {
        const headers = ['Ticket ID', 'Subject', 'Assignee', 'Time', 'Priority'];
        
        const csvRows = filteredTickets.map(t => {
          const safeSubject = `"${t.subject.replace(/"/g, '""')}"`; 
          return [t.id, safeSubject, t.assignee, t.time, t.priority];
        });

        const BOM = '\uFEFF'; 
        const csvContent = BOM + [headers.join(','), ...csvRows.map(e => e.join(','))].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        forceDownload(url, 'Ticket_List_Report.csv');
      } 
      
      else if (format === 'PDF Document') {
        const doc = new jsPDF();
        doc.text("Ticket List Report", 14, 15);
        
        const tableColumn = ["Ticket ID", "Subject", "Assignee", "Time", "Priority"];
        const tableRows = filteredTickets.map(t => [t.id, t.subject, t.assignee, t.time, t.priority]);
        
        autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
        doc.save('Ticket_List_Report.pdf'); 
      } 
      
      else if (format === 'Word Document') {
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Ticket Report</title></head><body>";
        const footer = "</body></html>";
        
        let tableHtml = "<h2>Ticket List Report</h2><table border='1' style='width:100%; border-collapse: collapse; text-align: left;'><tr><th>Ticket ID</th><th>Subject</th><th>Assignee</th><th>Time</th><th>Priority</th></tr>";
        filteredTickets.forEach(t => {
          tableHtml += `<tr><td>${t.id}</td><td>${t.subject}</td><td>${t.assignee}</td><td>${t.time}</td><td>${t.priority}</td></tr>`;
        });
        tableHtml += "</table>";
        
        const blob = new Blob(['\ufeff', header + tableHtml + footer], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        forceDownload(url, 'Ticket_List_Report.doc');
      } 
      
      else if (format === 'Image') {
        if (ticketListRef.current) {
          const canvas = await html2canvas(ticketListRef.current, { scale: 2 });
          const imgData = canvas.toDataURL('image/png');
          forceDownload(imgData, 'Ticket_List.png');
        }
      }

      setToastMessage(`Success! Ticket list exported as ${format}.`);
    } catch (error) {
      console.error("Export failed:", error);
      setToastMessage(`Failed to export as ${format}.`);
    }

    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="tickets-page">
      <div className="tickets-header">
        <h2>Ticket Analysis</h2>
        <p>Comprehensive overview of support tickets across the platform</p>
      </div>

      <div className="kpi-section">
        <div className="kpi-card">
          <img src={TicketIcon} alt="Total Tickets" className="kpi-image-icon" />
          <div className="kpi-content">
            <p className="kpi-title">Total Tickets</p>
            <h3 className="kpi-value">2,842</h3>
            <p className="kpi-trend"><span className="trend-up-good">↑ 18.6%</span> vs Apr 28 - May 4</p>
          </div>
        </div>

        <div className="kpi-card">
          <img src={Watchgreen} alt="Avg Resolution Time" className="kpi-image-icon" />
          <div className="kpi-content">
            <p className="kpi-title">Avg. Resolution Time</p>
            <h3 className="kpi-value">18h 42m</h3>
            <p className="kpi-trend"><span className="trend-down-good">↓ 12.5%</span> vs Apr 28 - May 4</p>
          </div>
        </div>

        <div className="kpi-card">
          <img src={Watchyellow} alt="Resolved vs Pending" className="kpi-image-icon" />
          <div className="kpi-content">
            <p className="kpi-title">Resolved vs Pending</p>
            <h3 className="kpi-value">78.6%</h3>
            <div className="kpi-bottom-block">
              <div className="kpi-progress-bar">
                <div className="kpi-progress-fill" style={{ width: '78.6%' }}></div>
              </div>
              <div className="kpi-subtitle">
                <span><strong>2,232</strong> Resolved</span>
                <span className="kpi-pending"><strong className="text-yellow">610</strong> Pending</span>
              </div>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <img src={FlameIcon} alt="High Priority Tickets" className="kpi-image-icon" />
          <div className="kpi-content">
            <p className="kpi-title">High Priority Tickets</p>
            <h3 className="kpi-value">287</h3>
            <p className="kpi-trend"><span className="trend-up-bad">↑ 24.3%</span> vs Apr 28 - May 4</p>
          </div>
        </div>

        <div className="kpi-card">
          <img src={WatchPurple} alt="SLA Breach Count" className="kpi-image-icon" />
          <div className="kpi-content">
            <p className="kpi-title">SLA Breach Count</p>
            <h3 className="kpi-value">43</h3>
            <p className="kpi-trend"><span className="trend-up-bad">↑ 8.7%</span> vs Apr 28 - May 4</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        {/* 1. Category Distribution */}
        <div className="dashboard-card">
          <h4>Category Distribution</h4>
          <div className="category-content">
            <div className="donut-wrapper">
              <svg viewBox="0 0 160 160" className="interactive-donut">
                <circle cx="80" cy="80" r="68" className="donut-slice" stroke="var(--primary-blue)" strokeWidth="24" strokeDasharray="36.5 100" pathLength="100" onMouseMove={(e) => handleMouseMove(e, 'Account Issues', '36.5% (1,038)')} onMouseLeave={handleMouseLeave} />
                <circle cx="80" cy="80" r="68" className="donut-slice" stroke="var(--success-green)" strokeWidth="24" strokeDasharray="22.4 100" strokeDashoffset="-36.5" pathLength="100" onMouseMove={(e) => handleMouseMove(e, 'Payment Problems', '22.4% (637)')} onMouseLeave={handleMouseLeave} />
                <circle cx="80" cy="80" r="68" className="donut-slice" stroke="var(--warning-yellow)" strokeWidth="24" strokeDasharray="15.7 100" strokeDashoffset="-58.9" pathLength="100" onMouseMove={(e) => handleMouseMove(e, 'Job Posting Errors', '15.7% (447)')} onMouseLeave={handleMouseLeave} />
                <circle cx="80" cy="80" r="68" className="donut-slice" stroke="var(--purple)" strokeWidth="24" strokeDasharray="14.1 100" strokeDashoffset="-74.6" pathLength="100" onMouseMove={(e) => handleMouseMove(e, 'Technical Bugs', '14.1% (401)')} onMouseLeave={handleMouseLeave} />
                <circle cx="80" cy="80" r="68" className="donut-slice" stroke="#d1d5db" strokeWidth="24" strokeDasharray="11.3 100" strokeDashoffset="-88.7" pathLength="100" onMouseMove={(e) => handleMouseMove(e, 'Others', '11.3% (319)')} onMouseLeave={handleMouseLeave} />
              </svg>
              <div className="donut-center-text">
                <h3>2,842</h3>
                <p>Total</p>
              </div>
            </div>

            <div className="category-legend">
              <div className="legend-item"><div className="legend-marker bg-blue"></div><div className="legend-info"><span className="legend-title">Account Issues</span><span className="legend-stats">36.5% (1,038)</span></div></div>
              <div className="legend-item"><div className="legend-marker bg-green"></div><div className="legend-info"><span className="legend-title">Payment Problems</span><span className="legend-stats">22.4% (637)</span></div></div>
              <div className="legend-item"><div className="legend-marker bg-yellow"></div><div className="legend-info"><span className="legend-title">Job Posting Errors</span><span className="legend-stats">15.7% (447)</span></div></div>
              <div className="legend-item"><div className="legend-marker bg-purple"></div><div className="legend-info"><span className="legend-title">Technical Bugs</span><span className="legend-stats">14.1% (401)</span></div></div>
              <div className="legend-item"><div className="legend-marker bg-gray"></div><div className="legend-info"><span className="legend-title">Others</span><span className="legend-stats">11.3% (319)</span></div></div>
            </div>
          </div>
          <p className="card-footer-text">Click on a category to filter results</p>
        </div>

        {/* 2. Priority Heatmap */}
        <div className="dashboard-card heatmap-card">
          <div className="card-header-flex">
            <h4>Priority Heatmap</h4>
            <select className="heatmap-select">
              <option value="7">Last 7 Days</option>
              <option value="5">Last 5 Days</option>
              <option value="3">Last 3 Days</option>
            </select>
          </div>
          <div className="heatmap-container">
            <div className="heatmap-dates">
              <span></span>
              <span>May 12</span><span>May 13</span><span>May 14</span><span>May 15</span><span>May 16</span><span>May 17</span><span>May 18</span>
            </div>
            <div className="heatmap-row">
              <span className="row-label">Critical</span>
              <div className="h-cell c-low">18</div><div className="h-cell c-mid">21</div><div className="h-cell c-low">19</div><div className="h-cell c-high">26</div><div className="h-cell c-max">31</div><div className="h-cell c-mid">24</div><div className="h-cell c-mid">22</div>
            </div>
            <div className="heatmap-row">
              <span className="row-label">High</span>
              <div className="h-cell h-low">45</div><div className="h-cell h-mid">48</div><div className="h-cell h-mid">52</div><div className="h-cell h-high">61</div><div className="h-cell h-high">58</div><div className="h-cell h-mid">49</div><div className="h-cell h-mid">55</div>
            </div>
            <div className="heatmap-row">
              <span className="row-label">Medium</span>
              <div className="h-cell m-low">130</div><div className="h-cell m-low">142</div><div className="h-cell m-mid">156</div><div className="h-cell m-mid">160</div><div className="h-cell m-high">170</div><div className="h-cell m-low">149</div><div className="h-cell m-mid">158</div>
            </div>
            <div className="heatmap-row">
              <span className="row-label">Low</span>
              <div className="h-cell l-mid">95</div><div className="h-cell l-high">102</div><div className="h-cell l-high">110</div><div className="h-cell l-mid">98</div><div className="h-cell l-high">105</div><div className="h-cell l-mid">97</div><div className="h-cell l-mid">99</div>
            </div>
          </div>
          <div className="heatmap-legend">
            <span>Low</span><div className="scale-bar"></div><span>High</span>
          </div>
        </div>

        {/* 3. Priority Breakdown Card */}
        <div className="dashboard-card breakdown-card">
          <h4>Priority Breakdown</h4>
          <div className="breakdown-container">
            <div className="breakdown-item">
              <div className="breakdown-bar-bg">
                <div className="breakdown-fill fill-red" style={{ width: '32%' }}>
                  <span className="breakdown-label">High 32%</span>
                </div>
              </div>
            </div>
            <div className="breakdown-item">
              <div className="breakdown-bar-bg">
                <div className="breakdown-fill fill-orange" style={{ width: '45%' }}>
                  <span className="breakdown-label">Medium 45%</span>
                </div>
              </div>
            </div>
            <div className="breakdown-item">
              <div className="breakdown-bar-bg">
                <div className="breakdown-fill fill-green" style={{ width: '23%' }}>
                  <span className="breakdown-label">Low 23%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. Agent Performance Section --- */}
      <div className="agent-performance-section">
        <h3 className="section-title">Agent Performance</h3>

        <div className="table-container">
          <table className="agent-table">
            <thead>
              <tr>
                <th className="align-left">Agent Name</th>
                <th>Tickets Handled</th>
                <th>Avg Response</th>
                <th>Resolution Rate</th>
                <th>Rating</th>
                <th className="stars-header">⭐⭐⭐⭐⭐</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Trisha */}
              <tr>
                <td className="align-left">
                  <div className="agent-info">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Trisha" className="avatar" />
                    <span className="agent-name">Trisha</span>
                  </div>
                </td>
                <td><strong>58</strong></td>
                <td><strong>1.2</strong> <span className="data-unit">hrs</span></td>
                <td><strong>92</strong><span className="data-unit">%</span></td>
                <td><strong>4.8</strong></td>
                <td>
                  <div className="rating-bar-bg">
                    <div className="rating-fill fill-green" style={{ width: '92%' }}></div>
                  </div>
                </td>
              </tr>

              {/* Row 2: Hari */}
              <tr>
                <td className="align-left">
                  <div className="agent-info">
                    <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Hari" className="avatar" />
                    <span className="agent-name">Hari</span>
                  </div>
                </td>
                <td><strong>47</strong></td>
                <td><strong>1.8</strong> <span className="data-unit">hrs</span></td>
                <td><strong>87</strong><span className="data-unit">%</span></td>
                <td><strong>4.5</strong></td>
                <td>
                  <div className="rating-bar-bg">
                    <div className="rating-fill fill-orange" style={{ width: '87%' }}></div>
                  </div>
                </td>
              </tr>

              {/* Row 3: Lithin */}
              <tr>
                <td className="align-left">
                  <div className="agent-info">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Lithin" className="avatar" />
                    <span className="agent-name">Lithin</span>
                  </div>
                </td>
                <td><strong>36</strong></td>
                <td><strong>2.5</strong> <span className="data-unit">hrs</span></td>
                <td><strong>75</strong><span className="data-unit">%</span></td>
                <td><strong>3.9</strong></td>
                <td>
                  <div className="rating-bar-bg">
                    <div className="rating-fill fill-red" style={{ width: '75%' }}></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 5. Ticket List Section --- */}
      <div className="ticket-list-section" ref={ticketListRef}>
        <div className="ticket-list-header">
          <div className="ticket-list-header-left">
            <h3 className="section-title">Ticket List</h3>
            <div className="ticket-filters">

              <div className="filter-box">
                <span className="filter-label">Status:</span>
                <select className="filter-select">
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="filter-box">
                <span className="filter-label">Priority:</span>
                <select
                  className="filter-select"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="filter-box">
                <span className="filter-label">Category:</span>
                <select className="filter-select text-blue" defaultValue="Payment Issues">
                  <option value="Payment Issues">Payment Issues</option>
                  <option value="Account Issues">Account Issues</option>
                  <option value="Document & Compliance Issues">Document & Compliance Issues</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
          </div>

          <div className="ticket-list-actions">

            {/* Custom Export Dropdown Component */}
            <div className="export-dropdown-wrapper" ref={exportRef}>
              <button className="btn-export" onClick={() => setExportMenuOpen(!exportMenuOpen)}>
                Export <span className="btn-caret">⌄</span>
              </button>

              {exportMenuOpen && (
                <div className="export-menu">
                  <div className="export-menu-item" onClick={() => handleExportSelect('PDF Document')}>
                    📄 PDF Document (.pdf)
                  </div>
                  <div className="export-menu-item" onClick={() => handleExportSelect('Excel Spreadsheet')}>
                    📊 Excel / CSV (.csv)
                  </div>
                  <div className="export-menu-item" onClick={() => handleExportSelect('Word Document')}>
                    📝 Word Document (.doc)
                  </div>
                  <div className="export-menu-item" onClick={() => handleExportSelect('Image')}>
                    🖼️ Image (.png)
                  </div>
                </div>
              )}
            </div>

            <button className="btn-generate">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Generate Report
              <span className="btn-caret">⌄</span>
            </button>
          </div>
        </div>

        <div className="ticket-list-body">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <div className="ticket-row" key={ticket.id}>
                <div className="ticket-row-left">
                  <div className="status-ring"></div>
                  <span className="ticket-id">{ticket.id}</span>
                  <span className="ticket-subject">{ticket.subject}</span>
                  <span className="assignee-tag">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    {ticket.assignee}
                  </span>
                </div>
                <div className="ticket-row-right">
                  <span className="ticket-time">{ticket.time}</span>

                  <div className={`ticket-priority color-${ticket.priority.toLowerCase()}`}>
                    <span className={`priority-ring bg-${ticket.priority.toLowerCase()}`}></span>
                    <span>{ticket.priority}</span>
                    <svg className="dropdown-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>

                    <select
                      className="hidden-select"
                      value={ticket.priority}
                      onChange={(e) => handlePriorityChange(ticket.id, e.target.value)}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
              No tickets found for this priority.
            </div>
          )}
        </div>
      </div>

      {/* Tooltips */}
      {tooltip.visible && (
        <div className="custom-tooltip" style={{ top: `${tooltip.y + 15}px`, left: `${tooltip.x + 15}px` }}>
          <strong>{tooltip.title}</strong>
          <p>{tooltip.value}</p>
        </div>
      )}

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="toast-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

