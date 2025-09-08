import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";

// eslint-disable-next-line no-unused-vars
const Stat = ({ Icon, value, label, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    // Extraction des données
    const rawValue = parseFloat(value.replace(/[^\d.]/g, ""));
    const suffix = value.replace(/[\d.,]/g, "").trim();
    const isDecimal = value.includes(".");

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = isNaN(rawValue) ? 0 : rawValue;
            const duration = 1000;
            const increment = end / (duration / 16);

            const counter = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(counter);
                } else {
                    setCount(start);
                }
            }, 16);

            return () => clearInterval(counter);
        }
    }, [isInView, rawValue]);

    const formatNumber = (num) => {
        const rounded = isDecimal ? num.toFixed(1) : Math.floor(num);
        return Number(rounded).toLocaleString("fr-FR");
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            className="flex flex-col items-center justify-center gap-2"
        >
            <Icon className="text-3xl md:text-4xl text-orange-500" />
            <h3 className="text-2xl md:text-3xl font-bold">
                {formatNumber(count)}{suffix}
            </h3>
            <p className="text-base md:text-lg text-gray-600">{label}</p>
        </motion.div>
    );
};

export default Stat;
