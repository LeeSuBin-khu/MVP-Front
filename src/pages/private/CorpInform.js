import NavMenu from "../NavMenu";
import React, { useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { auth, db, logout } from "../../scripts/firebase";
import { ref, get,set,getDatabase, child,update } from "firebase/database";
import { Link, Router } from "react-router-dom";
import "../Login.css";

export default function CorpInform() {
    const [boss, setBoss] = useState("");
    const [boss_contact, setBosscontact] = useState("");
    const [capital_size, setCapitalsize] = useState("");
    const [contact, setContact] = useState("");
    const [category, setCategory] = useState("");
    const [scale, setScale] = useState("");
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
        if (!user) return navigate('/corporation/main', {replace: true});
        fetchUserName();
    }, [user, loading]);

    const postcorp =async()=>{
      update(ref(db, 'users/' + user.uid), {
          auth:"ROLE_CORP",
          ROLE_CORP:{
            Info:{
                boss:boss,
                boss_contact:boss_contact,
                capital_size:capital_size,
                contact:contact,
                category:category,
                name:nickname,
                scale:scale,
                name:nickname},
            count:0
          }}
      )
      navigate('/corporation/main', {replace:true})
      }

    return (
      <>
      {/*<NavMenu name={name}/>*/}
      <div className="login">
          <img style={{height: 908,width: 1024}} src="main.png"/>
          <div className="login__container">
            <div style={{alignContent:"flex-end"}}>
            <img style={{width:101, height:75.75}} src="logo.png"/></div>
      
        <text>기업 회원가입</text>
        <text>기업 정보</text>
        <div className="login__Box">
            <text className="login__Text">기업명</text>
            <input
              type="text"
              className="login__textBox2"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="이름"
            />
        </div>

        <text>기업주 정보</text>

        <div className="login__Box">
            <text className="login__Text">이름</text>
            <input
              type="text"
              className="login__textBox2"
              value={boss}
              onChange={(e) => setBoss(e.target.value)}
              placeholder="기업주 이름 입력"
            />
        </div>

        <div className="login__Box">
            <text className="login__Text">연락처</text>
            <input
              type="text"
              className="login__textBox2"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="기업주 전화번호 입력"
            />
        </div>

        <div className="login__Box">
            <text className="login__Text">대표 연락처</text>
            <input
              type="text"
              className="login__textBox2"
              value={boss_contact}
              onChange={(e) => setBosscontact(e.target.value)}
              placeholder="대표 연락처 입력"
            />
        </div>
        <text>기업 규모</text>
        <div className="login__Box">
            <text className="login__Text">기업 인원수</text>
            <input
              type="text"
              className="login__textBox2"
              value={scale}  
              onChange={(e) => setScale(e.target.value)}
              placeholder="기업 인원수 입력"
            />
        </div>

        <div className="login__Box">
            <text className="login__Text">기업 자본 규모</text>
            <input
              type="text"
              className="login__textBox2"
              vvalue={capital_size}
              onChange={(e) => setCapitalsize(e.target.value)}
              placeholder="기업 자본 규모 입력"
            />
        </div>


        <div className="login__Box">
              <text className="login__Text">기업 분야</text>
              <select className="login__Box" placeholder="기업 분야 선택" name="fieldoption" 
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

        
        <button onClick={(e)=>postcorp()}>
          클릭
        </button>
    
        
        </div>
        </div>
        </>
    )
}