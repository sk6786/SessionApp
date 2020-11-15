import React, { useState } from 'react';
import ForbiddenPage from './forbiddenPage';

const VALID_ROLES = ['USER'];
const IMAGE = "https://images.newindianexpress.com/uploads/user/imagelibrary/2020/4/23/w1200X800/animal-cat-face-close-up-feline-416160.jpg";

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

const UserPage = () => {    
    const [showContent, setShowContent] = useState(false);

    const isAllowed = isUserAllowed();

    if (!isAllowed) {
        return <ForbiddenPage />
    } else {
        return (
          <div>
              <h2>Regular User</h2>
              <button onClick={() => setShowContent(!showContent)}>Show Regular User Content</button>
                {showContent && 
                    <img style={{maxWidth: '500px', display: "block", marginTop: '20px'}}
                    src={IMAGE}/>
                }
          </div>
        )
    }
}

export default UserPage;