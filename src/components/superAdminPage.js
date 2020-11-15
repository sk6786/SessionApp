import React, { useState } from 'react';
import ForbiddenPage from './forbiddenPage';

const VALID_ROLES = ['SUPERADMIN'];
const IMAGE = "https://static01.nyt.com/images/2020/04/22/science/22VIRUS-PETCATS1/22VIRUS-PETCATS1-videoSixteenByNineJumbo1600.jpg";

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

const SuperAdminPage = () => {    
    const [showContent, setShowContent] = useState(false);

    const isAllowed = isUserAllowed();

    if (!isAllowed) {
        return <ForbiddenPage />
    } else {
        return (
          <div>
              <h2>Super Admin</h2>
              <button onClick={() => setShowContent(!showContent)}>Show Super Admin Content</button>
                {showContent && 
                    <img style={{maxWidth: '500px', display: "block", marginTop: '20px'}}
                    src={IMAGE}/>
                }
          </div>
        )
    }
}

export default SuperAdminPage;