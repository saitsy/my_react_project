import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ajax from '../../api/ajax'
import logo from './images/logo.png'
import './css/login.less'

const {Item} = Form



export default class Login extends Component {
	//表单提交且验证通过的回调
	onFinish = values => {
		//axios通过响应拦截器和处理then的链式调用很像
		//和axios响应拦截器的返回值有关
    ajax.post('http://localhost:3000/login',values).then(
			response => {console.log('成功了',response);},
			error => {console.log('出错了',error);}
		)
	};

	//密码的验证器（自定义校验）
	pwdValidator = (_,value="")=>{
		let errMsgArr = []
		if(!value.trim()) return Promise.reject('密码必须输入！')
		if(value.length < 4) errMsgArr.push('密码必须大于等于4位')
		if(value.length > 12)errMsgArr.push('密码必须小于等于12位')
		if(!(/^\w+$/).test(value)) errMsgArr.push('密码必须是英文、数字、下划线组成！')
		if(errMsgArr.length !== 0) return Promise.reject(errMsgArr)
		else return Promise.resolve()
	}
	
	render() {
		return (
			<div className="login">
				<header>
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</header>
				<section>
					<span className="title">用户登录</span>
					{/*
						用户名/密码的的合法性要求
							1). 必须输入
							2). 必须大于等于4位
							3). 必须小于等于12位
							4). 必须是英文、数字、下划线组成
						*/
						}
					<Form
						className="login-form"
						onFinish={this.onFinish} //表单提交的回调
					>
						<Item
							name="username"
							rules={[
								{required:true,message:'用户名必须输入！'}, //必填项
								{min:4,message:'用户名必须大于等于4位！'},
								{max:12,message:'用户名必须小于等于12位！'},
								{pattern:/^\w+$/,message:'用户名必须是英文、数字、下划线组成！'},
							]}
						>
							<Input 
								prefix={<UserOutlined className="site-form-item-icon" />} 
								placeholder="用户名"
							/>
						</Item>
						<Item
							name="password"
							rules={[{validator:this.pwdValidator}]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="密码"
							/>
						</Item>
						<Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
						</Item>
					</Form>
				</section>
			</div>
		)
	}
}
