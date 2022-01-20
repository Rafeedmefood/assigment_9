import {Link} from 'react-router-dom';

function UserProfile(props) {
    return (
        <div>
            <h1>User Profile</h1>

            <div>Username: {props.userName}</div>
            <div>Member Since: {props.memberSince}</div>
        </div>
    )
}

export default UserProfile;