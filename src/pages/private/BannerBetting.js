import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { Button} from "react-bootstrap";
import { auth, db, storage } from "../../scripts/firebase";
import { ref, get, set, update, onValue, child } from "firebase/database";
import * as fbStorage from "firebase/storage";

import Popup from 'reactjs-popup';

import "../../assets/css/private/BannerBetting.css";

import NavMenu from '../NavMenu';

import { Button } from 'react-bootstrap';
import "../../assets/css/private/BannerBetting.css";

export default function BannerBetting() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [point, setPoint] = useState(0);
    const [select, setSelect] = useState(null);
    const [betPoint, setBetPoint] = useState(0);
    const [imageMap, setImageMap] = useState(null);
    

    const [sex, setSex]=useState(''); 
    const [job, setJob]=useState(''); 
    const [category, setCategory]=useState('');
    const [joboption,setjoboption]=useState('');

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const navigate = useNavigate();

    const fetchUserInfo = async () => {
        try {
            const userRef = ref(db, 'users/' + user.uid);
            var snapshot = await get(userRef);
            var data = snapshot.val();
            
            if(data != null){
                setSex(data.ROLE_USER.sex);
                setCategory(data.ROLE_USER.category);
                setJob(data.ROLE_USER.job);
                //console.log(job+sex+category);
                if(data.tm_info != null){
                    setPoint(data.tm_info.point);
                }
                else{
                    set(child(userRef, "tm_info"), {
                        point: 0
                    });
                }
                setName(data.name);
            }
            else {
                fetchUserInfo();
            }
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate('/', {replace: true});
        fetchUserInfo();
    }, [user, loading]);

    const [imageBettingPath,setimageBettingPath] = useState("Pets");
    
    
    const imageNumber = 32;

    useEffect(() => {
        setImages(imageBettingPath);
    }, [imageBettingPath])


    
    const setImages = async (path) => {
        console.log(path)
        try{
            fbStorage.listAll(fbStorage.ref(storage, path)).then(res => {
                const imageIndex = selectIndex(imageNumber, 4);

                fbStorage.getDownloadURL(fbStorage.ref(storage, res.items[imageIndex[0]].fullPath))
                    .then(url => {
                        const img = document.getElementById("image_A");
                        img.setAttribute('src', url);
                    });

                fbStorage.getDownloadURL(fbStorage.ref(storage, res.items[imageIndex[1]].fullPath))
                    .then(url => {
                        const img = document.getElementById("image_B");
                        img.setAttribute('src', url);
                    });
                
                fbStorage.getDownloadURL(fbStorage.ref(storage, res.items[imageIndex[2]].fullPath))
                    .then(url => {
                        const img = document.getElementById("image_C");
                        img.setAttribute('src', url);
                    });

                fbStorage.getDownloadURL(fbStorage.ref(storage, res.items[imageIndex[3]].fullPath))
                    .then(url => {
                        const img = document.getElementById("image_D");
                        img.setAttribute('src', url);
                    });
                
                setImageMap({
                    path: path,
                    content_A: res.items[imageIndex[0]].name.split(".").join(""),
                    content_B: res.items[imageIndex[1]].name.split(".").join(""),
                    content_C: res.items[imageIndex[2]].name.split(".").join(""),
                    content_D: res.items[imageIndex[3]].name.split(".").join(""),
                })
            })
        }
        catch(e){
            console.error(e);
        }
    }

    //selecting random index without same element
    const selectIndex = (totalIndex, selectingNumber) => {
        let randomIndexArray = [];
        for (let i=0; i<selectingNumber; i++) {   //check if there is any duplicate index
            let randomNum = Math.floor(Math.random() * totalIndex)
            if (randomIndexArray.indexOf(randomNum) === -1) {
                randomIndexArray.push(randomNum)
            } else { //if the randomNum is already in the array retry
                i--
            }
        }
        return randomIndexArray
    }

    const onContentClicked = e => {
        if(select != null)
            select.style.outline = '0px';
        
        e.target.style.outline = 'solid blue';
        setSelect(e.target);
    }

    const onGetButtonClicked = async e => {
        if(select == null){
            alert("제일 선호하는 이미지를 선택해주세요.");
            return;
        }
        
        e.target.disabled = true;

        try{
            const userRef = ref(db, 'users/' + user.uid);
            var snapshot = await get(userRef);
            const data = snapshot.val();
            if (data != null){
                var nPoint = Number(data.tm_info.point) + 1000;

                const voteRef = ref(db, "vote/");
                var vote_snapshot = await get(voteRef);
                var vote_data = vote_snapshot.val();

                vote_data = vote_data == null ? {} : vote_data;
                const imgs = vote_data[imageMap.path] == null ? {} : vote_data[imageMap.path];

                var updateData = {};
                const img = imageMap[select.id]; 
                updateData[img] = imgs[img] == null ? 1 : imgs[img] + 1;

                //update할때, image.path에 한표가 추가될 때
                //bannercount 테이블 update
                //image.path/category/+"category(변수임)"  여기에 +1하기
               
                //setImage(imageMap.path+"/"+img);  //--> SceneryImages/mountains-6540497__340webp

                update(child(voteRef, imageMap.path), updateData).then(res => {
                    var getdata = {};
                    getdata['/point'] = nPoint
                    getdata['/getLogs/g_'+Date.now()] = {
                        select: select.id,
                        name: imageMap.path + "/" + img,
                    } 


                    get(ref(db, `BannerCount/${imageMap.path}/${img}/sex/${sex}`)).then((snapshot)=>{
                        if(snapshot.exists()){
                            var auth=snapshot.val()
                            console.log(auth);
                
                            const updates={};
                            updates['BannerCount/'+imageMap.path+"/"+img+'/sex/'+sex]=auth+1; 
                            update(ref(db),updates);
                           
        
                        }
                        else{
                            const updates={};
                              updates['BannerCount/'+imageMap.path+"/"+img+'/sex/'+sex]=1;
                              update(ref(db),updates);
                        }
                    })

                    get(ref(db, `BannerCount/${imageMap.path}/${img}/category/${category}`)).then((snapshot)=>{
                        if(snapshot.exists()){
                            var auth=snapshot.val()
                            console.log(auth);
            
                            const updates={};
                            updates['BannerCount/'+imageMap.path+"/"+img+'/category/'+category]=auth+1;
                            update(ref(db),updates);
                           
        
                        }
                        else{
                             const updates={};
                              updates['BannerCount/'+imageMap.path+"/"+img+'/category/'+category]=1;
                              update(ref(db),updates);
                        }
                    })

                    get(ref(db, `BannerCount/${imageMap.path}/${img}/job/${job}`)).then((snapshot)=>{
                        if(snapshot.exists()){
                            var auth=snapshot.val()
                            console.log(auth);
                
                            const updates={};
                            updates['BannerCount/'+imageMap.path+"/"+img+'/job/'+job]=auth+1;
                            update(ref(db),updates);
                           
        
                        }
                        else{
                              const updates={};
                              updates['BannerCount/'+imageMap.path+"/"+img+'/job/'+job]=1;
                              update(ref(db),updates);
                        }
                    })
                    
                    update(child(userRef, "tm_info"), getdata).then(res => {
                        select.style.outline = '0px';
                        setSelect(null);
                        e.target.disabled = false;
                        setPoint(nPoint);
                        setBetPoint(Number(betPoint) + 1000);
                        setImages(imageMap.path);
                    })
                })
            }
        } catch (err){
            console.error(err);
        }
    }

    const onBetButtonClicked = async e => {
        const betMultiplier = 3;
        const betAdder = 0.2;
        if(select == null){
            alert("대중의 선호도가 높을 것으로 예상되는 이미지를 선택해주세요.");
            return;
        }
        
        e.target.disabled = true;

        try{
            const userRef = ref(db, 'users/' + user.uid);
            var snapshot = await get(userRef);
            const data = snapshot.val();
            if(data != null){
                if (Number(betPoint) <= 0){
                    alert("베팅 포인트는 0 pt 이하일 수 없습니다.");
                    e.target.disabled = false;
                    return;
                }
                else if(Number(data.tm_info.point) < Number(betPoint)){
                    alert("베팅 포인트는 보유 중인 포인트를 넘을 수 없습니다.");
                    e.target.disabled = false;
                    return;
                }

                const voteRef = ref(db, "vote/" + imageMap.path);
                var vote_snapshot = await get(voteRef);
                var vote_data = vote_snapshot.val();
                vote_data = vote_data == null ? {} : vote_data;

                var count = {};
                count.content_A = vote_data[imageMap.content_A] == null ? 0 : vote_data[imageMap.content_A];
                count.content_B = vote_data[imageMap.content_B] == null ? 0 : vote_data[imageMap.content_B];
                count.content_C = vote_data[imageMap.content_C] == null ? 0 : vote_data[imageMap.content_C];
                count.content_D = vote_data[imageMap.content_D] == null ? 0 : vote_data[imageMap.content_D];

                var total = count.content_A + count.content_B + count.content_C + count.content_D;

                if(total == 0) {
                    alert("선호도 데이터가 없습니다. 선호도 데이터가 쌓일 때까지 기다려주세요.");
                    e.target.disabled = false;
                    return;
                }

                const portion = count[select.id]/total;
                var probability = portion + betAdder;

                var jackpot = probability > Math.random();
                var addPoint = jackpot ? betPoint * (betMultiplier - 1) : betPoint * -1
                var nPoint = Number(data.tm_info.point) + Number(addPoint);

                var alertText = 
                    "선택하신 이미지에 대한 대중의 선호도는 " + parseInt(portion * 100) + "% 입니다.\n"
                    + "베팅 성공률: " + parseInt(probability * 100) + "%\n"
                    + "배당 포인트: " + betMultiplier + "배\n"
                    + "\n====\n\n"

                if(jackpot)
                    alertText = 
                    alertText + "축하합니다. 베팅에 성공하셨습니다.\n"
                    + "획득 포인트: " + (betPoint * betMultiplier);
                else
                    alertText = alertText + "베팅에 실패하셨습니다."

                var betdata = {};
                betdata['/point'] = nPoint
                betdata['/betLogs/b_'+Date.now()] = {
                    select: select.id,
                    name: imageMap.path + "/" + imageMap[select.id],
                    betPoint: Number(betPoint),
                    jackpot: jackpot,
                    addPoint: addPoint,
                } 

                update(child(userRef, "tm_info"), betdata).then(res => {
                    select.style.outline = '0px';
                    setSelect(null);
                    alert(alertText);
                    e.target.disabled = false;
                    setPoint(nPoint);
                    setBetPoint(0);
                    setImages(imageMap.path);
                })
            }
        } catch (err){
            console.error(err);
        }
    }

    const showRank = async () => {
        try {
            //setOpen(o => !o);

            const userRef = ref(db, 'users/');
            var snapshot = await get(userRef);
            var data = snapshot.val();

            var keys = Object.keys(data);
            console.log(keys);
            var pointMap = [];
            keys.map(v => {
                var tm_info = data[v].tm_info;
                if(tm_info == null)
                    pointMap.push([v, 0]);
                else if(tm_info.point == null)
                    pointMap.push([v, 0]);
                else
                    pointMap.push([v, tm_info.point]);
            })

            pointMap.sort((a, b) => { return b[1] - a[1] });
            const rankListNumber = 50;
            var myRank = -1;
            var rankText = "";
            pointMap.map((v, i) => {
                if(i>=rankListNumber && myRank>-1) return;
                else if(i < rankListNumber){
                    rankText = rankText + (i+1) + "위: " + data[v[0]].name + " | " + v[1] + " pt\n"
                }
                if(v[0] === user.uid){
                    myRank = i + 1;
                    rankText = name + "님은 현재 " + myRank + "위 입니다.\n\n" + rankText
                }
            });

            alert(rankText);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    }

    return (
        <div>

            <NavMenu name={name} onChangeName={name => {setName(name)}}/>
            <div className="Funding_main">
            <div className="Title">
                <h2>이미지 배팅</h2>
                <h5>Pick Your Best</h5>
            </div>
            <div className="Category container-fluid">
                <button className="mr" onClick={() => { 
                    setImages(imageBettingPath); 
                    //imageoptioncheck();
                }}>
                    새로고침
                </button>
                <button className="ml" onClick={() => { showRank(); }}>
                    순위표
                </button>
                <select placeholder="직업 선택" name="joboption" 
                      value={joboption}  onChange={(e) => {setimageBettingPath(e.target.value); setjoboption(e.target.value)}}>
                      <optgroup label='직업을 선택하세요'>
                      <option value=' '></option>
                      <option value='Haneul'>1</option>
                      <option value='ImageBetting1'>2</option>
                      <option value='Pets'>3</option>
                      <option value='ImageBetting2'>4</option>
                      </optgroup>
                    </select>

                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    {close => (
                    <div className="o_modal">
                        <div className="header"> Modal Title </div>
                        <div className="content">
                        {' '}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                        Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                        delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
                        commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
                        explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                        </div>
                        <div className="actions">
                        <Popup
                            trigger={<button className="button"> Trigger </button>}
                            position="top center"
                            nested
                        >
                            <span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                            magni omnis delectus nemo, maxime molestiae dolorem numquam
                            mollitia, voluptate ea, accusamus excepturi deleniti ratione
                            sapiente! Laudantium, aperiam doloribus. Odit, aut.
                            </span>
                        </Popup>
                        <button
                            className="button"
                            onClick={() => {
                            console.log('modal closed ');
                            close();
                            }}
                        >
                            close modal
                        </button>
                        </div>
                    </div>
                    )}
                </Popup>
                <hr></hr>
            </div>
            
            <div className="container-fluid">
                <div className="o_contents">
                    <div className="row">
                        <div className="col-md-6">
                            <button className="banner_pick" id="content_A" onClick={onContentClicked}>
                                <img className="o_content" id="image_A" src="" alt="A"/>
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button className="banner_pick"  id="content_B" onClick={onContentClicked}>
                                <img className="o_content" id="image_B" src="" alt="B"/>
                            </button>
                        </div>
                    </div>
                    <div className="row pt-2">
                        <div className="col-md-6">
                            <button className="banner_pick"  id="content_C" onClick={onContentClicked}>
                                <img className="o_content" id="image_C" src="" alt="C"/>
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button className="banner_pick"  id="content_D" onClick={onContentClicked}>
                                <img className="o_content" id="image_D" src="" alt="D"/>
                            </button>
                        </div>
                    </div>
                    <div className="row pt-2">
                        <div className="col-md-6"><p>1000pt <Button onClick={onGetButtonClicked}>획득</Button></p></div>
                        <div className="col-md-6">
                            <div className="row">
                                <p>
                                    <input className="tr" type="number" value={betPoint} onChange={e => setBetPoint(e.target.value)} />
                                    pt <Button onClick={onBetButtonClicked}>배팅</Button>
                                </p>                                 
                            </div>
                        </div>
                    </div>
                    <div className="row tr">
                        <p>{point} pt 보유 중</p>
                    </div>
                </div>

            <NavMenu name="hi"/>
            <div className="Funding_main">
            <div className="Title">
                <h2>배너 펀딩</h2>
                <h5>Pick Your Best</h5>
            </div>
            <div className="Category">
                <span>
                카테고리 필터 전체
                </span>
                <span>
                    새로고침
                </span>
                <hr></hr>
            </div>
            
            <div className="D_day">
                D-3
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <div className="banner_pick">
                            A
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="banner_pick">
                            B
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="banner_pick">
                            C
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="banner_pick">
                            D
                        </div>
                    </div>
                <div className="row">
                    <div className="col-md-6"><p>1000pt <Button>획득</Button></p></div>
                    <div className="col-md-6"><p>pt<input value="1000"></input><Button>펀드</Button></p></div>
                </div>
                </div>


            </div>
        </div>
        </div>
    )
}