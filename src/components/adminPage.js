import React, { useState } from 'react';
import ForbiddenPage from './forbiddenPage';

const VALID_ROLES = ['ADMIN'];
const IMAGE = "https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop";

const isUserAllowed = () => {
    const sessionToken = sessionStorage.getItem('sessionToken');

    if (!sessionToken) {
        window.location.href = '/login';
    } else {
        const userData = JSON.parse(sessionToken);

        if (VALID_ROLES.indexOf(userData.role) === -1) {
            return false;
        }
    }

    return true;
}

const AdminPage = () => {    
    const [showContent, setShowContent] = useState(false);

    const isAllowed = isUserAllowed();

    if (!isAllowed) {
        return <ForbiddenPage />
    } else {
        return (
          <div>
              <h2>Admin</h2>
              <button onClick={() => setShowContent(!showContent)}>Show Admin Content</button>
                {showContent && 
                    <img style={{maxWidth: '500px', display: "block", marginTop: '20px'}}
                    src={IMAGE}/>
                }
          </div>
        )
    }
}

export default AdminPage;