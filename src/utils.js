import { notification } from 'antd';

export const showNotification = (message) => {
  notification.open({
    message: 'Inactivity Notification',
    description: message,
    duration: 0
  });
};

export const inactivityTime = () => {
    var sessionTime;
    var alertTime;

    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    document.onclick = resetTimer;

    function resetTimer() {
        clearTimeout(sessionTime);
        clearTimeout(alertTime);
        alertTime = setTimeout(showWarning, 45000);
        sessionTime = setTimeout(logOut, 60000);
        // alertTime = setTimeout(showWarning, 5000);
        // sessionTime = setTimeout(logOut, 20000);
    }

    function logOut() {
      showNotification('Sorry, your session expired.');

      setTimeout(() => {
        sessionStorage.clear();
        window.location.href = '/login';
      }, 3000);
    }

    function showWarning() {
      showNotification('Your session will expire in 15 seconds due to inactivity.');
    }
}