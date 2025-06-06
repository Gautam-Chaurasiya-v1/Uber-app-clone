import React, { useState } from 'react'
import UserDataContext from './UserDataContext'



const UserContext = ({ children }) => {

    const [user, setUser] = useState({
        fullname: {
            firstname: "",
            lastname: ""
        },
        email: ""
    })

    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext