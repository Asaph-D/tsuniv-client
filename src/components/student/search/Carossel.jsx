import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CardSearch from "@components/student/search/CardSearch";

const Carossel = ({ cards }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef(null);
    const intervalRef = useRef(null);

    const next = () => {
        setActiveIndex((prev) => {
            const newIndex = (prev + 1) % cards.length;
            if (carouselRef.current) {
                const cardWidth = carouselRef.current.querySelector('.carousel-item').clientWidth;
                carouselRef.current.scrollTo({ left: newIndex * (cardWidth + 24), behavior: 'smooth' });
            }
            return newIndex;
        });
    };

    const prev = () => {
        setActiveIndex((prev) => {
            const newIndex = (prev - 1 + cards.length) % cards.length;
            if (carouselRef.current) {
                const cardWidth = carouselRef.current.querySelector('.carousel-item').clientWidth;
                carouselRef.current.scrollTo({ left: newIndex * (cardWidth + 24), behavior: 'smooth' });
            }
            return newIndex;
        });
    };

    const goToSlide = (index) => {
        setActiveIndex(index);
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.querySelector('.carousel-item').clientWidth;
            carouselRef.current.scrollTo({ left: index * (cardWidth + 24), behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        if (carouselRef.current) {
            const scrollLeft = carouselRef.current.scrollLeft;
            const cardWidth = carouselRef.current.querySelector('.carousel-item').clientWidth + 24; // Largeur de la carte + le gap
            const newIndex = Math.round(scrollLeft / cardWidth);
            setActiveIndex(newIndex);
        }
    };

    const startAutoplay = () => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            if (!isPaused) next();
        }, 5000);
    };

    const stopAutoplay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        const carouselElement = carouselRef.current;
        if (carouselElement) {
            carouselElement.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isPaused, cards.length]);

    return (
        <div className="relative flex justify-center">
            {/* Dots de navigation en haut à droite */}
            <div className="absolute top-2 right-2 flex space-x-2 z-20">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${activeIndex === index ? 'bg-orange-500' : 'bg-gray-400'
                            }`}
                    ></button>
                ))}
            </div>

            <div
                ref={carouselRef}
                className="relative carousel carousel-center p-8 bg-gradient-to-br from-gray-300 to-orange-200 rounded-box gap-6 h-[600px] overflow-x-scroll scrollbar-hide"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Cartes animées */}
                {cards.map((elem, index) => (
                    <motion.div
                        key={index}
                        className="carousel-item mx-auto"
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ amount: 0.4 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <CardSearch room={elem} />
                    </motion.div>
                ))}
            </div>
            {/* Navigation centrée verticalement */}
            <div className="absolute w-full bottom-1/2 flex transform justify-between z-10">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prev}
                    className="btn btn-circle bg-white text-orange-500 border border-orange-300 shadow hover:bg-orange-100"
                >
                    ❮
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={next}
                    className="btn btn-circle bg-white text-orange-500 border border-orange-300 shadow hover:bg-orange-100"
                >
                    ❯
                </motion.button>
            </div>
        </div>
    );
};

export default Carossel;