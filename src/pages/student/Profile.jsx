
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
    GraduationCap
} from 'lucide-react';

import {
    useQuery
} from '@tanstack/react-query';

import ProfileSkeleton from '@components/student/profile/ProfileSkeleton';
import { fetchProfileData } from '@services/fetchProfileData';
import { useNotificationStore } from '@stores/notificationStore';

const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

// Composant principal du profil
const ProfileContent = () => {
    const { data, isPending, isError } = useQuery({
        queryKey: ['profileData'],
        queryFn: fetchProfileData,
    });
    const notifications = useNotificationStore();

    if (isPending) {
        return <ProfileSkeleton />;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-10">Erreur lors du chargement des données.</div>;
    }

    return (
        <motion.div
            className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
            {/* En-tête du profil */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Mon profil</h2>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600 font-medium">Compte vérifié</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Section photo de profil */}
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                            {data.firstName.substring(0, 1) + data.lastName.substring(0, 1)}
                        </div>
                    </div>

                    {/* Informations personnelles */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <User className="h-5 w-5 mr-2 text-blue-600" />
                                Informations personnelles
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                                <input
                                    type="text"
                                    value={data.firstName}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                                <input
                                    type="text"
                                    value={data.lastName}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                    disabled
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        defaultValue={data.phone}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Votre numéro"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <input
                                        type="date"
                                        defaultValue={data.birthDate}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <p>Pour plus de securite, vous n'etes pas autorise a modifier les informations de votre profil. Veuillez nous contacter si besoin</p>
                    </div>
                </div>
            </motion.div>

            {/* Informations académiques */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                    Informations académiques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Université</label>
                        <input
                            type="text"
                            defaultValue={data.university}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Nom de votre université"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ville d'étude</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                defaultValue={data.city}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Ville de votre université"
                            />
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* Documents et vérification */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-600" />
                    Documents et vérification
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Photo d'identité */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Photo d'identité</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <p className="text-sm text-green-600 font-medium mb-1">Document vérifié</p>
                            <p className="text-xs text-gray-500">photo_identite.jpg</p>
                        </div>
                    </div>

                    {/* Pièce d'identité */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Pièce d'identité</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <p className="text-sm text-green-600 font-medium mb-1">Document vérifié</p>
                            <p className="text-xs text-gray-500">carte_identite.pdf</p>
                        </div>
                    </div>
                </div>

                {/* Statut de vérification */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <div>
                            <p className="text-sm font-medium text-green-800">Compte entièrement vérifié</p>
                            <p className="text-xs text-green-600">Vos documents ont été validés le 15 janvier 2024</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-blue-600" />
                    Préférences de notification
                </h3>

                <div className="space-y-6">
                    {/* Notifications par email */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <Mail className="h-5 w-5 text-gray-600 mr-3" />
                            <div>
                                <p className="font-medium text-gray-900">Notifications par email</p>
                                <p className="text-sm text-gray-600">Recevez les alertes importantes par email</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={notifications.email}
                            onChange={() => notifications.toggleNotification('email')}
                        />
                    </div>

                    {/* Notifications push */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <Bell className="h-5 w-5 text-gray-600 mr-3" />
                            <div>
                                <p className="font-medium text-gray-900">Notifications push</p>
                                <p className="text-sm text-gray-600">Alertes instantanées sur votre appareil</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={notifications.push}
                            onChange={() => notifications.toggleNotification('push')}
                        />
                    </div>

                    {/* Newsletter */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <MessageSquare className="h-5 w-5 text-gray-600 mr-3" />
                            <div>
                                <p className="font-medium text-gray-900">Newsletter hebdomadaire</p>
                                <p className="text-sm text-gray-600">Conseils et nouveautés chaque semaine</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={notifications.newsletter}
                            onChange={() => notifications.toggleNotification('newsletter')}
                        />
                    </div>

                    {/* Alertes de prix */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <Euro className="h-5 w-5 text-gray-600 mr-3" />
                            <div>
                                <p className="font-medium text-gray-900">Alertes de prix</p>
                                <p className="text-sm text-gray-600">Soyez notifié des baisses de prix</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={notifications.priceAlerts}
                            onChange={() => notifications.toggleNotification('priceAlerts')}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Statistiques du compte */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-blue-600" />
                    Activité du compte
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">{data.favorites}</div>
                        <div className="text-sm text-gray-600">Favoris</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-1">{data.searches}</div>
                        <div className="text-sm text-gray-600">Recherches</div>
                    </div>
                </div>
            </motion.div>

            {/* Actions du compte */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-blue-600" />
                    Paramètres du compte
                </h3>

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
            </motion.div>
        </motion.div>
    );
};

const Profile = () => (
        <ProfileContent />
);

export default Profile;
