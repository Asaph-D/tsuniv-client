// utils/toastUtils.js
import { toast } from "sonner";

const toastStyles = {
    success: {
        background: '#4CAF50',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
    },
    error: {
        background: '#F44336',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
    },
    info: {
        background: '#2196F3',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
    },
};

const Toast = (message, type) => {
    toast[type](message, {
        duration: 2000,
        position: 'top-right',
        style: toastStyles[type],
        icon: type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️',
    });
}

export default Toast;
