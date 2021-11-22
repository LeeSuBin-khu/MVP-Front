import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle,db } from "../scripts/firebase";
import { ref, get,set ,getDatabase,  child} from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import "./private/Role"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [isModalOpen, setisModalOpen]=useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    
    if (user) 
      {
        console.log(user);
        get(ref(db, `users/${user.uid}/auth`)).then((snapshot)=>{
        if(snapshot.exists()){
            var auth=snapshot.val()
            console.log(auth);
            
            if(auth=="null")
              {navigate('/role', {replace:true});
              console.log("정보입력으로.")}
            else if(auth=="ROLE_USER")
              {navigate('/bb', {replace:true});
              console.log("개인유저로.")}
            else if(auth=="ROLE_CORP")
            {navigate('/corporation/main', {replace:true});
            console.log("기업유저로.")}

        }
    })

      }
  }, [user, loading]);

  const openModal =async()=>{
      setisModalOpen(true)
    
    }

    const closeModal =async()=>{
      setisModalOpen(false)
    
    }

  return (
    
    <div className="login">
      
    <img style={{height: 908,width: 1024}} src="main.png"/>
      <div className="login__container">
    <div style={{alignContent:"flex-end"}}>
      <img style={{width:101, height:75.75}} src="logo.png"/></div>
      <text>세상은 아이디어를 개의치 않는다!</text>
      <text>수많은 아이디어 속에서 트렌드를 읽어보세요</text>
      <div className="login__Box">
        <text className="login__Text">이메일</text>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        
        />
      </div>
      <div className="login__Box">
        <text className="login__Text">비밀번호</text>
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(auth, email, password)}
        >
          로그인
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
       {/* <Role isOpen={isModalOpen} close={()=>closeModal()}></Role>
        <button className="login__btn login__google" onClick={()=>openModal()}>
          모달 확인
  </button>*/}
        <div >
          <Link to="/reset">비밀번호 찾기</Link> <text>|  </text>
          
          <Link to="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;