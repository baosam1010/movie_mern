import { LocalStorage_TokenName } from '../constants/actionsType';
import axiosClient from './axiosClient';


const filmApi = {
    getAll: (token)=>{
        const url = '/films';
        return axiosClient.get(url,{
            headers: {
                Authorization: 'Bearer '+ token,
            }
        });
    },
    getFilms: (params)=>{
        const url = '/films';
        return axiosClient.get(url,{            
            params,
            headers: {
                Authorization: 'Bearer '+ localStorage[LocalStorage_TokenName],
            }
        });
    },
    getOne: (id)=>{
        const url = `/films/${id}`;
        return axiosClient.get(url)
    },
    addFilm: (data)=>{
        const url = '/films';
        return axiosClient.post(url, data)
    },
    updateFilm: (data)=>{
        const {_id: id} = data;
        const url = `/films/${id}`;
        return axiosClient.put(url, data)
    },
    deleteFilm: (id)=>{
        const url = `/films/${id}`;
        return axiosClient.delete(url)
    },
}

export default filmApi;