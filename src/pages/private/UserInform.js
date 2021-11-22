import NavMenu from "../NavMenu";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { auth, db, logout } from "../../scripts/firebase";
import { getDatabase,ref, get,set,update } from "firebase/database";
import { Link } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import "../Login.css";


const firebaseConfig = {
  apiKey: "AIzaSyDFMMpu-eTGrbpW3Ruu-G2ZMfwaioRCsYw",
  authDomain: "image-betting.firebaseapp.com",
  databaseURL: "https://image-betting-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "image-betting",
  storageBucket: "image-betting.appspot.com",
  appId: "image-betting"
}

const app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();


export default function UserInform() {
    const [birth, setBirth] = useState("");
    const [contact, setContact] = useState("");
    const [category, setCategory] = useState("");
    const [job, setJob] = useState("");
    const [point, setPoint] = useState(0);
    const [sex, setSex] = useState("");
    const [nickname, setNickname] = useState("");
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

    const postuser =async()=>{
      
      update(ref(db, 'users/' + user.uid), {
        auth:"ROLE_USER",
        ROLE_USER:{
          birth:birth,
          contact:contact,
          category:category,
          job:job,
          sex:sex,
          name:nickname}
        
    })
      navigate('/bb', {replace:true})
      }


    return (
      <>
        {/*<NavMenu name={name}/>*/}
        <div className="login">
        <img style={{height: 908,width: 1024}} src="main.png"/>
        <div className="login__container">
    <div style={{alignContent:"flex-end"}}>
      <img style={{width:101, height:75.75}} src="logo.png"/></div>
        
        <text>개인 회원가입</text>
            
            
            <div className="login__Box">
            <text className="login__Text">이름</text>
            <input
              type="text"
              className="login__textBox2"
              value={nickname}
              placeholder="이름 입력"
              onChange={(e) => setNickname(e.target.value)}
            />
            </div>

            <div className="login__Box">
            <text className="login__Text">생년월일</text>
            <input
              type="text"
              className="login__textBox2"
              value={birth}
              placeholder="생년월일 입력"
              onChange={(e) => setBirth(e.target.value)}
            />
            </div>


            <div className="login__Box">
            <text className="login__Text">연락처</text>
            <input
              type="text"
              className="login__textBox2"
              value={contact}
              placeholder="연락처 입력"
              onChange={(e) => setContact(e.target.value)}
            />
            </div>

            <div className="login__Box">
                <text className="login__Text">성별</text>
                <select className="login__Box" placeholder="성별 선택" name="sexoption" 
                    value={sex}  onChange={(e) => setSex(e.target.value)}>
                  <text className="login__Text">연락처</text>
                  <optgroup label='성별을 선택하세요'>
                  <option value=' '></option>
                  <option value='women'>여성</option>
                  <option value='men'>남성</option>
                  </optgroup>
                </select>
            </div>

            <div className="login__Box">
                <text className="login__Text">직업</text>
                    <select className="login__Box" placeholder="직업 선택" name="joboption" 
                      value={job}  onChange={(e) => setJob(e.target.value)}>
                      <optgroup label='직업을 선택하세요'>
                      <option value=' '></option>
                      <option value='teenager'>초중고생</option>
                      <option value='student'>대학/대학원생</option>
                      <option value='worker'>회사원(직장인)</option>
                      <option value='doctor'>연구원</option>
                      </optgroup>
                    </select>
            </div>

            <div className="login__Box">
              <text className="login__Text">관심분야</text>
              <select className="login__Box" placeholder="관심분야 선택" name="fieldoption" 
                    value={category}  onChange={(e) => setCategory(e.target.value)}>
                      <text className="login__Text">연락처</text>
                    <optgroup label='분야를 선택하세요'>
                    <option value=' '></option>
                    <option value='it'>IT/컴퓨터</option>
                    <option value='marketing'>마케팅</option>
                    <option value='finance'>금융</option>
                    <option value='game'>게임</option>
                    <option value='culture'>문화/예술</option>
                    <option value='beauty'>뷰티</option>
                    <option value='sports'>스포츠/레저</option>
                    <option value='foods'>식품</option>
                    <option value='trip'>여행</option>
                    <option value='medical'>의료</option>
                    <option value='fashion'>패션의류</option>
                    <option value='environment'>환경</option>
                    <option value='etc'>기타</option>
                    </optgroup>
              </select>
            </div>

        <button onClick={(e)=>postuser()}>
          클릭
        </button>
        </div>
        </div>
        </>
    )
}