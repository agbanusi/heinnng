import React, { useEffect, useState } from 'react'
import img1 from './icon_calender.svg'
import img2 from './icon_search.svg'
import img3 from './logo.png'
import img4 from './icon_clip.svg'
import img5 from './icon_arrow01.svg'
import img6 from './icon_arrow02.svg'
import img7 from './icon_mail_sp.svg'
import './App.css'

export default function App() {
    const [value, setValue] = useState("")
    const [mail, setMail]=useState([{from: "aa@example.com", to:"zzzz@example.com, zzzz@example.com, zzzz@example.com, zzzz@example.com", subject:"The checking of subject",
    date: "12/2/2020", attach: true, replies:2, body:"ghtyerjhbdo uhojn is a boog buto in thenu uthsnk, ghtyerjhbdo uhojn is a boog buto in thenu uthsnk"}, {from: "aa@example.com", to:"zzzz@example.com", subject:"The checking of subject",
    date: "12/2/2020", attach: true, replies:1,  body:"ghtyerjhbdo uhojn is a boog buto in thenu uthsnk"}, {from: "aa@example.com", to:"zzzz@example.com, zzzz@example.com, zzzz@example.com", subject:"The checking of subject",
    date: "12/2/2020", attach: false, replies:3, body:"ghtyerjhbdo uhojn is a boog buto in thenu uthsnk, ghtyerjhbdo uhojn is a boog buto in thenu uthsnk, ghtyerjhbdo uhojn is a boog buto in thenu uthsnk"}, {from: "aa@example.com", to:"zzzz@example.com", subject:"The checking of subject",
    date: "12/2/2020", attach: false, replies:0, body:"ghtyerjhbdo uhojn is a boog buto in thenu uthsnk"}])
    const [maill, setMaill]=useState(mail)

    const submit=(e)=>{
        e.preventDefault()
        if(value !=""){
            let val = value.split('-')
            val = val.map(i=>Date.parse(i.trim()))
            let data = mail
            if(val.length ==2){
                data = mail.filter(i=>{
                    let t = Date.parse(i)
                    if((val[0] >= t && val[1]<= t) || (val[0] <= t && val[1]>= t)){
                        return i
                    }
                })
            }else if(val.length ==1 ){
                data = mail.filter(i=> Date.parse(i) == val[0])
            }else{
                data = mail
            }
            setMaill(data)
        }
        
    }
    
    return (
        <div className="app-cover">
            <form className="app-search" onSubmit={submit}><img src={img1}/> <input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Enter a date range, like 2019/2/3 - 2020/3/4 " /> <button className="search"><img  src={img2} /></button></form>
            <h3 className="app-result">Results: {maill.length} mail(s)</h3>
            <hr/>
            <div className='app-main'>
                {mail.length==0?<img src={img3} /> : <Mail mail={maill} />}
            </div>
        </div>
    )
}

const Mail=(props)=>{
    const [widt, setWidt]=useState(false)
    const [seth, setSeth] = useState(0)
    const [clicks, setClick] = useState(props.mail.map(i=>false))

    useEffect(()=>{
        setWidt(width())
        show(seth)
    },[])
    
    const processDate=(date)=>{
        let present = new Date()
        let past = new Date(date)
        let month = ['Jan',"Feb",'Mar','Apr','May','Jun',
        'Jul','Aug','Sept','Oct','Nov','Dec']
        if(present.getFullYear() === past.getFullYear()){
            if(present.getMonth() === past.getMonth()){
                if(present.getDate() === past.getDate()){
                    return `${past.getHours()}:${past.getMinutes()}`
                }else{
                    return ""+ past.getDate()+" "+month[past.getMonth()]
                }
            }else{
                let num = past.getDate()>9?past.getDate():"0"+past.getDate()
                return ""+month[past.getMonth()]+" " +num
            }
        }else{
            return `${past.getFullYear()}/${past.getMonth()}/${past.getDate()}`
        }
    }
    const process=(let)=>{
        return let.length>30? let.slice(0,25)+", ...":let
    }
    const width=()=>{
        if(screen.width < 600){
            return false
        }
        return true
    }
    const show=(e)=>{
        let tt = ['0h','1h','2h','3h']
            tt.map(j=>{
                var x = document.getElementsByClassName(j);
                var i;
                for (i = 0; i < x.length; i++) {
                x[i].style.color = "#555";
                } 
            })
        
        if(e==0){
            var x = document.getElementsByClassName(e+'h');
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.color = "black";
            }
        }else{
            var x = document.getElementsByClassName(e.target.className);
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.color = "black";
            }
            setSeth(Number(e.target.className[0])) 
        }
    }
    const clicked=(k)=>{
        let clic = clicks
        clic[k]= !clic[k]
        setClick([...clic])
        //console.log(clic)
    }
    
    return(
        <div className="table">
            {widt?
        
            <table>
            <thead>
                <tr className="table-head">
                    <th>From</th>
                    <th>To</th>
                    <th>Subject</th>
                    <th><b>Date</b></th>
                </tr>
            </thead>
            <tbody>
                {props.mail.map((i,k)=>(
                    <React.Fragment key={k}>
                        <tr className="table-body" onClick={()=>clicked(k)}>
                            <td>{i.from}</td>
                            <td className="main-img">{process(i.to)} {i.replies!=0?<p className="main-dark">+{i.replies}</p>:<></>}</td>
                            <td><div className="main-to">{i.subject} {i.attach?<img src={img4} />:<></>}</div></td>
                            <td><b>{processDate(i.date)}</b></td>
                        </tr>
                        {clicks[k]?<tr className='messager'>
                            <td colSpan="4"><h4>{i.body}</h4></td>
                        </tr>:<></>}
                    </React.Fragment>
                ))}
            </tbody>
            </table>

            :<div>
                <table>
                <thead>
                    <tr className="tabled">
                        <th className="0h" onClick={(e)=>show(e)}>From {seth==0? <img src={img5}/>:<></>} |</th>
                        <th className="1h" onClick={(e)=>show(e)}>To  {seth==1? <img src={img5}/>:<></>} |</th>
                        <th className="2h" onClick={(e)=>show(e)}>Subject  {seth==2? <img src={img5}/>:<></>} |</th>
                        <th className="3h"  onClick={(e)=>show(e)}>Date  {seth==3? <img src={img5}/>:<></>}</th>
                    </tr>
                </thead>
                </table>
                {props.mail.map((i,k)=>(
                    <React.Fragment key={k}>
                    <div className='message' onClick={()=>{clicked(k)}}>
                        <div className='top'>
                            <img src={img7} />
                            <div className='meant'>
                                <div className='beau'>
                                    <div className='drop'>
                                        <h3 className="0h">{i.from}</h3>
                                        <div className='mean 3h'>
                                            {i.attach?<img className='meanie' src={img4} />:<></>}
                                            {processDate(i.date)}
                                            <img src={img6} />
                                        </div>
                                    </div>
                                    <div className='drop'>
                                        <h3 className="1h">{process(i.to)}</h3>
                                        {i.replies!=0?<p className="main-dark">+{i.replies}</p>:<></>}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <h2 className="2h">{i.subject}</h2>
                    </div>
                    {clicks[k]?<div className='messager'>
                        <h4>{i.body}</h4>
                    </div>:<></>}
                    </React.Fragment>
                ))}
            </div>}
        </div>
    )
}