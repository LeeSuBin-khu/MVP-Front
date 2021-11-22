

import NavMenu from "../NavMenu";


import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { auth, db, logout } from "../../scripts/firebase";
import { ref, get } from "firebase/database";
import { Link } from "react-router-dom";

export default function Role() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const fetchUserName = async () => {
        try {
        var snapshot = await get(ref(db, 'users/' + user.uid));
        var data = snapshot.val();
        setName(data.name);
        } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate('/', {replace: true});
        fetchUserName();
    }, [user, loading]);

    

    return (
        <div>
            <NavMenu name={name}/>
            <h2>RoleCheck</h2>
        <Link to ="/userInform">
        <button>일반 사용자</button>
        </Link>
        <Link to ="/corpInform">
        <button>기업 사용자</button>
        </Link>
        

        </div>
    )
}