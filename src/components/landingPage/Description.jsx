import { motion } from "motion/react"

import {
    Star
} from "lucide-react";
import { fadeIn } from "@utils/Animations";

const Description = ({ description }) => {
    return (
        <motion.div
            variants={fadeIn}
            className="flex items-center gap-2"
        >
            <Star className="text-orange-400" />
            <p className="text-sm sm:text-lg md:text-xl font-semibold">
                {description}
            </p>
        </motion.div>
    );
};

export default Description;