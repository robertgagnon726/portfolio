'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const SectionRouting = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    // Handler for the native hashchange event
    function handleHashChange() {
      setCurrentHash(window.location.hash);
    }

    // Attach listener
    window.addEventListener('hashchange', handleHashChange);

    // Set initial state if a hash is present
    if (window.location.hash) {
      handleHashChange();
    }

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (!currentHash) return;

    // Wait a bit for the DOM to render (and any dynamic content to load)
    setTimeout(() => {
      const targetId = currentHash.slice(1); // remove #
      const element = document.getElementById(targetId);
      if (element) {
        const navBarHeight = 80; // match your fixed nav height
        const elementY = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementY - navBarHeight,
          behavior: 'smooth',
        });
      }

      // Remove hash from the URL (without additional scrolling)
      router.replace(pathname, { scroll: false });
    }, 750);
  }, [pathname, searchParams, currentHash]);

  return null;
};
