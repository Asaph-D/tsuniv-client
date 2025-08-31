import React, { lazy, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { User, Users, FileText, Settings } from 'lucide-react';

import useInscriptionStore from '@stores/studentRegistrationStore';
import StepIndicator from '@components/register/StepIndicator';
import FormNavigation from '@components/register/form/FormNavigation';


const PersonalInfo = lazy(() => import('@components/register/steps/PersonalInfo')); 
const Documents = lazy(() => import('@components/register/steps/Documents'));
const ParentInfo = lazy(() => import('@components/register/steps/ParentInfo'));
const Confirmation = lazy(() => import('@components/register/steps/Confirmation'));

const steps = [
    { id: 1, title: 'Informations personnelles', icon: User },
    { id: 2, title: 'Documents d\'identité', icon: FileText },
    { id: 3, title: 'Profil parental', icon: Users },
    { id: 4, title: 'Confirmation', icon: Settings },
];

const InscriptionMultiEtape = () => {
    const currentStep = useInscriptionStore(s => s.currentStep);


    // 🔄 Préchargement des étapes suivantes pour éviter les délais de lazy loading
    useEffect(() => {
        if (currentStep === 1) import('@components/register/steps/Documents');
        if (currentStep === 2) import('@components/register/steps/ParentInfo');
        if (currentStep === 3) import('@components/register/steps/Confirmation');
    }, [currentStep]);

    

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <PersonalInfo />;
            case 2: return <Documents />;
            case 3: return <ParentInfo />;
            case 4: return <Confirmation />;
            default: return null;
        }
    };

    const variants = {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -30 },
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8 text-center">
                <h1 className="text-2xl md:text-3xl font-bold">Inscription Étudiant</h1>
                <p className="opacity-70">Complétez votre inscription en 4 étapes</p>
            </div>

            <StepIndicator steps={steps} currentStep={currentStep} />

            <motion.div
                key={currentStep}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="card bg-base-100 shadow-xl"
            >
                <div className="card-body">
                    <h2 className="card-title flex items-center gap-2">
                        {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5" })}
                        {steps[currentStep - 1].title}
                    </h2>
                    <p className="opacity-70 mb-6">Étape {currentStep} sur {steps.length}</p>
                    {renderStep()}
                </div>
            </motion.div>

            <FormNavigation steps={steps} />
        </div>
    );
};

export default InscriptionMultiEtape;
