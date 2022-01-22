import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from "./components/Home";
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn'
import Debits from "./components/Debits";
import Credits from "./components/Credits";
import axios from "axios";


function App() {

    const [accountBalance, setAccountBalance] = useState(0)
    const [user, setUser] = useState({
        userName: 'bob_loblaw', memberSince: '08/23/99'
    })
    const [debitInfo, setDebitInfo] = useState(null)
    const [creditInfo, setCreditInfo] = useState(null)

    const mockLogIn = (logInInfo) => {
        const newUser = {user}
        newUser.userName = logInInfo.userName
        setUser(newUser)
    }

    useEffect(async () => {
        try {
            let response
            let debits = 0
            await axios.get('https://moj-api.herokuapp.com/debits').then(val => {
                response = val
                val.data.map(data => debits -= data.amount)
            })
            setDebitInfo(response.data)
            setAccountBalance(debits)
        } catch (e) {
            alert("Error retrieving Debits")
        }

        try {
            let response
            let credits = 0
            await axios.get('https://moj-api.herokuapp.com/credits').then(val => {
                response = val
                val.data.map(data => credits += data.amount)
            })
            setCreditInfo(response.data)
            setAccountBalance(prev => Math.round(100 * (prev + credits))/100)
        } catch (e) {
            alert("Error retrieving Debits")
        }



    }, [])

    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/userProfile">Profile</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route exact path="/" element={<Home accountBalance={accountBalance}/>}/>
                <Route exact path="/userProfile"
                       element={<UserProfile userName={user.userName} memberSince={user.memberSince}/>}/>
                <Route exact path="/login" element={<LogIn login={mockLogIn}/>}/>
                <Route exact path="/debits"
                       element={<Debits accountBalance={accountBalance} setAccountBalance={setAccountBalance} debitInfo={debitInfo} setDebitInfo={setDebitInfo}/>}/>
                <Route exact path="/credits"
                       element={<Credits accountBalance={accountBalance} setAccountBalance={setAccountBalance} creditInfo={creditInfo} setCreditInfo={setCreditInfo}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
