import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopAndWait = ({ children }) => {
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);

    const raf = requestAnimationFrame(() => {
      const scrollContainer = document.querySelector('.main-scroll-container');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
      setReady(true);
    });

    return () => cancelAnimationFrame(raf);
  }, [location.pathname]);

  return (
    <div
      style={{
        opacity: ready ? 1 : 0,
        pointerEvents: ready ? 'auto' : 'none',
        transition: 'opacity 0.1s ease',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollToTopAndWait;
