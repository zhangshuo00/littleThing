import React, { Component } from 'react';
import '../css/userDetails.css';
import {Icon,Modal } from 'antd-mobile';
const alert = Modal.alert;
//用户详情页

export default class UserDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            data:{headimg:'images/timg.jpg',uname:'请登录',uemail:'请登录'},           
        }
    }

    componentDidMount(){
        const uid = localStorage.getItem('uid');
        const post = {uid:uid};
        // console.log(post);
        fetch('/userDetail',{
            method:'POST',
            mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            this.setState({
                data: {
                    headimg:data[0].headimg,
                    uname:data[0].uname,
                    uemail:data[0].uemail
                }
            })
        })
    }

    // headingChange=()=> {
    //     window.location='./perpon';
    // }
    userOut=()=>{
        this.setState({
            data:{heading:'images/timg.jpg',uname:'请登录',uemail:'请登录'}
        })
        window.location = '/';
        const storage = window.localStorage;
        localStorage.removeItem("uid");
    }

    render() {
        return (
            <div>
                <Icon type="left" onClick={() =>  window.history.back(-1)} style={{marginLeft:'5%',paddingTop:'30px',float:'left'}}/>
                <img src={require("../" +this.state.data.headimg)} className='user-heading' onClick={() => window.location='/newperpon'}></img>
                <p className='user-name'>{this.state.data.uname}</p>
                <p className='user-email'>{this.state.data.uemail}</p>
                <div className='user-mark'></div>
                <div className='user-type'>
                    <img src={require("../images/personx.png")}  onClick={() => window.location='/person'}></img>
                    <p onClick={() => window.location='/perpon'}>个人主页</p>
                </div>
                <div className='user-type'>
                    <img src={require("../images/infor.png")} onClick={() => window.location='/msg'}></img>
                    <p onClick={() => window.location='/msg'}> 信息</p>
                </div>
                <div className='user-type'>
                    <img src={require("../images/lingdang_2f.png")} onClick={() => window.location='/find'}></img>
                    <p onClick={() => window.location='/find'}>  发现</p>
                </div>
                <div className='user-type'>
                    <img src={require("../images/shezhi.png")} onClick={() => window.location='/me'}></img>
                    <p onClick={() => window.location='/me'}>  设置</p>
                </div>
                <div className='user-mark1'></div>
                <p className='user-out' onClick={() =>
                        alert('退出登录', 'Are you sure???', [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '确定', onPress: () => this.userOut() },
                        ])
                    }
                    >退出登录
                </p>
            </div>
        )
    }
}
