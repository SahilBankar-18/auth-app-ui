import { toast } from "react-toastify";

// Common options for toast notifications
const toastOptions = {
    position: 'top-right',
    autoClose: 5000, // Auto close after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

// Function to handle success messages
export const handleSuccess = (msg) => {
    toast.success(msg, toastOptions);
};

// Function to handle error messages
export const handleError = (msg) => {
    toast.error(msg, toastOptions);
};
