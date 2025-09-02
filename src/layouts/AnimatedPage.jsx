{/*Ce composant sert a enveloppper toutes les 
    pages protegees afin de declancher une animation d'entree 
   et de sortie*/}

import { useLocation } from "react-router";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const variants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
};

const transition = { duration: 0.5, ease: "easeOut" };

const AnimatedPage = ({ children }) => {
    //Cette constante permet de capturer l'url (Search, Profile...etc)
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" >  
            <motion.div
                key={location.pathname}  //Elle permet d'indentifier chaque page par son Url
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default AnimatedPage;
