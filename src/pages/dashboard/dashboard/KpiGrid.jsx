import DashboardKpiIcon from './DashboardKpiIcon';

const KpiGrid = ({ cards }) => (
  <section className="dashboard-kpi-grid">
    {cards.map((card) => (
      <article key={card.title} className="dashboard-kpi-card">
        <div className="dashboard-kpi-top">
          <DashboardKpiIcon iconClass={card.iconClass} />
          <span className={`dashboard-kpi-delta ${card.deltaTone}`}>
            {card.delta}
          </span>
        </div>
        <p className="dashboard-kpi-value">{card.value}</p>
        <p className="dashboard-kpi-title">{card.title}</p>
      </article>
    ))}
  </section>
);

export default KpiGrid;
