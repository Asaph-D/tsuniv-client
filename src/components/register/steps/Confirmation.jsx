import { useState, useRef, useEffect, useCallback} from 'react';
import { CheckCircle } from 'lucide-react';

import html2pdf from 'html2pdf.js';
import useInscriptionStore from '@stores/studentRegistrationStore';
import StudentSummary from '@components/register/StudentSummary';
import validateStep from '@hooks/useValidationStudent';
import SuccessStep from '../../shared/SucessStep';
import DialogPopup from '../pdf/DialogPopup';
import Toast from '@utils/Toast';
import GlobalPreload from '../GlobalPreload';
import Finalize from '../Finalize';
import Header from './Header';
import ResumeInfoParent from '../ResumeInfoParent';
import ResumeDocument from '../ResumeDocument';

import axiosInstance from '@services/axiosInstance';

const ConfirmationWithFinalization = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
    const pdfRef = useRef(null);

    const formData = useInscriptionStore((s) => s.formData);
    const filePreviews = useInscriptionStore((s) => s.filePreviews);
    const updateFormData = useInscriptionStore((s) => s.updateFormData);
    const resetForm = useInscriptionStore((s) => s.resetForm);
    const currentStep = useInscriptionStore(s => s.currentStep);

    // Fonction de soumission mémorisée
    const handleSubmit = useCallback(() => {
        // ⏳ Validation différée pour fluidifier l'expérience
        requestIdleCallback(() => {
            const isValid = validateStep(currentStep);
            if (!isValid) return;

            if (!formData.consentementCGU) {
                Toast("Vous devez accepter les CGU pour finaliser l'inscription.", "error");
                return;
            }

            // Mémorise l'objet userData
            const userData = {
                email: formData.email,
                motDePasse: formData.motDePasse,
                nom: formData.nom,
                prenom: formData.prenom,
                telephone: formData.telephone,
                role: "ETUDIANT",
                consentementCGU: formData.consentementCGU,
                etudiant: {
                    sexe: formData.sexe,
                    dateNaissance: new Date(formData.dateNaissance),
                    typeDocument: formData.typeDocument,
                    institut: formData.institut,
                    profilParental: formData.isParentBooking
                        ? {
                            nom: formData.nomParent,
                            lienParente: formData.lienParente,
                            telephone: formData.telephoneParent,
                        }
                        : null,
                },
            };

            console.log("✅ Données soumises:", userData);
            axiosInstance.post('/', userData)
        .then((response) => {
            console.log('Réponse serveur:', response.data);
        })
        .catch((error) => {
            console.error('Erreur lors de la soumission:', error);
            Toast("Erreur lors de la soumission. Veuillez réessayer.", "error");
            return;
        })
            Toast("Inscription réussie !", "success");
        });
    }, [formData, currentStep]); // Dépendances pour re-créer la fonction

    // === Ouvrir popup de choix (mémorisée) ===
    const handleFinalize = useCallback(() => {
        if (formData.consentementCGU) {
            handleSubmit();
            setShowPopup(true);
        }
    }, [formData.consentementCGU, handleSubmit]);

    // === Fermer la modale de preview + nettoyer (mémorisée) ===
    const closePreview = useCallback(() => {
        if (pdfBlobUrl) {
            URL.revokeObjectURL(pdfBlobUrl);
            setPdfBlobUrl(null);
        }
        setShowPreview(false);
        setSuccess(true);
        setShowPopup(false);
        setTimeout(() => {
            resetForm();
            window.location.replace('/');
        }, 2000);
    }, [pdfBlobUrl, resetForm]);

    // === Télécharger le PDF (mémorisée) ===
    const handleDownload = useCallback(async () => {
        setLoading(true);
        try {
            const element = pdfRef.current;
            if (!element) return;

            await html2pdf()
                .from(element)
                .set({
                    margin: 0.5,
                    filename: 'fiche_inscription_etudiant.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                })
                .save();
        } catch (err) {
            console.error('Erreur téléchargement:', err);
        } finally {
            setLoading(false);
            closePreview();
        }
    }, [closePreview]);

    // Nettoyage à la démontage
    useEffect(() => {
        return () => {
            if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
        };
    }, [pdfBlobUrl]);

    if (success) {
        return (
            <SuccessStep
                title="Inscription finalisée !"
                message="Votre dossier a été enregistré avec succès. Vous serez redirigé vers l'accueil."
                icon={CheckCircle}
            />
        );
    }

    return (
        <div className="space-y-6 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 overflow-x-hidden">
            {/* === Formulaire PDF (caché en mode preview) === */}
            {!showPreview && (
                <form
                    ref={pdfRef}
                    id="pdf-recap"
                    autoComplete="on"
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-6 bg-white p-6 rounded shadow-md text-sm leading-relaxed"
                    style={{ backgroundColor: '#ffffff' }}
                >
                    {/* En-tête officiel */}
                    <Header />
                    <StudentSummary formData={formData} />

                    {/* Documents */}
                    <ResumeDocument formData={formData} filePreviews={filePreviews} />
                    {/* Contact parental (si applicable) */}
                    {formData.isParentBooking && (
                        <ResumeInfoParent formData={formData} />
                    )}
                    <Finalize
                        handleFinalize={handleFinalize}
                        formData={formData}
                        updateFormData={updateFormData}
                    />
                </form>
            )}

            {/* === Popup de confirmation === */}
            {showPopup && (
                <DialogPopup
                    setShowPreview={setShowPreview}
                    formData={formData}
                    handleDownload={handleDownload}
                    closePreview={closePreview}
                />
            )}

            {/* === Écran de chargement global === */}
            {loading && !showPreview && (
                <GlobalPreload />
            )}
        </div>
    );
};

export default ConfirmationWithFinalization;