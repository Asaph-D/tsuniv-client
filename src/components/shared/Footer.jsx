import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import {
  Locate, Mail, Phone,
  Facebook, Twitter, Instagram, Linkedin
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Footer = () => {
  useEffect(() => {
    ScrollSmoother.create({
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    });
  }, []);

  return (
    <footer data-lag="0.5" className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">TSUniv</h3>
            <p className="text-sm">
              TSUniv est la plateforme de référence pour trouver votre logement étudiant idéal, près de votre campus.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 text-center">Liens rapides</h3>
            <ul className="flex flex-wrap justify-around gap-y-3">
              {["Rechercher un logement", "Témoignages", "Politique de confidentialite", "À propos de nous", 
                "Condition generale d'utilisation"
              ].map((text, i) => (
                <li  key={i} className="speed-link">
                  <a href="#" className=" hover:font-bold transition-all duration-300 ease-in-out">{text}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div >
            <h3 className="text-xl font-bold text-white mb-4 text-center">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Locate size={20} className="mr-2 text-orange-400 flex-shrink-0" />
                <span>123 Rue de l'Université, 75000 Dschang, Cameroun</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-orange-400" />
                <a href="mailto:contact@unilogis.com" className="hover:text-white transition-colors duration-200">contact@Tsuniv.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-orange-400" />
                <span>+237 6 95 05 61 61</span>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div >
            <h3 className="text-xl font-bold text-white mb-4 text-center">Suivez-nous</h3>
            <div className="flex space-x-4 justify-center">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="social-icon p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors duration-300"
                >
                  <Icon size={20} className="text-white" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
