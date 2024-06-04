import { useEffect, useState } from 'react';

export const useMediaQuery = () => {
  const [mediaQuery, setMediaQuery] = useState<string>('')
  const [heigthPage, setHeigthPage] = useState<number>(0)

  const updateSizeBoot = () => {
    setHeigthPage(window.innerHeight);
    if (window.innerWidth >= 1536) {
      setMediaQuery('XX-Large');
    }
    else if (window.innerWidth >= 1280) {
      setMediaQuery('X-Large');
    }
    else if (window.innerWidth >= 1024) {
      setMediaQuery('Large');
    }
    else if (window.innerWidth >= 768) {
      setMediaQuery('Medium');
    }
    else if (window.innerWidth >= 640) {
      setMediaQuery('Small');
    }
    else if (window.innerWidth < 576) {
      setMediaQuery('Extra small');
    }
  }

  useEffect(() => {
    updateSizeBoot();
    window.addEventListener('resize', updateSizeBoot);
    return () => {
      updateSizeBoot();
      window.removeEventListener('resize', updateSizeBoot);
    };
  }, [])

  return { mediaQuery, heigthPage }
}