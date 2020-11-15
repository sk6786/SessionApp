import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {inactivityTime} from '../utils';

const LayoutWrapper = (props) => {
    const history = useHistory();

    const sessionToken = sessionStorage.getItem('sessionToken');

    if (!sessionToken) {
        history.push('/login');
    } else {
        inactivityTime();
    }

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/login';
    }

    return (
        <div>
            <div>
                {sessionToken && <button onClick={handleLogout}>LOGOUT</button>}
            </div>
            {props.children}
        </div>
    )
}

export default LayoutWrapper;