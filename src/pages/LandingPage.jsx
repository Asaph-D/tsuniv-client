import { useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion} from "framer-motion";
import {
  Locate,
  Search,
  ArrowRight,
  Smartphone,
} from "lucide-react";
import { staggerContainer } from "@utils/Animations";

import Footer from "@components/shared/Footer";
import NavBar from "@components/shared/NavBar";
import Stat from "@components/landingPage/Stat"
import Services from '@components/landingPage/Services'
import Testimonial from '@components/landingPage/Testimonial'
import Description from "@components/landingPage/Description"
import Video from "@assets/Video.mp4";
import { Tableau_Services, Tableau_Stats, testimonials } from "@utils/Const"

const LandingPage = () => {
  const Tableau_Description = [
    "Plus de 10,000 logements",
    "Verifies et securises",
    "Support 24/7",
  ];

  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.matchMedia("(min-width: 600px)").matches) {
        const { scrollTop } = document.documentElement;
        scrollTop > 240
          ? videoRef.current?.classList.add("scrollimage")
          : videoRef.current?.classList.remove("scrollimage");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>

      <div id="smooth-content">
        <NavBar />
        {/* Hero Section */}
        <header className="text-white bg-gradient-to-tl from-gray-800 to-transparent -z-0 relative overflow-hidden h-screen flex flex-col justify-center items-center px-4">
          <video
            className="w-full h-full object-cover absolute top-0 left-0 -z-10 contrast-[0.8] brightness-75"
            ref={videoRef}
            src={Video}
            autoPlay
            loop
            muted
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col justify-center items-center h-screen w-full max-w-7xl top-20"
          >
            <div className="flex flex-col justify-center items-center gap-4 w-full md:w-3/5">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center"
              >
                Trouvez votre
                <span className="text-orange-500"> logement idéal </span>
                près de votre université
              </motion.h1>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-300 text-center"
              >
                Des milliers de logements étudiants vérifiés, des colocations
                sympa, et des services dédiés pour faciliter votre vie
                universitaire.
              </motion.h3>

              <motion.form
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center bg-white rounded-xl p-4 sm:p-8 w-full max-w-screen-md"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ville ou Universite..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <Locate size={24} className="absolute left-3 top-3 text-gray-400" />
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none">
                    <option>Type de logement</option>
                    <option>Studio</option>
                    <option>T1</option>
                    <option>T2</option>
                    <option>Colocation</option>
                  </select>
                </div>

                <button className="btn bg-amber-600 text-amber-50 rounded-xl py-3 px-6 w-full">
                  Rechercher
                </button>
              </motion.form>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center items-center gap-4 mt-8 px-4"
              >
                {Tableau_Description.map((description, index) => (
                  <Description description={description} key={index} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </header>

        {/* Services Section */}
        <section id="Services" className="relative bg-gray-100 p-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-black"
          >
            Des services pensés pour les étudiants
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-gray-500 max-w-3xl mx-auto mt-4"
          >
            Nous comprenons les besoins spécifiques des étudiants et proposons des
            solutions adaptées pour faciliter votre vie universitaire.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center items-center gap-8 mt-12"
          >
            {Tableau_Services.map((service, index) => (
              <Services
                Icon={service.Icon}
                title={service.title}
                comment={service.comment}
                key={index}
              />
            ))}
          </motion.div>
        </section>

        {/* Statistics Section */}
        <section id="Statistiques" className="bg-gradient-to-b from-orange-200 to-gray-100 p-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold"
          >
            Des chiffres qui parlent
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-gray-500 mt-4"
          >
            Notre impact en quelques chiffres
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 p-4 sm:p-8 mt-8"
          >
            {Tableau_Stats.map((stat, index) => (
              <Stat
                Icon={stat.Icon}
                value={stat.value}
                label={stat.label}
                key={index}
                index={index}
              />
            ))}
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section id="Temoignages" className="bg-gray-100 p-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold"
          >
            Ce que disent les étudiants
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-gray-500 mt-4"
          >
            Des témoignages authentiques de notre communauté
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center items-center gap-8 mt-12"
          >
            {testimonials.map((testimonial, index) => (
              <Testimonial author={testimonial} key={index} />
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section id="Contact" className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-center gap-4 w-full md:w-3/5 mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl font-bold">
              Prêt à trouver votre logement idéal ?
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-xl mt-4"
            >
              Rejoignez des milliers d'étudiants qui ont déjà trouvé leur chez-eux
              grâce à UniLogis. L'inscription est gratuite et ne prend que 2
              minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center items-center mt-8 gap-4"
            >
              <button className="btn bg-white text-orange-500 rounded-xl py-3 px-6 w-full sm:w-auto hover:bg-gray-100 transition-colors">
                Commencer maintenant
                <ArrowRight className="inline ml-2" />
              </button>
              <button className="btn bg-transparent text-white rounded-xl py-3 px-6 w-full sm:w-auto border border-white hover:bg-white hover:text-orange-500 transition-colors duration-300">
                <Smartphone className="inline mr-2" />
                Télécharger l'application
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-xs sm:text-sm text-gray-100 mt-4"
            >
              100% gratuit • Sans engagement • Résultats immédiats
            </motion.p>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;