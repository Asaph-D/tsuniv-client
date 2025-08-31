// components/shared/LazyImage.tsx
import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const LazyImage = forwardRef(({ src, alt, className }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const localRef = useRef(null);

    useEffect(() => {
        const target = typeof ref === 'function' ? null : ref?.current || localRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px' }
        );

        if (target) observer.observe(target);
        return () => observer.disconnect();
    }, [ref]);

    return isVisible ? (
        <motion.img
            ref={ref || localRef}
            src={src}
            alt={alt}
            className={className}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        />
    ) : (
        <div ref={ref || localRef} className="w-full h-24 bg-base-200 rounded border" />
    );
});

export default LazyImage;
