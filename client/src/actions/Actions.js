import  *as Types from './../constants/actionsType';

//LoadUser
export const LoadUser = (token)=>{
   return {
      type: Types.LOAD_USER,
      payload: token
   }
};
export const LoadUserSuccess = ({user})=>{
   return { 
      type: Types.LOAD_USER_SUCCESS, 
      payload: {
         userLoading: false,
         userAuthenticated: true,
         user,
      }
   }
};
export const LoadUserFail = ({ message})=>{
   return { 
      type: Types.LOAD_USER_SUCCESS, 
      payload: {
         userLoading: true,
         userAuthenticated: false,
         user: null,
         accessToken: null,
         message
      }
   }
};

// login
export  const Login = (data)=>{
   return {
    type: Types.LOGIN,
    payload: data
   }
};

export const  LoginSuccess = ({accessToken, message})=>{
   return { 
      type: Types.LOGIN_SUCCESS, 
      payload: {
         userLoading: false,
         userAuthenticated: true,
         user: null,
         accessToken,
         message
      }
   }
};

export const LoginFail = ({message}) =>{
   console.log(message)
   return{
      type: Types.LOGIN_FAIL,
      payload: {
         message,
         userLoading: true,
         userAuthenticated: false,
         user: null,
         accessToken: null
      }
   }
};


// register 
export const  Register=(data)=>{
   return {
      type: Types.REGISTER,
      payload:data
   }
};

export const RegisterSuccess = ({ accessToken, message})=>{
   return { 
      type: Types.REGISTER_SUCCESS, 
      payload: {
         userLoading: false,
         userAuthenticated: true,
         user: null,
         accessToken,
         message
      }
   }
};

export const RegisterFail = ({message}) =>{
   console.log(message)
   return{
      type: Types.REGISTER_FAIL,
      payload: {
         userLoading: true,
         userAuthenticated: false,
         user: null,
         accessToken: null,
         message
      }
   }
};

//delete user
export const DeleteUser = (id)=>{
   console.log("id:", id);
   return{
      type: Types.DELETE_USER,
      payload: id
   }
}
export const DeleteUserSuccess = (message)=>{
   console.log(message);
   return {
      type: Types.DELETE_USER_SUCCESS,
      payload: message
   }
}
export const DeleteUserFail = (message)=>{
   console.log(message);
   return {
      type: Types.DELETE_USER_SUCCESS,
      payload: message
   }
}
//UpdateUser
export const UpdatedUser = (data)=>{
   console.log("dataUpdate:", data);
   return {
      type: Types.UPDATE_USER,
      payload: data
   }
};
export const UpdateUserSuccess = (message)=>{
   console.log(message);
   return {
      type: Types.UPDATE_USER_SUCCESS,
      payload: message
   }
};
export const UpdateUserFail = (message)=>{
   console.log(message);
   return {
      type: Types.UPDATE_USER_FAIL,
      payload: message
   }
};


//add Film
export const AddFilm = (data)=>{
   return {
      type: Types.ADD_FILM,
      payload: {
         isLoading: true,
         data
      }
   }
};
export const AddFilmSuccess = (data)=>{
   return {
      type: Types.ADD_FILM_SUCCESS,
      payload: data
   }
};
export const AddFilmFail = (data)=>{
   return {
      type: Types.ADD_FILM_FAIL,
      payload: data
   }
};

// update Film
export const UpdateFilm = (data)=>{
   return {
      type: Types.UPDATE_FILM,
      payload: {data, isLoading: true}
   }
};
export const UpdateFilmSuccess = (data)=>{
   return {
      type: Types.UPDATE_FILM_SUCCESS,
      payload: data
   }
};
export const UpdateFilmFail = (data)=>{
   return {
      type: Types.UPDATE_FILM_FAIL,
      payload: data
   }
};

// delete Film

export const DeleteFilm = (data)=>{
   return {
      type: Types.DELETE_FILM,
      payload: data
   }
};
export const DeleteFilmSuccess = (data)=>{
   return {
      type: Types.DELETE_FILM_SUCCESS,
      payload: data
   }
};
export const DeleteFilmmFail = (data)=>{
   return {
      type: Types.DELETE_FILM_FAIL,
      payload: data
   }
};













