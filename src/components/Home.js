import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';


function Home(props) {
    return (
        <div>
            <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" alt="bank"/>
            <h1>Bank of React</h1>

            <p>
                <Link to="/debits">Debits</Link>
            </p>
            <p>
                <Link to="/credits">Credits</Link>
            </p>

            <AccountBalance accountBalance={props.accountBalance}/>
        </div>
    )
}

export default Home;