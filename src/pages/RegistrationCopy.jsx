import  { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Calendar, 
  GraduationCap, 
  MapPin, 
  Upload, 
  Eye, 
  EyeOff,
  Check,
  Home,
  FileText,
  Users
} from 'lucide-react';



const initialFormData = {
  email: '',
  motDePasse: '',
  confirmPassword: '',
  nom: '',
  prenom: '',
  telephone: '',
  consentementCGU: false,
  sexe: '',
  dateNaissance: '',
  typeDocument: '',
  niveauEtude: '',
  universite: '',
  villeEtude: '',
  parentNom: '',
  parentLienParente: '',
  parentTelephone: '',
  photoIdentite: null,
  pieceIdentite: null
};

export default function MultiStepRegistration({ onBackToHome, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const totalSteps = 5;

  const steps = [
    { number: 1, title: 'Informations personnelles', icon: User },
    { number: 2, title: 'Informations étudiantes', icon: GraduationCap },
    { number: 3, title: 'Contact parental', icon: Users },
    { number: 4, title: 'Documents', icon: FileText },
    { number: 5, title: 'Confirmation', icon: Check }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.email) newErrors.email = 'Email requis';
        if (!formData.motDePasse) newErrors.motDePasse = 'Mot de passe requis';
        if (formData.motDePasse !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        if (!formData.nom) newErrors.nom = 'Nom requis';
        if (!formData.prenom) newErrors.prenom = 'Prénom requis';
        if (!formData.telephone) newErrors.telephone = 'Téléphone requis';
        break;
      case 2:
        if (!formData.sexe) newErrors.sexe = 'Sexe requis';
        if (!formData.dateNaissance) newErrors.dateNaissance = 'Date de naissance requise';
        if (!formData.typeDocument) newErrors.typeDocument = 'Type de document requis';
        if (!formData.niveauEtude) newErrors.niveauEtude = 'Niveau d\'étude requis';
        if (!formData.universite) newErrors.universite = 'Université requise';
        if (!formData.villeEtude) newErrors.villeEtude = 'Ville d\'étude requise';
        break;
      case 3:
        if (!formData.parentNom) newErrors.parentNom = 'Nom du parent requis';
        if (!formData.parentLienParente) newErrors.parentLienParente = 'Lien de parenté requis';
        if (!formData.parentTelephone) newErrors.parentTelephone = 'Téléphone du parent requis';
        break;
      case 4:
        if (!formData.photoIdentite) newErrors.photoIdentite = 'Photo d\'identité requise';
        if (!formData.pieceIdentite) newErrors.pieceIdentite = 'Pièce d\'identité requise';
        break;
      case 5:
        if (!formData.consentementCGU) newErrors.consentementCGU = 'Vous devez accepter les CGU';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Formatage des données selon le modèle Prisma
      const userData = {
        // Données utilisateur
        email: formData.email,
        motDePasse: formData.motDePasse,
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        role: 'ETUDIANT',
        consentementCGU: formData.consentementCGU,
        
        // Données étudiant
        etudiant: {
          sexe: formData.sexe,
          dateNaissance: new Date(formData.dateNaissance),
          typeDocument: formData.typeDocument,
          niveauEtude: formData.niveauEtude,
          universite: formData.universite,
          villeEtude: formData.villeEtude,
          
          // Profil parental
          profilParental: {
            nom: formData.parentNom,
            lienParente: formData.parentLienParente,
            telephone: formData.parentTelephone
          }
        },
        
        // URLs des fichiers (à traiter côté serveur)
        photoIdentiteFile: formData.photoIdentite,
        pieceIdentiteFile: formData.pieceIdentite
      };

      onComplete(userData);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const stepVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      x: -50,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => handleInputChange('prenom', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.prenom ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Votre prénom"
                />
                {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => handleInputChange('nom', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.nom ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Votre nom"
                />
                {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="votre@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.telephone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="06 12 34 56 78"
                />
              </div>
              {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.motDePasse}
                  onChange={(e) => handleInputChange('motDePasse', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.motDePasse ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.motDePasse && <p className="text-red-500 text-sm mt-1">{errors.motDePasse}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sexe *
                </label>
                <select
                  value={formData.sexe}
                  onChange={(e) => handleInputChange('sexe', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.sexe ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner</option>
                  <option value="HOMME">Homme</option>
                  <option value="FEMME">Femme</option>
                  <option value="AUTRE">Autre</option>
                </select>
                {errors.sexe && <p className="text-red-500 text-sm mt-1">{errors.sexe}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.dateNaissance}
                    onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.dateNaissance ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.dateNaissance && <p className="text-red-500 text-sm mt-1">{errors.dateNaissance}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de document d'identité *
              </label>
              <select
                value={formData.typeDocument}
                onChange={(e) => handleInputChange('typeDocument', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.typeDocument ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionner un document</option>
                <option value="CNI">Carte Nationale d'Identité</option>
                <option value="PASSEPORT">Passeport</option>
                <option value="TITRE_SEJOUR">Titre de séjour</option>
              </select>
              {errors.typeDocument && <p className="text-red-500 text-sm mt-1">{errors.typeDocument}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau d'étude *
              </label>
              <input
                type="text"
                value={formData.niveauEtude}
                onChange={(e) => handleInputChange('niveauEtude', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.niveauEtude ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Licence 2, Master 1, etc."
              />
              {errors.niveauEtude && <p className="text-red-500 text-sm mt-1">{errors.niveauEtude}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Université *
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.universite}
                  onChange={(e) => handleInputChange('universite', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.universite ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nom de votre université"
                />
              </div>
              {errors.universite && <p className="text-red-500 text-sm mt-1">{errors.universite}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville d'étude *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.villeEtude}
                  onChange={(e) => handleInputChange('villeEtude', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.villeEtude ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ville où vous étudiez"
                />
              </div>
              {errors.villeEtude && <p className="text-red-500 text-sm mt-1">{errors.villeEtude}</p>}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <p className="text-blue-800 text-sm">
                <Users className="inline h-4 w-4 mr-2" />
                Ces informations nous permettent de contacter un proche en cas d'urgence.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du contact parental *
              </label>
              <input
                type="text"
                value={formData.parentNom}
                onChange={(e) => handleInputChange('parentNom', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.parentNom ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nom et prénom"
              />
              {errors.parentNom && <p className="text-red-500 text-sm mt-1">{errors.parentNom}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lien de parenté *
              </label>
              <select
                value={formData.parentLienParente}
                onChange={(e) => handleInputChange('parentLienParente', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.parentLienParente ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionner</option>
                <option value="Père">Père</option>
                <option value="Mère">Mère</option>
                <option value="Tuteur légal">Tuteur légal</option>
                <option value="Autre">Autre</option>
              </select>
              {errors.parentLienParente && <p className="text-red-500 text-sm mt-1">{errors.parentLienParente}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone du contact *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.parentTelephone}
                  onChange={(e) => handleInputChange('parentTelephone', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.parentTelephone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="06 12 34 56 78"
                />
              </div>
              {errors.parentTelephone && <p className="text-red-500 text-sm mt-1">{errors.parentTelephone}</p>}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="bg-orange-50 p-4 rounded-xl mb-6">
              <p className="text-orange-800 text-sm">
                <FileText className="inline h-4 w-4 mr-2" />
                Téléchargez vos documents pour vérifier votre identité. Formats acceptés: JPG, PNG, PDF (max 5MB)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo d'identité *
              </label>
              <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                errors.photoIdentite ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
              }`}>
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange('photoIdentite', e.target.files?.[0] || null)}
                  className="hidden"
                  id="photoIdentite"
                />
                <label htmlFor="photoIdentite" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    Cliquez pour télécharger
                  </span>
                  <span className="text-gray-500"> ou glissez-déposez</span>
                </label>
                {formData.photoIdentite && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ {formData.photoIdentite.name}
                  </p>
                )}
              </div>
              {errors.photoIdentite && <p className="text-red-500 text-sm mt-1">{errors.photoIdentite}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pièce d'identité *
              </label>
              <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                errors.pieceIdentite ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
              }`}>
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange('pieceIdentite', e.target.files?.[0] || null)}
                  className="hidden"
                  id="pieceIdentite"
                />
                <label htmlFor="pieceIdentite" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    Cliquez pour télécharger
                  </span>
                  <span className="text-gray-500"> ou glissez-déposez</span>
                </label>
                {formData.pieceIdentite && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ {formData.pieceIdentite.name}
                  </p>
                )}
              </div>
              {errors.pieceIdentite && <p className="text-red-500 text-sm mt-1">{errors.pieceIdentite}</p>}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="bg-green-50 p-6 rounded-xl mb-6">
              <div className="flex items-center mb-4">
                <Check className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-green-800">
                  Récapitulatif de votre inscription
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Nom:</span>
                    <span className="ml-2 text-gray-900">{formData.nom}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Prénom:</span>
                    <span className="ml-2 text-gray-900">{formData.prenom}</span>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-900">{formData.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Université:</span>
                  <span className="ml-2 text-gray-900">{formData.universite}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Ville d'étude:</span>
                  <span className="ml-2 text-gray-900">{formData.villeEtude}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.consentementCGU}
                  onChange={(e) => handleInputChange('consentementCGU', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                />
                <span className="ml-3 text-sm text-gray-700">
                  J'accepte les{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                    conditions générales d'utilisation
                  </a>{' '}
                  et la{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                    politique de confidentialité
                  </a>{' '}
                  d'UniLogis. *
                </span>
              </label>
              {errors.consentementCGU && <p className="text-red-500 text-sm">{errors.consentementCGU}</p>}

              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-blue-800 text-sm">
                  En créant votre compte, vous rejoignez une communauté de plus de 25,000 étudiants 
                  qui ont trouvé leur logement idéal avec UniLogis.
                </p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl relative z-10"
      >
        {/* Header */}
        <motion.div className="text-center mb-8">
          <motion.div
            className="flex items-center justify-center mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-white p-3 rounded-2xl shadow-lg">
              <Home className="h-8 w-8 text-blue-700" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Inscription UniLogis</h1>
          <p className="text-blue-100">Créez votre compte étudiant en quelques étapes</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    currentStep >= step.number
                      ? 'bg-white text-blue-700 shadow-lg'
                      : 'bg-blue-600 text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </motion.div>
                <span className="text-xs text-blue-100 mt-2 text-center max-w-20">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-blue-600 rounded-full h-2">
            <motion.div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Form container */}
        <motion.div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <motion.button
              onClick={currentStep === 1 ? onBackToHome : prevStep}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {currentStep === 1 ? 'Accueil' : 'Précédent'}
            </motion.button>

            <motion.button
              onClick={currentStep === totalSteps ? handleSubmit : nextStep}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {currentStep === totalSteps ? 'Créer mon compte' : 'Suivant'}
              <ArrowRight className="h-5 w-5 ml-2" />
            </motion.button>
          </div>
        </motion.div>

        {/* Step indicator */}
        <motion.div className="text-center mt-6">
          <p className="text-blue-100 text-sm">
            Étape {currentStep} sur {totalSteps}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}