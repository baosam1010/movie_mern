import axiosClient from './axiosClient';

const userApi = {
    loadUser: (token) => {
        const url = "/auth";
        return axiosClient.get(url, {
            headers: {
                Authorization: 'Bearer '+ token,
            }
        })
    },
    login: (params) => {
        const url = '/auth/login';
        console.log('params:', params)
        return axiosClient.post(url,
            params,
        )
    },
    register: (params) => {
        const url = '/auth/register';
        return axiosClient.post(url, params)
    },

    
    getAll: (token)=>{
        const url = '/users';
        return axiosClient.get(url, {
            headers: {
                Authorization: 'Bearer '+ token,
            }
        })
    },
    getOne:(id)=>{
        const url = `/users/${id}`;
        return axiosClient.get(url)
    },
    deleteUser: (id)=>{
        const url = `/users/${id}`;
        return axiosClient.delete(url)
    },
    updateUser: (data)=>{
        const {_id:id} = data;
        const url = `/users/${id}`;
        return axiosClient.put(url, data)
    }

}
export default userApi;



