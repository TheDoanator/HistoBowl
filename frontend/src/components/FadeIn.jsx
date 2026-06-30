import { useEffect, useState } from 'react';

function FadeIn({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-out transform ${
        isVisible 
          ? 'opacity-100 blur-none translate-y-0' 
          : 'opacity-0 blur-md translate-y-2'
      }`}
    >
      {children}
    </div>
  );
}

export default FadeIn;