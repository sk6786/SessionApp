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
    }

    function logOut() {
      alert('Sorry, your session expired.');
      sessionStorage.clear();
      window.location.href = '/login';
    }

    function showWarning() {
      alert('Your session will expire soon due to inactivity.');
    }
}