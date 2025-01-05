import React, { useEffect, useRef } from 'react';

export default function FlightWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.id = 'tp-widget-root';
    containerRef.current.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.src = 'https://tp.media/content?currency=eur&trs=366580&shmarker=506594&locale=fr&default_origin=PAR&stops=any&show_hotels=false&powered_by=false&border_radius=30&plain=true&color_button=%2300A991&color_button_text=%23ffffff&promo_id=3414&campaign_id=111';
    script.async = true;
    script.charset = 'utf-8';
    
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div 
        ref={containerRef} 
        className="relative"
        style={{ 
          zIndex: 9999,
          position: 'relative'
        }}
      />
    </div>
  );
}