import React, { useEffect } from 'react';
import { Studio } from 'sanity';
import sanityConfig from '../../sanity.config';

export const StudioPage: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cleanPath = window.location.pathname.replace(/\/$/, '');
      if (
        cleanPath === '/studio/articles' ||
        cleanPath === '/studio/home' ||
        cleanPath === '/studio/categories' ||
        cleanPath === '/studio/authors' ||
        cleanPath === '/studio/tags'
      ) {
        window.history.replaceState(null, '', '/studio/encyclopedia');
      }
    }
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      <Studio config={sanityConfig} />
    </div>
  );
};

export default StudioPage;
