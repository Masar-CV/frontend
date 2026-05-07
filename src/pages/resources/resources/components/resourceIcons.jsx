export const getCoverIcon = (type) => {
  if (type === 'email') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4 8l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4h9l4 4v12H6z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15 4v4h4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 12h6M9 15h6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
};

export const copyIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 9h10v10H9z" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 15H4V5h10v1" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);
