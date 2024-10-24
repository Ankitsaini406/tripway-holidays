import { useState } from "react";
import toast from "react-hot-toast";

function useToast() {

    const [toastShown, setToastShown] = useState(false);

    const showToast = (message, type = "success") => {
        if (!toastShown) {
            toast[type](message);
            setToastShown(true);
        }
    };

    const resetToast = () => setToastShown(false);

    return { showToast, resetToast };
}

export default useToast;