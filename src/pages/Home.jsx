/* eslint-disable no-unused-vars */
import { useRef, useEffect } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Footer from "@components/shared/Footer";

import { motion } from "framer-motion";
import {
  Locate,
  Star,
  Search,
  Shield,
  Users,
  Wifi,
  Car,
  Utensils,
  GraduationCap,
  Home,
  Award,
  Quote,
  ArrowRight,
  Smartphone,
} from "lucide-react";

import Video from "@assets/Video.mp4";

const Description = ({ description }) => {
  return (
    <div className="flex items-center gap-2">
      <Star className="text-orange-400" />
      <p className="text-sm sm:text-lg md:text-xl font-semibold">
        {description}
      </p>
    </div>
  );
};

const Services = ({ Icon, title, comment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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

const Stat = ({ Icon, value, label }) => {
  const numberRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let trigger;

    if (containerRef.current && numberRef.current) {
      trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: () => {
          const endValue = parseFloat(value);
          const isPercent = value.includes("%");
          const isPlus = value.includes("+");
          gsap.fromTo(
            numberRef.current,
            { textContent: 0 },
            {
              textContent: endValue,
              duration: 1.5,
              ease: "power3.out",
              snap: { textContent: 1 },
              onUpdate: function () {
                let v = Math.floor(numberRef.current.textContent);
                if (!isNaN(endValue) && value.includes(".")) {
                  v = parseFloat(numberRef.current.textContent).toFixed(1);
                }
                numberRef.current.textContent = v;
                if (isPlus) numberRef.current.textContent += "+";
                if (isPercent) numberRef.current.textContent += "%";
              },
            }
          );
          gsap.to(containerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        },
        once: true,
      });
      gsap.set(containerRef.current, { opacity: 0, y: 40 });
    }
    return () => {
      if (trigger) trigger.kill();
    };
  }, [value]);
  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center gap-2 opacity-0"
    >
      <Icon className="text-3xl md:text-4xl text-orange-500" />
      <h3 ref={numberRef} className="text-2xl md:text-3xl font-bold">
        0
      </h3>
      <p className="text-base md:text-lg text-gray-600">{label}</p>
    </div>
  );
};
const Testimonial = ({ author }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
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
            className="w-12 h-12 rounded-full"
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

const Homes = () => {
  const Tableau_Description = [
    "Plus de 10,000 logements",
    "Verifies et securises",
    "Support 24/7",
  ];

  const Tableau_Services = [
    {
      Icon: Shield,
      title: "Logements vérifiés",
      comment:
        "Tous nos logements sont inspectés et certifiés pour votre sécurité et confort.",
    },
    {
      Icon: Users,
      title: "Colocations",
      comment: "Trouvez des colocataires compatibles pour partager votre logement.",
    },
    {
      Icon: Wifi,
      title: "Internet haut débit",
      comment: "Accès à Internet haut débit dans tous nos logements.",
    },
    {
      Icon: Car,
      title: "Parking sécurisé",
      comment: "Des places de parking sécurisées disponibles pour les résidents.",
    },
    {
      Icon: Utensils,
      title: "Restauration",
      comment: "Options de restauration à proximité pour tous les goûts.",
    },
    {
      Icon: GraduationCap,
      title: "Proximité des universités",
      comment:
        "Tous nos logements sont situés à proximité des universités et écoles.",
    },
  ];

  const Tableau_Stats = [
    { Icon: Home, value: "10000+", label: "Logements disponibles" },
    { Icon: Award, value: "4.8/5", label: "Note moyenne des logements" },
    { Icon: Users, value: "5000+", label: "Étudiants satisfaits" },
    { Icon: Star, value: "98%", label: "Taux de satisfaction" },
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      university: "Sorbonne Université",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      text: "Grâce à UniLogis, j'ai trouvé un studio parfait à 10 minutes de mon campus. Le processus était simple et rapide !",
      rating: 5,
    },
    {
      name: "Thomas Martin",
      university: "École Polytechnique",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      text: "La colocation que j'ai trouvée via UniLogis est géniale. Mes colocataires sont devenus mes meilleurs amis !",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      university: "Sciences Po",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      text: "Service client exceptionnel ! Ils m'ont aidée à résoudre tous mes problèmes rapidement. Je recommande vivement.",
      rating: 5,
    },
  ];

  return (
    <div id="smooth-content">
      <header
        data-speed="1"
        data-lag="0.5"
        className="text-white bg-gradient-to-tl from-gray-800 to-transparent -z-0 relative overflow-hidden h-screen flex flex-col justify-center items-center px-4"
      >
        <video
          className="w-full h-full object-cover absolute top-0 left-0 -z-10 contrast-[0.8] brightness-75"
          src={Video}
          autoPlay
          loop
          muted
        />

        <div className="flex flex-col justify-center items-center h-screen w-full max-w-7xl">
          <div className="flex flex-col justify-center items-center gap-4 w-full md:w-3/5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
              Trouvez votre
              <span className="text-orange-500"> logement idéal </span>
              près de votre université
            </h1>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-300 text-center">
              Des milliers de logements étudiants vérifiés, des colocations
              sympa, et des services dédiés pour faciliter votre vie
              universitaire.
            </h3>

            <form className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center bg-white rounded-xl p-4 sm:p-8 w-full max-w-screen-md">
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
            </form>

            <div className="flex flex-wrap justify-center items-center gap-4 mt-8 px-4">
              {Tableau_Description.map((description, index) => (
                <Description description={description} key={index} />
              ))}
            </div>
          </div>
        </div>
      </header>

      <section
        id="Services"
        data-speed="1.1"
        data-lag="0.15"
        className="relative bg-gray-100 p-8 text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-black">
          Des services pensés pour les étudiants
        </h1>
        <br />
        <p className="text-base sm:text-xl text-gray-500 max-w-3xl mx-auto">
          Nous comprenons les besoins spécifiques des étudiants et proposons des
          solutions adaptées pour faciliter votre vie universitaire.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
          {Tableau_Services.map((service, index) => (
            <Services
              Icon={service.Icon}
              title={service.title}
              comment={service.comment}
              key={index}
            />
          ))}
        </div>
      </section>

      <section
        id="Statistiques"
        data-speed="1.1"
        data-lag="0.12"
        className="bg-gradient-to-b from-orange-200 to-gray-100 p-8 text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-bold">
          Des chiffres qui parlent
        </h1>
        <p className="text-base sm:text-xl text-gray-500">
          Des chiffres qui parlent
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-4 sm:p-8">
          {Tableau_Stats.map((stat, index) => (
            <Stat
              Icon={stat.Icon}
              value={stat.value}
              label={stat.label}
              key={index}
            />
          ))}
        </div>
      </section>

      <section
        id="Temoignages"
        data-speed="0.9"
        data-lag="0.08"
        className="bg-gray-100 p-8 text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-bold">
          Ce que disent les étudiants
        </h1>
        <p className="text-base sm:text-xl text-gray-500">
          Des témoignages authentiques de notre communauté
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial author={testimonial} key={index} />
          ))}
        </div>
      </section>

      <section
        id="Contact"
        data-speed="1.1"
        data-lag="0.18"
        className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-8 text-center"
      >
        <div className="flex flex-col justify-center items-center gap-4 w-full md:w-3/5 mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Prêt à trouver votre logement idéal ?
          </h1>
          <br />
          <p className="text-base sm:text-xl">
            Rejoignez des milliers d'étudiants qui ont déjà trouvé leur chez-eux
            grâce à UniLogis. L'inscription est gratuite et ne prend que 2
            minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center mt-4">
            <button className="btn bg-white text-orange-500 rounded-xl py-3 px-6 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto">
              Commencer maintenant
              <ArrowRight className="inline ml-2" />
            </button>
            <button className="btn bg-transparent text-white rounded-xl py-3 px-6 w-full sm:w-auto border border-white hover:bg-white hover:text-orange-500 transition-colors duration-300">
              <Smartphone className="inline mr-2" />
              Télécharger l'application
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-100">
            100% gratuit • Sans engagement • Résultats immédiats
          </p>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default Homes;