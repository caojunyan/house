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
export const getCustomers = (_this,page) => {
  return axios.get("/customers?include=orders&page=" + page ).then(res => {
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
// 送审
export const sendAssesses = (_this, id) => {
  return axios.put("customers/" + id + "/updateCustomerStatus", {
    status: 2
  }).then(res => {
    Message("提交成功");
    return res.data;
  }).catch(err => {

  })
};
// 删除图片
export const deleteImage = (_this, id) => {
  return axios.delete("/credentials/" + id).then(res => {
    Message("删除成功");
  }).catch(err => {

  })
};
// 获得图片
export const getImages = (_this, id, type) => {
  return axios.get("/customers/" + id + "/credentials?type=" + type).then(res => {
    return res.data;
  }).catch(err => {

  })
};
// 根据客户id查找
export const getCustomersById = (_this,id) => {
  return axios.get("/customers/"+id+'?include=credentials' ).then(res => {
    return res.data;
  }).catch(err => {

  })
};

// 根据客户名查询
export const getCustomersByName = (_this,name) => {
  return axios.get("/customers/query/clientName?name="+name ).then(res => {
    return res;
  }).catch(err => {

  })
};
// 获取异常表
export const getAbnormal = (_this,status) => {
  return axios.get("/orderAbnormals/status/"+status+'?include=order' ).then(res => {
    // Message("提交成功");
    return res.data;
  }).catch(err => {

  });
};

// 贷后处理异常
export const dealAbnormal=(_this,id,_data)=>{
  return axios.post("/customerOrders/"+id+"/dealWiths",_data).then(res=>{
    return res
  })
}
// 根据客户名查询异常客户
export const getAbnormalByname=(_this,name)=>{
  return axios.get("/customers/abnormals/clientName?name="+name+'&include=order').then(res=>{
    return res
  })
}

// 贷后人员列表
export const getAssetsList=(_this)=>{
  return axios.get('showAsset').then(res=>{
    return res
  })
}
