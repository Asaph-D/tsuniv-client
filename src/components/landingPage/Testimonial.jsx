import { useRef } from "react";
import { useInView } from "motion/react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Star,
  Quote,
} from "lucide-react";
import { fadeIn } from "@utils/Animations";

const Testimonial = ({ author }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
      className="w-full sm:w-80 lg:w-96 h-80 bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4"
    >
      <p className="text-lg sm:text-xl italic">
        <Quote className="text-orange-400" /> <br /> {author.text}
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex justify-items-start">
          {Array.from({ length: 4 }).map((_, index) => (
            <Star key={index} className="text-orange-400" />
          ))}
        </div>
        <div className="flex items-center gap-4">
          <img
            src={author.image}
            alt={author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold">{author.name}</h4>
            <p className="text-sm text-gray-500">{author.university}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonial;