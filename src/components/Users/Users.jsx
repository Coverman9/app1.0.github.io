import React from "react";
import { NavLink } from "react-router-dom";
import userimg from "../../assets/images/userimg.png";
import "./Users.css";


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUserCount / props.pageSize)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)

    }
    console.log(props);

    return <div className="usersPage">
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && "selectedPage"}
                    onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/*'}>
                            <img alt="surot" src={u.photos.small != null ? u.photos.small : userimg} className='userPhoto' />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed ?
                            <button onClick={() => (props.unfollow(u.id))}>Unfollow</button> :
                            <button onClick={() => (props.follow(u.id))}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;