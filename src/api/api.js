import axios from './httpConfig';
import qs from 'qs';


// 登录
export const getAdmin = (_this,info) => {
  return axios.post("/authorizations",info).then(res => {
    localStorage.setItem('user_name', info.email);
    localStorage.setItem('user_token', res.data.data.token);
    return res
  }).catch(err => {
    console.log(err)
  });
}

export const getUser=(_this)=>{
  return axios.get('/user').then(res=>{
    return res
  }).catch(err=>{
    console.log(err)
  })
}

// 客户表
export const getCustomers = (_this) => {
  return axios.get("/customers?include=orders" ).then(res => {
    return res.data;
  }).catch(err => {

  })
};

// 创建客户
export const submitCustomer = (_this, data) => {
  return axios.post("/customers", data).then(res => {
    return res.data;
  }).catch(err => {

  })
};
