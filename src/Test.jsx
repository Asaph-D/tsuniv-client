import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Home,
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
    AlertCircle,
    X,
    Plus,
    Eye,
    MessageSquare,
    LogOut,
    Menu,
    GraduationCap
} from 'lucide-react';





export default function StudentDashboard({ onLogout, studentData }) {
    const [activeTab, setActiveTab] = useState ('recherche');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    const notifications= [
        {
            id: '1',
            titre: 'Réservation confirmée',
            message: 'Votre réservation pour le studio rue des Écoles a été confirmée.',
            type: 'SUCCESS',
            date: '2024-01-15T10:30:00Z',
            lue: false
        },
        {
            id: '2',
            titre: 'Nouveau logement disponible',
            message: 'Un nouveau logement correspondant à vos critères est disponible.',
            type: 'INFO',
            date: '2024-01-14T15:45:00Z',
            lue: true
        },
        {
            id: '3',
            titre: 'Rappel de paiement',
            message: 'N\'oubliez pas de régler votre loyer avant le 5 du mois.',
            type: 'WARNING',
            date: '2024-01-13T09:00:00Z',
            lue: false
        }
    ];

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'SUCCESS': return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'WARNING': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            case 'ERROR': return <AlertCircle className="h-5 w-5 text-red-500" />;
            default: return <Bell className="h-5 w-5 text-blue-500" />;
        }
    };



    const containerVariants = {
        hidden: { opacity: 0, x:140 },
        visible: {
            opacity: 1,
            x:0,
            transition: {
                duration: 1,
                staggerChildren: 0.1
            }
        }
    };

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

 

 
    const renderNotificationsTab = () => (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6
            max-w-xl absolute right-0 ml-12"
        >
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Marquer toutes comme lues
                    </button>
                </div>

                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 rounded-xl border transition-all ${notification.lue
                                    ? 'border-gray-200 bg-white'
                                    : 'border-blue-200 bg-blue-50'
                                }`}
                        >
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 mt-1">
                                    {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold text-gray-900">{notification.titre}</h3>
                                        <span className="text-xs text-gray-500">
                                            {new Date(notification.date).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 text-sm">{notification.message}</p>
                                </div>
                                {!notification.lue && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {notifications.length === 0 && (
                    <div className="text-center py-12">
                        <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune notification</h3>
                        <p className="text-gray-600">Vous êtes à jour !</p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );

    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Home className="h-8 w-8 text-blue-700" />
                            <span className="ml-2 text-xl font-bold text-gray-900">UniLogis</span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <button
                                onClick={() => setActiveTab('notifications')}
                                className={`px-3 py-2 text-sm font-medium transition-colors relative ${activeTab === 'notifications'
                                        ? 'text-blue-700 border-b-2 border-blue-700'
                                        : 'text-gray-700 hover:text-blue-700'
                                    }`}
                            >
                                <Bell className="h-4 w-4 inline mr-2" />
                                Notifications
                                {notifications.some(n => !n.lue) && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('profil')}
                                className={`px-3 py-2 text-sm font-medium transition-colors ${activeTab === 'profil'
                                        ? 'text-blue-700 border-b-2 border-blue-700'
                                        : 'text-gray-700 hover:text-blue-700'
                                    }`}
                            >
                                <User className="h-4 w-4 inline mr-2" />
                                Profil
                            </button>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-3">
                                <span className="text-sm text-gray-700">
                                    Bonjour, 
                                </span>
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    
                                </div>
                            </div>
                            <button
                                onClick={onLogout}
                                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                                title="Déconnexion"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-gray-600 hover:text-gray-800"
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden bg-white border-t border-gray-200"
                        >
                            <div className="px-4 py-2 space-y-1">
                                <button
                                    onClick={() => {
                                        setActiveTab('recherche');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'recherche'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Search className="h-4 w-4 inline mr-3" />
                                    Recherche
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveTab('reservations');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'reservations'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Calendar className="h-4 w-4 inline mr-3" />
                                    Réservations
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveTab('notifications');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${activeTab === 'notifications'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Bell className="h-4 w-4 inline mr-3" />
                                    Notifications
                                    {notifications.some(n => !n.lue) && (
                                        <span className="absolute top-2 left-8 w-2 h-2 bg-red-500 rounded-full"></span>
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveTab('profil');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profil'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <User className="h-4 w-4 inline mr-3" />
                                    Profil
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AnimatePresence mode="wait">
                    {activeTab === 'notifications' && renderNotificationsTab()}
                </AnimatePresence>
            </main>

            
        </div>
    );
}