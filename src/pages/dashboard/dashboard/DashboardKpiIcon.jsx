const DashboardKpiIcon = ({ iconClass }) => (
  <span className={`dashboard-kpi-icon ${iconClass}`} aria-hidden="true">
    {iconClass === 'trend' && (
      <svg viewBox="0 0 20 20">
        <path d="M4 13.5l4-4 2.5 2.5L16 6.5" />
        <path d="M12 6.5h4v4" />
      </svg>
    )}
    {iconClass === 'target' && (
      <svg viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="6" />
        <circle cx="10" cy="10" r="3.5" />
      </svg>
    )}
    {iconClass === 'badge' && (
      <svg viewBox="0 0 20 20">
        <circle cx="10" cy="7.5" r="3.5" />
        <path d="M7.5 11.5v5L10 15l2.5 1.5v-5" />
      </svg>
    )}
    {iconClass === 'calendar' && (
      <svg viewBox="0 0 20 20">
        <rect x="3.5" y="4.5" width="13" height="12" rx="2" />
        <path d="M6.5 3.5v3M13.5 3.5v3M3.5 8.5h13" />
      </svg>
    )}
  </span>
);

export default DashboardKpiIcon;
