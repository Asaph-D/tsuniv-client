// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    Calendar,
    Bell,
    User,
    Settings,
    MapPin,
    Star,
    Shield,
    Euro,
    Phone,
    Mail,
    CheckCircle,
    X,
    MessageSquare,
    GraduationCap,
} from 'lucide-react';
import ProfileSkeleton from '@components/student/profile/ProfileSkeleton';
import LazyImage from '@components/shared/LazyImage';
import { useProfileStudentQuery } from '@services/fetchProfileData';
import InfoField from "@components/student/profile/InfoField"
import DocumentVerificationStatus from '@components/student/profile/DocumentationVerification';
import NotificationToggle from '@components/student/profile/NotificationToggle';
import StatsCard from '@components/student/profile/Stat';
import ParentInfoSection from '@components/student/profile/ParentSection';
import ProfileSection from "@components/shared/ProfileSection"
import { itemVariants } from "@utils/Animations"

// Composant principal du profil
const ProfileContent = () => {
    const { data, isPending, isError } = useProfileStudentQuery()

    if (isPending) {
        return <ProfileSkeleton />;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-10">Erreur lors du chargement des données.</div>;
    }

    const { user, student, notificationPreferences, studentDocuments, parents } = data;

    const profileData = {
        ...user,
        ...student,
        ...notificationPreferences,
        ...studentDocuments,
        parents: parents || [],
    };

    const formattedBirthDate = profileData.birthDate ? new Date(profileData.birthDate).toISOString().split('T')[0] : '';
    const isAccountVerified = profileData.isVerified;

    return (
        <motion.div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* En-tête du profil */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Mon profil</h2>
                    {isAccountVerified ? (
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-600 font-medium">Compte vérifié</span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-sm text-orange-600 font-medium">Compte non vérifié</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex flex-col items-center">
                        <div>
                            <LazyImage className="w-32 h-32 rounded-full flex items-center justify-center mb-4"
                                src={profileData.identityPhotoUrl} alt="Photo de profil" />
                        </div>
                    </div>
                    <div className="flex-1 space-y-6">
                        <ProfileSection title="Informations personnelles" icon={User}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoField label="Prénom" value={profileData.firstName} />
                                <InfoField label="Nom" value={profileData.lastName} />
                                <div className="md:col-span-2">
                                    <InfoField label="Email" value={user.email} type="email" />
                                </div>
                                <InfoField label="Téléphone" value={profileData.phone} type="tel" icon={Phone} />
                                <InfoField label="Date de naissance" value={formattedBirthDate} type="date" icon={Calendar} />
                            </div>
                            <p className="text-sm text-gray-500 mt-4">Pour plus de sécurité, vous n'êtes pas autorisé à modifier les informations de votre profil. Veuillez nous contacter si besoin.</p>
                        </ProfileSection>
                    </div>
                </div>
            </motion.div>

            {/* Informations académiques */}
            <ProfileSection title="Informations académiques" icon={GraduationCap}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoField label="Institut" value={profileData.Institut} />
                    <InfoField label="Ville d'étude" value={profileData.cityOfStudy} icon={MapPin} />
                </div>
            </ProfileSection>

            {/* Informations des parents */}
            <ParentInfoSection parents={profileData.parents} />

            {/* Documents et vérification */}
            <ProfileSection title="Documents et vérification" icon={Shield}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DocumentVerificationStatus
                        isVerified={profileData.isVerified}
                        title="Photo d'identité"
                        documentUrl={profileData.identityPhotoUrl}
                    />
                    <DocumentVerificationStatus
                        isVerified={profileData.isVerified}
                        title="Pièce d'identité"
                        documentUrl={profileData.identityDocUrl}
                    />
                </div>
                {isAccountVerified ? (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-green-800">Compte entièrement vérifié</p>
                                <p className="text-xs text-green-600">Vos documents ont été validés.</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-center">
                            <X className="h-5 w-5 text-orange-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-orange-800">Compte en attente de vérification</p>
                                <p className="text-xs text-orange-600">Nos équipes travaillent en collaboration avec des instituts étatiques afin de garantir que vous êtes bien un individu légal.</p>
                            </div>
                        </div>
                    </div>
                )}
            </ProfileSection>

            {/* Préférences de notification */}
            <ProfileSection title="Préférences de notification" icon={Bell}>
                <div className="space-y-6">
                    <NotificationToggle
                        label="Notifications par email"
                        description="Recevez les alertes importantes par email"
                        icon={Mail}
                        checked={notificationPreferences.email}
                        onChange={() => notificationPreferences.toggleNotification('email')}
                    />
                    <NotificationToggle
                        label="Notifications push"
                        description="Alertes instantanées sur votre appareil"
                        icon={Bell}
                        checked={notificationPreferences.push}
                        onChange={() => notificationPreferences.toggleNotification('push')}
                    />
                    <NotificationToggle
                        label="Newsletter hebdomadaire"
                        description="Conseils et nouveautés chaque semaine"
                        icon={MessageSquare}
                        checked={notificationPreferences.newsletter}
                        onChange={() => notificationPreferences.toggleNotification('newsletter')}
                    />
                    <NotificationToggle
                        label="Alertes de prix"
                        description="Soyez notifié des baisses de prix"
                        icon={Euro}
                        checked={notificationPreferences.priceAlerts}
                        onChange={() => notificationPreferences.toggleNotification('priceAlerts')}
                    />
                </div>
            </ProfileSection>

            {/* Statistiques du compte */}
            <ProfileSection title="Activité du compte" icon={Star}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard value={profileData.favorites} label="Favoris" color="green" />
                    <StatsCard value={profileData.searches} label="Recherches" color="orange" />
                </div>
            </ProfileSection>

            {/* Actions du compte */}
            <ProfileSection title="Paramètres du compte" icon={Settings}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                        <div className="flex items-center">
                            <Shield className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                                <p className="font-medium text-gray-900">Sécurité</p>
                                <p className="text-sm text-gray-600">Mot de passe, 2FA</p>
                            </div>
                        </div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                        <div className="flex items-center">
                            <Bell className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                                <p className="font-medium text-gray-900">Notifications</p>
                                <p className="text-sm text-gray-600">Gérer les alertes</p>
                            </div>
                        </div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                        <div className="flex items-center">
                            <User className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                                <p className="font-medium text-gray-900">Confidentialité</p>
                                <p className="text-sm text-gray-600">Données personnelles</p>
                            </div>
                        </div>
                    </button>
                    <button className="p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left">
                        <div className="flex items-center">
                            <X className="h-5 w-5 text-red-600 mr-3" />
                            <div>
                                <p className="font-medium text-red-900">Supprimer le compte</p>
                                <p className="text-sm text-red-600">Action irréversible</p>
                            </div>
                        </div>
                    </button>
                </div>
            </ProfileSection>
        </motion.div>
    );
};

const Profile = () => <ProfileContent />;

export default Profile;
