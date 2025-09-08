import { useEffect, useState } from "react";
import { Home, BarChart2, MessageCircle, PhoneCall, LogIn } from "lucide-react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Tab_Ancrages = [
  { id: "Services", icon: <Home size={20} />, label: "Services" },
  { id: "Statistiques", icon: <BarChart2 size={20} />, label: "Statistiques" },
  { id: "Temoignages", icon: <MessageCircle size={20} />, label: "Temoignages" },
  { id: "Contact", icon: <PhoneCall size={20} />, label: "Contact" },
];

let smoother;

function scrollToSection(id) {
  smoother?.scrollTo(`#${id}`, true, "power4.inOut");
}

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!smoother) {
      smoother = ScrollSmoother.create({
        smooth: 5,
        normalizeScroll: true,
        smoothTouch: 0.3,
        effects: true,
      });
    }

    const handleScroll = () => {
      setScrolled(window.scrollY >= 100);
    };
    window.addEventListener("scroll", handleScroll);

    Tab_Ancrages.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "center center",
        end: "bottom center",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
        markers: true,
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Top NavBar */}
      <motion.nav
        role="navigation"
        aria-label="Navigation principale"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center
          transition-all duration-700
          ${scrolled ? "backdrop-blur-md bg-white/60 text-black shadow-md" : "bg-transparent text-white"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Home size={32} />
          <Link
            to="/"
            className="text-2xl font-bold 
            bg-gradient-to-bl from-orange-400 to-gray-400 text-transparent bg-clip-text"
          >
            TS_UNIV
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {Tab_Ancrages.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(label)}
              className={`text-lg font-semibold transition-colors duration-300 cursor-pointer
                ${activeSection == label ? "text-orange-500" : ""}
                hover:text-orange-400`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4">
          <Link className="btn btn-ghost" to="/login">Connexion</Link>
          <Link className="btn bg-yellow-600 text-white" to="/register">S'inscrire</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex gap-4 text-white md:hidden" >
          <Link to="/login" className="flex flex-col items-center hover:scale-105 transition-all duration-300 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span className={`${scrolled && `text-black font-bold`} transition-all duration-1000 ease-in-out origin-center`}>Login</span>
          </Link>

          <Link to="/register" className="flex flex-col items-center hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className={`${scrolled && `text-black font-bold`} transition-all duration-1000 ease-in-out origin-center`}>Sign Up</span>
          </Link>

        </div>

      </motion.nav>

      {/* Bottom Mobile Sidebar */}

      <div className="flex justify-center fixed bottom-0 w-full z-40 backdrop-blur-md bg-white/80 border-t 
border-gray-200 shadow-inner md:hidden rounded-2xl">
        <ul className="menu menu-horizontal justify-around px-2 py-3 text-sm">
          {Tab_Ancrages.map(({ id, icon, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`flex flex-col items-center gap-1 ${activeSection === id ? "text-orange-500 font-semibold" : "text-gray-700"
                  } hover:text-orange-400`}
              >
                {icon}
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

    </>
  );
};

export default NavBar;
