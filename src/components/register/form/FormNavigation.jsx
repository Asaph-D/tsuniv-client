// components/register/FormNavigation.tsx
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import useInscriptionStore from '@stores/studentRegistrationStore';
import validateStep from '@hooks/useValidationStudent';

export default function FormNavigation({  steps }) {
    const currentStep = useInscriptionStore(s => s.currentStep);
    const setCurrentStep = useInscriptionStore(s => s.setCurrentStep);

    const nextStep = () => {
        // Validation différée pour éviter blocage du thread principal
        requestIdleCallback(() => {
            const isValid = validateStep(currentStep);
            if (isValid) {
                setCurrentStep(currentStep + 1);
            }
        });
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn btn-outline order-2 sm:order-1"
            >
                <ChevronLeft className="w-4 h-4" />
                Précédent
            </button>

            {currentStep < steps.length  &&
                <button
                    onClick={nextStep}
                    className="btn btn-primary order-1 sm:order-2"
                >
                    Suivant
                    <ChevronRight className="w-4 h-4" />
                </button>
             }
        </div>
    );
}
