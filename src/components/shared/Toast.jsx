import { toast } from "sonner"


function Toast ({message , type}){
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
    
    return (
        <div>
        {toast[type](message, {
            duration: 2000,
            position: 'top-right',
            style: toastStyles[type],
            icon: type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'
        })}
        </div>
    );
}

export default Toast;