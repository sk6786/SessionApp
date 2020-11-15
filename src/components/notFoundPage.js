const ROUTES = ['/login', '/user_page', '/superadmin_page', '/admin_page'];

const NotFoundPage = () => {
    let shouldShow = false;

    if (ROUTES.indexOf(window.location.pathname) === -1) {
        shouldShow = true;
    }

    return (
        <div>
            {shouldShow && <h1>The resource you are looking for doesn't exist.</h1>}
        </div>
    )
}

export default NotFoundPage;