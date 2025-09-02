import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useStudentSearchStore } from "@stores/studentSearchStore";

const CustomSelect = ({ options, type, defaultValue }) => {
    const [open, setOpen] = useState(false);

    const selected = useStudentSearchStore(state => state[type]);
    const setSelected = useStudentSearchStore(
        state => state[`set${type.charAt(0).toUpperCase() + type.slice(1)}`]
    );

    return (
        <div className="relative w-full max-w-xl">
            <button
                onClick={() => setOpen(!open)}
                className={`flex justify-between items-center w-full px-4 py-2 rounded-xl border border-[var(--color-base-300)] shadow-sm transition duration-200 ${open ? "bg-[var(--color-warning-content)]" : "bg-[var(--color-base-100)]"
                    } hover:border-[var(--color-warning)] hover:shadow-md`}
            >
                <span className="font-medium text-[var(--color-base-content)]">
                    {selected || defaultValue}
                </span>
                <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full transition ${open
                            ? "bg-[var(--color-warning)] rotate-180"
                            : "bg-[var(--color-base-200)]"
                        }`}
                >
                    <svg
                        className="w-4 h-4 text-[var(--color-warning-content)]"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
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
                        className="absolute z-10 mt-2 w-full bg-[var(--color-base-100)] border border-[var(--color-base-300)] rounded-xl shadow-lg overflow-hidden"
                    >
                        {options.map((option) => (
                            <li
                                key={option}
                                onClick={() => {
                                    setSelected(option);
                                    setOpen(false);
                                }}
                                className={`px-4 py-2 cursor-pointer transition duration-150 ${selected === option
                                        ? "bg-[var(--color-primary)] text-[var(--color-primary-content)] font-semibold"
                                        : "text-[var(--color-base-content)] hover:bg-[var(--color-warning-content)]"
                                    }`}
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
