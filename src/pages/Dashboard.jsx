import React, { useState } from 'react'
import '../styles/dashboard.css'

function Breadcrumbs({ onNavigate }) {
  return (
    <div className="crumbs">
      <span className="muted">Dashboard</span>
    </div>
  )
}

function Section({ title, right, children, className = '' }) {
  return (
    <div className={`section ${className}`}>
      <div className="section-head">
        <div className="section-title">{title}</div>
        {right ? <div className="section-right">{right}</div> : null}
      </div>
      <div className="section-body">{children}</div>
    </div>
  )
}

export default function Dashboard({ onNavigate, theme }) {
  const [timeRange, setTimeRange] = useState('week')

  function openAI() {
    alert('AI Assistant coming soon')
  }

  function openSettings() {
    alert('Settings coming soon')
  }

  function refreshPage() {
    window.location.reload()
  }

  // Mock data for dashboard
  const recentAudits = [
    { id: 1, name: 'ISO 27001 Q4 Audit', framework: 'ISO 27001', status: 'in-progress', progress: 68, dueDate: '2025-11-15', assignee: 'Sarah Chen' },
    { id: 2, name: 'NIST Cybersecurity Review', framework: 'NIST CSF', status: 'in-progress', progress: 45, dueDate: '2025-11-20', assignee: 'Mike Johnson' },
    { id: 3, name: 'GDPR Compliance Check', framework: 'GDPR', status: 'pending', progress: 0, dueDate: '2025-11-25', assignee: 'Emma Wilson' },
    { id: 4, name: 'SOX Annual Assessment', framework: 'SOX', status: 'completed', progress: 100, dueDate: '2025-11-05', assignee: 'David Lee' }
  ]

  const recentActivity = [
    { id: 1, type: 'upload', message: 'New document uploaded: Security Policy v2.3', time: '2 hours ago', user: 'Sarah Chen' },
    { id: 2, type: 'audit', message: 'ISO 27001 Q4 Audit updated to 68% complete', time: '4 hours ago', user: 'Mike Johnson' },
    { id: 3, type: 'framework', message: 'Custom framework "Healthcare Security" created', time: '1 day ago', user: 'Emma Wilson' },
    { id: 4, type: 'compliance', message: 'NIST compliance score improved to 87%', time: '1 day ago', user: 'System' },
    { id: 5, type: 'report', message: 'Monthly compliance report generated', time: '2 days ago', user: 'David Lee' }
  ]

  const complianceByFramework = [
    { name: 'ISO 27001', score: 92, trend: 'up', change: '+5%' },
    { name: 'NIST CSF', score: 87, trend: 'up', change: '+3%' },
    { name: 'GDPR', score: 95, trend: 'stable', change: '0%' },
    { name: 'SOX', score: 88, trend: 'down', change: '-2%' },
    { name: 'PCI DSS', score: 91, trend: 'up', change: '+4%' }
  ]

  const complianceTrend = [
    { month: 'Jun', score: 78 },
    { month: 'Jul', score: 82 },
    { month: 'Aug', score: 85 },
    { month: 'Sep', score: 88 },
    { month: 'Oct', score: 90 },
    { month: 'Nov', score: 92 }
  ]

  const riskDistribution = [
    { level: 'Critical', count: 2, color: '#ef4444' },
    { level: 'High', count: 8, color: '#f59e0b' },
    { level: 'Medium', count: 15, color: '#eab308' },
    { level: 'Low', count: 23, color: '#10b981' }
  ]

  const upcomingDeadlines = [
    { task: 'ISO 27001 Annual Review', date: '2025-11-15', daysLeft: 5, priority: 'high' },
    { task: 'GDPR Data Mapping Update', date: '2025-11-18', daysLeft: 8, priority: 'medium' },
    { task: 'SOX Controls Testing', date: '2025-11-22', daysLeft: 12, priority: 'high' },
    { task: 'Security Awareness Training', date: '2025-11-25', daysLeft: 15, priority: 'low' }
  ]

  return (
    <div className="layout-single">
      <main className="content">
        <header className="page-head">
          <div className="container head-grid">
            <div className="page-title">Dashboard</div>
            <div className="page-actions">
              <button className="ghost" onClick={openAI}>AI ASSISTANT</button>
              <button className="ghost" onClick={openSettings}>⚙</button>
              <button className="ghost" onClick={refreshPage}>↻</button>
            </div>
            <Breadcrumbs onNavigate={onNavigate} />
          </div>
        </header>

        <div className="container dashboard-container">
          <div className="dashboard-grid">
            {/* Enhanced Metrics Cards */}
            <Section title="Key Metrics" className="metrics-section">
              <div className="metrics-grid">
                <div className="metric-card metric-primary">
                  <div className="metric-icon">
                    <span className="icon icon-dashboard"></span>
                  </div>
                  <div className="metric-content">
                    <div className="metric-title">Open Audits</div>
                    <div className="metric-value">12</div>
                    <div className="metric-trend positive">
                      <span className="trend-icon">
                        <span className="icon icon-arrow-up"></span>
                      </span>
                      <span>+8% vs last week</span>
                    </div>
                  </div>
                  <div className="metric-sparkline"></div>
                </div>
                <div className="metric-card metric-success">
                  <div className="metric-icon">
                    <span className="icon icon-check"></span>
                  </div>
                  <div className="metric-content">
                    <div className="metric-title">Compliance Score</div>
                    <div className="metric-value">92%</div>
                    <div className="metric-trend neutral">
                      <span className="trend-icon">
                        <span className="icon icon-arrow-right"></span>
                      </span>
                      <span>0% change</span>
                    </div>
                  </div>
                  <div className="metric-progress">
                    <div className="metric-progress-bar" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="metric-card metric-warning">
                  <div className="metric-icon">
                    <span className="icon icon-warning"></span>
                  </div>
                  <div className="metric-content">
                    <div className="metric-title">Overdue Findings</div>
                    <div className="metric-value">5</div>
                    <div className="metric-trend negative">
                      <span className="trend-icon">
                        <span className="icon icon-arrow-down"></span>
                      </span>
                      <span>-3% vs last week</span>
                    </div>
                  </div>
                  <div className="metric-badge">Needs Attention</div>
                </div>
                <div className="metric-card metric-info">
                  <div className="metric-icon">
                    <span className="icon icon-clock"></span>
                  </div>
                  <div className="metric-content">
                    <div className="metric-title">Avg. Resolution Time</div>
                    <div className="metric-value">3.2d</div>
                    <div className="metric-trend positive">
                      <span className="trend-icon">
                        <span className="icon icon-arrow-up"></span>
                      </span>
                      <span>+12% faster</span>
                    </div>
                  </div>
                  <div className="metric-subtitle">Target: 4.0d</div>
                </div>
              </div>
            </Section>

            {/* Quick Actions */}
            <Section title="Quick Actions" className="quick-actions-section">
              <div className="quick-actions-grid">
                <button
                  className="action-card"
                  onClick={() => onNavigate('upload')}
                >
                  <div className="action-icon" style={{ background: '#3b82f6' }}>
                    <span className="icon icon-document"></span>
                  </div>
                  <div className="action-content">
                    <div className="action-title">Upload Document</div>
                    <div className="action-description">Upload and analyze compliance documents</div>
                  </div>
                  <div className="action-arrow">
                    <span className="icon icon-arrow-right"></span>
                  </div>
                </button>

                <button
                  className="action-card"
                  onClick={() => onNavigate('upload-framework')}
                >
                  <div className="action-icon" style={{ background: '#10b981' }}>
                    <span className="icon icon-shield"></span>
                  </div>
                  <div className="action-content">
                    <div className="action-title">Upload Framework</div>
                    <div className="action-description">Add custom compliance frameworks</div>
                  </div>
                  <div className="action-arrow">
                    <span className="icon icon-arrow-right"></span>
                  </div>
                </button>

                <button
                  className="action-card"
                  onClick={() => alert('New Audit coming soon')}
                >
                  <div className="action-icon" style={{ background: '#f59e0b' }}>
                    <span className="icon icon-search"></span>
                  </div>
                  <div className="action-content">
                    <div className="action-title">New Audit</div>
                    <div className="action-description">Start a new compliance audit</div>
                  </div>
                  <div className="action-arrow">
                    <span className="icon icon-arrow-right"></span>
                  </div>
                </button>

                <button
                  className="action-card"
                  onClick={() => alert('Reports coming soon')}
                >
                  <div className="action-icon" style={{ background: '#8b5cf6' }}>
                    <span className="icon icon-chart"></span>
                  </div>
                  <div className="action-content">
                    <div className="action-title">Generate Report</div>
                    <div className="action-description">Create compliance reports</div>
                  </div>
                  <div className="action-arrow">
                    <span className="icon icon-arrow-right"></span>
                  </div>
                </button>
              </div>
            </Section>

            {/* Active Audits Section */}
            <Section
              title="Active Audits"
              className="audits-section"
              right={
                <button className="btn-link" onClick={() => alert('View all audits')}>
                  View All →
                </button>
              }
            >
              <div className="audits-list">
                {recentAudits.slice(0, 3).map(audit => (
                  <div key={audit.id} className="audit-item">
                    <div className="audit-header">
                      <div className="audit-info">
                        <div className="audit-name">{audit.name}</div>
                        <div className="audit-meta">
                          <span className="audit-framework">{audit.framework}</span>
                          <span className="audit-separator">•</span>
                          <span className="audit-assignee">
                            <span className="icon icon-user" style={{ fontSize: '12px', marginRight: '4px' }}></span>
                            {audit.assignee}
                          </span>
                        </div>
                      </div>
                      <div className={`audit-status status-${audit.status}`}>
                        {audit.status === 'in-progress' && (
                          <>
                            <span className="icon icon-refresh" style={{ fontSize: '12px', marginRight: '4px' }}></span>
                            In Progress
                          </>
                        )}
                        {audit.status === 'pending' && (
                          <>
                            <span className="icon icon-clock" style={{ fontSize: '12px', marginRight: '4px' }}></span>
                            Pending
                          </>
                        )}
                        {audit.status === 'completed' && (
                          <>
                            <span className="icon icon-check" style={{ fontSize: '12px', marginRight: '4px' }}></span>
                            Completed
                          </>
                        )}
                      </div>
                    </div>
                    <div className="audit-progress-section">
                      <div className="audit-progress-header">
                        <span className="audit-progress-label">Progress</span>
                        <span className="audit-progress-value">{audit.progress}%</span>
                      </div>
                      <div className="audit-progress-bar-container">
                        <div
                          className="audit-progress-bar"
                          style={{ width: `${audit.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="audit-footer">
                      <span className="audit-due">Due: {audit.dueDate}</span>
                      <button className="btn-audit-action" onClick={() => alert(`View ${audit.name}`)}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Compliance Status by Framework */}
            <Section
              title="Compliance by Framework"
              className="compliance-section"
              right={
                <div className="time-range-selector">
                  <button
                    className={`time-btn ${timeRange === 'week' ? 'active' : ''}`}
                    onClick={() => setTimeRange('week')}
                  >
                    Week
                  </button>
                  <button
                    className={`time-btn ${timeRange === 'month' ? 'active' : ''}`}
                    onClick={() => setTimeRange('month')}
                  >
                    Month
                  </button>
                  <button
                    className={`time-btn ${timeRange === 'year' ? 'active' : ''}`}
                    onClick={() => setTimeRange('year')}
                  >
                    Year
                  </button>
                </div>
              }
            >
              <div className="compliance-list">
                {complianceByFramework.map((framework, index) => (
                  <div key={index} className="compliance-item">
                    <div className="compliance-header">
                      <div className="compliance-name">{framework.name}</div>
                      <div className="compliance-score-container">
                        <div className={`compliance-score score-${framework.score >= 90 ? 'high' : framework.score >= 70 ? 'medium' : 'low'}`}>
                          {framework.score}%
                        </div>
                        <div className={`compliance-change change-${framework.trend}`}>
                          {framework.trend === 'up' && '↗'}
                          {framework.trend === 'down' && '↘'}
                          {framework.trend === 'stable' && '→'}
                          {framework.change}
                        </div>
                      </div>
                    </div>
                    <div className="compliance-bar-container">
                      <div
                        className={`compliance-bar bar-${framework.score >= 90 ? 'high' : framework.score >= 70 ? 'medium' : 'low'}`}
                        style={{ width: `${framework.score}%` }}
                      >
                        <div className="compliance-bar-shine"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Compliance Trend Chart */}
            <Section title="Compliance Trend" className="trend-section">
              <div className="chart-container">
                <div className="chart-header">
                  <div className="chart-legend">
                    <div className="legend-item">
                      <div className="legend-dot" style={{ background: 'var(--primary)' }}></div>
                      <span>Overall Compliance Score</span>
                    </div>
                  </div>
                  <div className="chart-value">
                    <span className="chart-current">92%</span>
                    <span className="chart-change positive">+14% from Jun</span>
                  </div>
                </div>
                <div className="line-chart">
                  {complianceTrend.map((point, index) => {
                    const maxScore = 100
                    const height = (point.score / maxScore) * 100
                    return (
                      <div key={index} className="chart-bar-wrapper">
                        <div className="chart-bar-container">
                          <div
                            className="chart-bar"
                            style={{ height: `${height}%` }}
                          >
                            <div className="chart-bar-value">{point.score}%</div>
                          </div>
                        </div>
                        <div className="chart-label">{point.month}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Section>

            {/* Risk Distribution */}
            <Section title="Risk Distribution" className="risk-section">
              <div className="risk-overview">
                <div className="risk-chart">
                  {riskDistribution.map((risk, index) => {
                    const total = riskDistribution.reduce((sum, r) => sum + r.count, 0)
                    const percentage = (risk.count / total) * 100
                    return (
                      <div
                        key={index}
                        className="risk-bar"
                        style={{
                          width: `${percentage}%`,
                          background: risk.color
                        }}
                        title={`${risk.level}: ${risk.count}`}
                      ></div>
                    )
                  })}
                </div>
                <div className="risk-legend">
                  {riskDistribution.map((risk, index) => (
                    <div key={index} className="risk-item">
                      <div className="risk-item-header">
                        <div className="risk-dot" style={{ background: risk.color }}></div>
                        <span className="risk-level">{risk.level}</span>
                      </div>
                      <div className="risk-count">{risk.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Upcoming Deadlines */}
            <Section
              title="Upcoming Deadlines"
              className="deadlines-section"
              right={
                <button className="btn-link" onClick={() => alert('View calendar')}>
                  View Calendar →
                </button>
              }
            >
              <div className="deadlines-list">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="deadline-item">
                    <div className="deadline-indicator">
                      <div className={`deadline-days priority-${deadline.priority}`}>
                        {deadline.daysLeft}
                      </div>
                      <div className="deadline-label">days</div>
                    </div>
                    <div className="deadline-content">
                      <div className="deadline-task">{deadline.task}</div>
                      <div className="deadline-date">Due: {deadline.date}</div>
                    </div>
                    <div className={`deadline-priority priority-${deadline.priority}`}>
                      {deadline.priority === 'high' && '🔴 High'}
                      {deadline.priority === 'medium' && '🟡 Medium'}
                      {deadline.priority === 'low' && '🟢 Low'}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Recent Activity Feed */}
            <Section
              title="Recent Activity"
              className="activity-section"
              right={
                <button className="btn-link" onClick={() => alert('View all activity')}>
                  View All →
                </button>
              }
            >
              <div className="activity-feed">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon icon-${activity.type}`}>
                      {activity.type === 'upload' && '📄'}
                      {activity.type === 'audit' && '🔍'}
                      {activity.type === 'framework' && '🛡️'}
                      {activity.type === 'compliance' && '✓'}
                      {activity.type === 'report' && '📊'}
                    </div>
                    <div className="activity-content">
                      <div className="activity-message">{activity.message}</div>
                      <div className="activity-meta">
                        <span className="activity-user">{activity.user}</span>
                        <span className="activity-separator">•</span>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </main>
    </div>
  )
}