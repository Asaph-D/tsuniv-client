export const buttonVariants = {
  initial: { scale: 1, opacity: 0.8 },
  hover: { scale: 1.05, opacity: 1 },
  tap: { scale: 0.95 },
};

export const transition = {
  duration: 0.3,
  ease: [0.33, 1, 0.68, 1], 
};

export const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
