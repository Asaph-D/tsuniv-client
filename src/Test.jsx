import { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import CardSearch from "@components/student/search/CardSearch";

const AnimatedCardSearch = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="carousel-item snap-center"
        >
            <CardSearch />
        </motion.div>
    );
};

const Carossel = () => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="w-full mt-8 px-4">
            <div className="relative">
                {/* Scrollable carousel */}
                <div
                    ref={scrollRef}
                    className="carousel carousel-center bg-gradient-to-br from-gray-300 to-orange-200 rounded-box p-6 space-x-4 "
                >
                    {[...Array(6)].map((_, index) => (
                        <AnimatedCardSearch key={index} />
                    ))}
                </div>

                {/* Navigation buttons */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                    <button
                        onClick={scrollLeft}
                        className="btn btn-circle bg-white text-orange-500 border border-orange-300 shadow hover:bg-orange-100"
                    >
                        ❮
                    </button>
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                    <button
                        onClick={scrollRight}
                        className="btn btn-circle bg-white text-orange-500 border border-orange-300 shadow hover:bg-orange-100"
                    >
                        ❯
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carossel;
