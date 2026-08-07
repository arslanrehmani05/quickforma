import React from 'react';
import { Studio } from 'sanity';
import sanityConfig from '../../sanity.config';

export const StudioPage: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      <Studio config={sanityConfig} />
    </div>
  );
};

export default StudioPage;
