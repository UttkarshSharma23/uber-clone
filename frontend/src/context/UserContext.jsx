import React, { createContext , useState} from 'react'

export const UserDataContext = createContext();

const UserContext = ({ children }) => {

    const [user,setUser] = useState({
        emaiil : '',
        fullName :{
            firstName : '',
            lastName : '',
        }  
    })

    return (
        <div>
{/* You can add state and functions to manage user data here */}
            <UserDataContext.Provider value={[user,setUser]}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext