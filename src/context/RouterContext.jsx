import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext(null);

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  CERAMIC_COATING: '/ceramic-coating',
  FLEETS_MARINE: '/fleets-marine',
  ABOUT: '/about',
  REVIEWS: '/reviews',
  CONTACT: '/contact',
};

function normalizePath(pathname, hash = '') {
  const p = (pathname || '').toLowerCase().replace(/\/$/, '') || '/';
  const h = (hash || '').toLowerCase();

  // Route matches by path
  if (p === '/services' || p === '/packages' || p === '/rates' || p === '/quote') return 'services';
  if (p === '/ceramic-coating' || p === '/coating' || p === '/ceramic') return 'ceramic-coating';
  if (p === '/fleets-marine' || p === '/fleets' || p === '/fleet' || p === '/boats' || p === '/marine') return 'fleets-marine';
  if (p === '/about' || p === '/why-us' || p === '/facility') return 'about';
  if (p === '/reviews' || p === '/testimonials') return 'reviews';
  if (p === '/contact' || p === '/location' || p === '/hours') return 'contact';

  // Backwards compatibility with anchor hashes from existing external links
  if (h === '#packages' || h === '#quote') return 'services';
  if (h === '#coating' || h === '#carfax' || h === '#process') return 'ceramic-coating';
  if (h === '#fleets' || h === '#boats') return 'fleets-marine';
  if (h === '#shop' || h === '#credentials') return 'about';
  if (h === '#reviews') return 'reviews';
  if (h === '#book' || h === '#contact' || h === '#hours') return 'contact';

  return 'home';
}

export function RouterProvider({ children }) {
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window === 'undefined') return 'home';
    return normalizePath(window.location.pathname, window.location.hash);
  });

  useEffect(() => {
    const handlePopState = () => {
      const route = normalizePath(window.location.pathname, window.location.hash);
      setCurrentRoute(route);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update document title dynamically based on active page
  useEffect(() => {
    const titles = {
      home: 'Ktown Auto Spa | Car Detailing, Hand Wash & Ceramic Coating in Kingston, ON',
      services: 'Services & Instant Quote Builder | 2026 Rate Card | Ktown Auto Spa',
      'ceramic-coating': 'System X Ceramic Coating & Paint Correction | CARFAX Registered | Ktown Auto Spa',
      'fleets-marine': 'Commercial Fleet Washing & Marine Boat Detailing | Ktown Auto Spa',
      about: 'Why Us & Heated Indoor Detailing Studio | 36 Joseph St | Ktown Auto Spa',
      reviews: 'Customer Reviews & Handwritten Pickup Logs | Ktown Auto Spa',
      contact: 'Location, Hours & Drop-off Directions | 36 Joseph St | Ktown Auto Spa',
    };
    if (titles[currentRoute]) {
      document.title = titles[currentRoute];
    }
  }, [currentRoute]);

  const navigate = (path, hash = '', options = {}) => {
    if (typeof window === 'undefined') return;

    let targetPath = path;
    if (path === '/') targetPath = '/';
    else if (!path.startsWith('/')) targetPath = `/${path}`;

    const fullUrl = hash ? `${targetPath}${hash.startsWith('#') ? hash : `#${hash}`}` : targetPath;

    if (window.location.pathname !== targetPath || window.location.hash !== (hash ? `#${hash.replace(/^#/, '')}` : '')) {
      window.history.pushState({}, '', fullUrl);
    }

    const route = normalizePath(targetPath, hash);
    setCurrentRoute(route);

    if (!options.keepScroll) {
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash.startsWith('#') ? hash : `#${hash}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <RouterContext.Provider value={{ currentRoute, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
}
