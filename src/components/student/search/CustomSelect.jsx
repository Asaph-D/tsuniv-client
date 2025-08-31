import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useStudentSearchStore } from "@stores/studentSearchStore";

const CustomSelect = ({ options, type, defaultValue }) => {
    const [open, setOpen] = useState(false);

    // On sélectionne l'état et l'action correspondante depuis le store
    const selected = useStudentSearchStore(state => state[type]);
    const setSelected = useStudentSearchStore(state => state[`set${type.charAt(0).toUpperCase() + type.slice(1)}`]);

    return (
        <div className="relative w-full max-w-xl">
            <button
                onClick={() => setOpen(!open)}
                className={`flex justify-between items-center w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm transition duration-200 ${open ? "bg-orange-50" : "bg-white"} hover:border-orange-400 hover:shadow-md`}
            >
                <span className="font-medium text-gray-700">{selected || defaultValue}</span>
                <div className={`w-6 h-6 flex items-center justify-center rounded-full transition ${open ? "bg-orange-100 rotate-180" : "bg-gray-100"}`}>
                    <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                    >
                        {options.map((option) => (
                            <li
                                key={option}
                                onClick={() => {
                                    setSelected(option);
                                    setOpen(false);
                                }}
                                className={`px-4 py-2 cursor-pointer transition duration-150 ${selected === option ? "bg-orange-500 text-white font-semibold" : "text-gray-700 hover:bg-orange-50"}`}
                            >
                                {option}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomSelect;