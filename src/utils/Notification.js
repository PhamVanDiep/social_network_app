import { showMessage, hideMessage } from "react-native-flash-message";

class Notification {
    showSuccessMessage(message, description) {
        showMessage({
            message: message,
            description: description,
            type: "success",
            autoHide: true,
            duration: 2000,
            icon: "success"
        });
    }
    
    showErrorMessage(message, description) {
        showMessage({
            message: message,
            description: description,
            type: "danger",
            autoHide: true,
            duration: 2000,
            icon: "danger"
        });
    }
    
    showWarningMessage(message, description) {
        showMessage({
            message: message,
            description: description,
            type: "warning",
            autoHide: true,
            duration: 2000,
            icon: "warning"
        })
    }

    showNotInternetMessage(message, description) {
        showMessage({
            message: message,
            description: description,
            type: 'default',
            autoHide: false,
            backgroundColor: '#808B96',
            color: '#FFFFFF'
        })
    }
}
export default new Notification();