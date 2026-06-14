import { Link } from 'react-router-dom';
import { ROUTES } from '../../app/routes/paths';

const NotFound = () => {
  return (
    <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>404 - Page Not Found</h1>
        <p style={{ marginTop: '0.75rem', color: '#4b5563' }}>
          The page you requested does not exist or has moved.
        </p>
        <Link
          to={ROUTES.home}
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            textDecoration: 'none',
          }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
