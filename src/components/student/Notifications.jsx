// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    Bell,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const notifications = [
    {
        id: '1',
        titre: 'Nouveau logement disponible',
        message: 'Un nouveau logement correspondant à vos critères est disponible.',
        type: 'INFO',
        date: '2024-01-14T15:45:00Z',
        lue: true
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
    hidden: { opacity: 0, x: 140 },
    visible: {
        opacity: 1,
        x: 0,
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

    const Notifications = () => (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6
            max-w-xl absolute right-0 ml-12 overflow-y-scroll"
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

    export default Notifications;