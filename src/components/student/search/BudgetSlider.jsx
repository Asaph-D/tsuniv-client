import { useState, useRef, useEffect } from "react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useStudentSearchStore } from "@stores/studentSearchStore";

const BudgetSlider = () => {
    // On utilise les valeurs du store Zustand
    const priceRange = useStudentSearchStore(state => state.priceRange);
    const setPriceRange = useStudentSearchStore(state => state.setPriceRange);

    const sliderRef = useRef(null);
    const [thumbPositions, setThumbPositions] = useState([0, 0]);

    useEffect(() => {
        const thumbs = sliderRef.current?.querySelectorAll(".range-slider__thumb");
        if (thumbs?.length === 2) {
            const rect = sliderRef.current.getBoundingClientRect();
            const left0 = thumbs[0].getBoundingClientRect().left - rect.left;
            const left1 = thumbs[1].getBoundingClientRect().left - rect.left;
            setThumbPositions([left0, left1]);
        }
    }, [priceRange]);

    return (
        <div className="w-full max-w-xl px-4 mt-6 relative">
            <label className="block mb-2 font-semibold text-gray-700">Budget mensuel</label>

            <div className="absolute bottom-[60px] left-[30px] min-w-full h-0 pointer-events-none z-10">
                <div
                    className="absolute transform -translate-x-1/2 -translate-y-full bg-white text-orange-500 text-xs font-semibold px-2 py-1 rounded border border-orange-500 shadow"
                    style={{ left: `${thumbPositions[0]}px` }}
                >
                    {priceRange[0].toLocaleString()} XAF
                </div>
                <div
                    className="absolute transform -translate-x-1/2 -translate-y-full bg-white text-orange-500 text-xs font-semibold px-2 py-1 rounded border border-orange-500 shadow"
                    style={{ left: `${thumbPositions[1]}px` }}
                >
                    {priceRange[1].toLocaleString()} XAF
                </div>
            </div>

            <div ref={sliderRef}>
                <RangeSlider
                    id="range-slider-gradient"
                    className="range-slider-custom margin-lg"
                    step={1000}
                    min={8000}
                    max={150000}
                    value={priceRange}
                    onInput={setPriceRange}
                />
            </div>

            <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Min: {priceRange[0].toLocaleString()} XAF</span>
                <span>Max: {priceRange[1].toLocaleString()} XAF</span>
            </div>
        </div>
    );
};

export default BudgetSlider;