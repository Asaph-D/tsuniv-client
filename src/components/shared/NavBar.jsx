import { useEffect, useState } from "react";
import { Home, Menu, BarChart2, MessageCircle, PhoneCall } from "lucide-react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { motion, AnimatePresence } from "framer-motion";

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
  const [menuOpen, setMenuOpen] = useState(false);

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
      setScrolled(window.scrollY >= window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);

    Tab_Ancrages.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "center center",
        end: "bottom center",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
        markers : true,
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
            className="text-2xl font-bold bg-gradient-to-bl from-orange-400 to-gray-400 text-transparent bg-clip-text"
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
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={28} />
        </button>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white text-black shadow-md flex flex-col items-center py-4 gap-4 md:hidden"
            >
              {Tab_Ancrages.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollToSection(id);
                    setMenuOpen(false);
                  }}
                  className={`text-lg font-semibold transition-colors duration-300
                    ${activeSection === id ? "text-orange-500" : ""}
                    hover:text-orange-400`}
                >
                  {label}
                </button>
              ))}
              <Link className="btn btn-ghost w-3/4" to="/login">Connexion</Link>
              <Link className="btn bg-yellow-600 text-white w-3/4" to="/register">S'inscrire</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Bottom Mobile Sidebar */}

<div className="flex justify-center fixed bottom-0 w-full z-40 backdrop-blur-md bg-white/80 border-t 
border-gray-200 shadow-inner md:hidden rounded-2xl">
  <ul className="menu menu-horizontal justify-around px-2 py-3 text-sm">
    {Tab_Ancrages.map(({ id, icon, label }) => (
      <li key={id}>
        <button
          onClick={() => scrollToSection(id)}
          className={`flex flex-col items-center gap-1 ${
            activeSection === id ? "text-orange-500 font-semibold" : "text-gray-700"
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
