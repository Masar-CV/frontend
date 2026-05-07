import './ThinkingOverlay.css';

const ThinkingOverlay = ({
  brand = 'MASAR',
  title = 'Thinking, analyzing...',
  description = 'Processing your information and preparing the best result.',
}) => (
  <div className="thinking-overlay" role="status" aria-live="polite">
    <div className="thinking-brand" aria-hidden="true">
      {brand}
    </div>

    <div className="thinking-orbit" aria-hidden="true">
      <span className="thinking-icon document">
        <svg viewBox="0 0 24 24">
          <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5Z" />
          <path d="M14 3.5V8h4" />
          <path d="M9 12h6M9 15h6M9 18h4" />
        </svg>
      </span>
      <span className="thinking-icon scan">
        <svg viewBox="0 0 24 24">
          <path d="M4 7V5.5A1.5 1.5 0 0 1 5.5 4H7" />
          <path d="M17 4h1.5A1.5 1.5 0 0 1 20 5.5V7" />
          <path d="M20 17v1.5a1.5 1.5 0 0 1-1.5 1.5H17" />
          <path d="M7 20H5.5A1.5 1.5 0 0 1 4 18.5V17" />
          <path d="M7 12h10" />
        </svg>
      </span>
      <span className="thinking-icon spark">
        <svg viewBox="0 0 24 24">
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
          <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" />
        </svg>
      </span>
    </div>

    <div className="thinking-card">
      <div className="thinking-loader" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </div>
);

export default ThinkingOverlay;
