import { useEffect } from "react";
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
            <h3 className="text-xl font-bold text-white mb-4">UniLogis</h3>
            <p className="text-sm">
              UniLogis est la plateforme de référence pour trouver votre logement étudiant idéal, près de votre campus.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              {["Rechercher un logement", "Services", "Témoignages", "À propos de nous"].map((text, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white transition-colors duration-200">{text}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div >
            <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Locate size={20} className="mr-2 text-orange-400 flex-shrink-0" />
                <span>123 Rue de l'Université, 75000 Paris, France</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-orange-400" />
                <a href="mailto:contact@unilogis.com" className="hover:text-white transition-colors duration-200">contact@unilogis.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-orange-400" />
                <span>+33 1 23 45 67 89</span>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div >
            <h3 className="text-xl font-bold text-white mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
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
