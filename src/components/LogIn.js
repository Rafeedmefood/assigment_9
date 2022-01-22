import React, {useState} from 'react';
import { useNavigate } from "react-router-dom"

function LogIn(props) {

    const [user, setUser] = useState({userName: "", password: ""})
    const navigate = useNavigate()
    const handleChange = (e) => {
        const updatedUser = user
        const inputField = e.target.name
        updatedUser[inputField] = e.target.value

        setUser(updatedUser)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.login(user)
        navigate("/userProfile")
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Name</label>
                    <input type="text" name="userName" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password"  >Password</label>
                    <input type="password" name="password" onChange={handleChange}/>
                </div>
                <button>Log In</button>
            </form>
        </div>
    )
}

export default LogIn