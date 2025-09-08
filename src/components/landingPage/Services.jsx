
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { fadeIn } from "@utils/Animations";

// eslint-disable-next-line no-unused-vars
const Services = ({ Icon, title, comment }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
      className="flex flex-col w-full sm:w-80 lg:w-96 h-56 bg-white rounded-lg shadow-lg p-6 justify-center items-center gap-4 text-center group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6 group-hover:bg-gray-200 transition-colors">
        <Icon className="h-8 w-8 text-orange-600" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      <p className="text-xs sm:text-sm">{comment}</p>
    </motion.div>
  );
};

export default Services;