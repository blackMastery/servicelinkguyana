import types from './actionTypes';
import { apiCaller } from '../api'



const pathClient = `/api/v1/client`

export const add_education = ({ education: { education}}) =>({
    type: types.ADD_EDUCATION,
    education
})



export const toggleView = () =>({
    type: types.VIEW_AS_OTHERS
})

export const chargingRate = (hourRate) =>({
    type: types.HOUR_RATE,
    hourRate
})


export const cover_letter = (coverLetter) =>({
    type: types.COVERLETTER,
    coverLetter
})


export const est_action = (est) => ({
    type: types.EST,
    est
})


export const remove_employment =( id ) => ({
    type: types.DELETE_EMPLOYMENT,
    id: id
});

export const remove_education = id => ({
         type: types.DELETE_EDUCATION,
         id: id
       });

export const edit_education = ( id, education ) => ({
    type: types.EDIT_EDUCATION,
    id,
    education
});


export const logout = () =>({
    type: types.LOGOUT
})


export const login_user = ({token,user}) => ({
    type: types.LOGIN,
    token,
    user,
})


const add_jobs = ({ jobs, remaining, resultsLength, page, numofJobs} ) => ({
    jobs, remaining, resultsLength, page, numofJobs,
    type: types.LOAD_JOBS
})




const job_search = ({ jobs, remaining, resultsLength, page}) => ({
    type: types.JOB_SEARCH,
    jobs, remaining, resultsLength, page

})

export const islogin = val => ({
    type: types.ISLOGIN,
    val
})

export const updateUserInfo = ({user}) => ({
    type: types.UPDATE_USER_INFO,
    user: {...user}
})

export const valid_proposal = () =>({
    type: types.VALID_PROPOSAL
})


export const set_proposal_id = (provider, job) =>({
    type: types.PROPOSAL_IDS,
    provider,
    job
})

export const search_view = (view) => ({
    type: types.SEARCH_VIEW,
    searchView: view
})


const add_search = (q) =>({
    type: types.ADD_SEARCH,
    q
})










export const updateUser = (id, token, data) => {
    
    console.log({id, token,data})
    return function (dispatch){
        return apiCaller(`${pathClient}/updateclientinfo/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        })    
        .then(json => {
        //   console.log(json);
          const {status} = json;
          if(status !== 'success'){
               throw json
            }
            return dispatch(updateUserInfo(json));
        },
        (error) => {

            console.log(error, "catched error");
            return error;

        }

     );
}
}






export const loaded_jobs = (page, limit) =>{
    return function (dispatch){

         dispatch({type: types.FETCHING_JOBS})
        return apiCaller(`/api/v1/client/jobslist?page=${page}&limit=${limit}`)
        .then(
            json =>{
                
                   dispatch({ type: types.FETCHING_JOBS });
                  return dispatch( add_jobs(json) )
                })
                .catch((error) => {
                    
                    dispatch({type: types.FETCHING_JOBS})
                    console.log(error)
                })
                

    }
}

export const updateEdu = (id, token, data) => {
    console.log(id, data)
    return function (dispatch) {
        return apiCaller(`/api/v1/client/education/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(json => dispatch(add_education(json)))

    }
}






export const add_employment = ({employment}) => ({
    type: types.ADD_EMPLOYMENT,
    employmentHistory: employment.employmentHistory
});

export const addEmp = (id, token, data) => {
    // console.log(data)
    return function (dispatch) {
        return apiCaller(`/api/v1/client/employment/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(json => dispatch(add_employment(json)))
    }
}















export const deleteEducation = (userid, token, eduid) => {
    const path = `${pathClient}/education/${userid}/${eduid}`;
    return function(dispatch){

        return apiCaller(path,{
            method: 'DELETE',
            redirect: 'follow',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=>{
            // console.log(res)
            return dispatch(remove_education(eduid))
        
        })
    }

}


export const deleteEmpAction = (userid, token, epmid) => {
  const path = `${pathClient}/employment/${userid}/${epmid}`;

  return function(dispatch) {
    return apiCaller(path, {
      method: "DELETE",
      redirect: "follow",
      headers: {
          Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      return dispatch(remove_employment(epmid));
    });
  };
};



const add_skill = ({skills}) => ({
    type: types.ADD_SKILL,
    skills: skills.skills
})

const delete_skill = id => ({
  type: types.REMOVE_SKILL,
  id
});

export const AddSkillAction = (skill, token, userid) => {
    const path = `${pathClient}/skills/${userid}`

    return function (dispatch){

        return apiCaller(path, {
          method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
         body: JSON.stringify(skill)
          
        })
        .then(json => dispatch(add_skill(json)))
    }
}


export const DeleteSkillAction = (userid, token, skillid) => {
    const path = `${pathClient}/skills/${userid}/${skillid}`;

    return function (dispatch) {
        return apiCaller(path, {
          method: "DELETE",
          redirect: "follow",
          header: {
              Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
            return dispatch(delete_skill(skillid))
        })
    }

}





export const Register = ( data ) => {
    const path = `${pathClient}/signup`;
    
    return function (dispatch) {
        return apiCaller(path,{
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then( json =>{
            return dispatch(login_user(json))
        } )
        .catch(error=>{
            console.log(error)
        })

    }
}



const errorMessage = ({message}) => ({
    type: types.LOGIN_ERROR,
    message
})
export const userLogin = (data) => {
    const path = `${pathClient}/login`;
    return function (dispatch) {
        return apiCaller(path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(json => {
            if(!json.ok){
                
                return dispatch(errorMessage(json))  
            }
            return dispatch(login_user(json));
          })
          .catch(error => {
            console.log(error);
          });
    }

}


export const turn_off_search = () =>({
    type: types.TURN_OFF_SEARCH_VIEW
})


function stringMe(obj) {
    // let str = ''
    for (let k in obj) {
        return `${k}=${obj[k]}`
    }
}




function serialize(arr) {
    return arr.reduce((curr, nex) => {

        return curr + `&${stringMe(nex)}`
    }, '')
}

export const searchReq = (q, filters, page, limit) => {
    console.log(filters)
   const query = filters ? serialize(filters) : '';
    const path = `${pathClient}/job/search?q=${q}&limit=${limit}&page=${page}${query}`;
    
    return function (dispatch) {
        dispatch({type: types.SEARCHING})
        dispatch({type: types.SAVE_SEARCH, q: q})

        return apiCaller(path,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(
            json =>{
                dispatch({ type: types.SEARCH_COMPLETE });
                console.log(json)
                dispatch(add_search(q))
                return dispatch( job_search(json) )
        })
        .catch((error) => {
            dispatch({type: types.SEARCH_COMPLETE })
            console.log(error)
            return dispatch({type: types.SEARCH_ERROR,
            error: error})
        })
                    
    }
}


const proposals_received = ({proposals}) => ({
    type: types.PROPOSALS_RECEIVED,
    proposals
})

export const getProposals = (id,token) => {
    const path = `${pathClient}/proposals/${id}`;
        console.log({path, token})

    return function(dispatch){
        dispatch({type: types.LOADING_PROPOSALS})
        return apiCaller(path,{
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },

        })
        .then((json) => {
            
           return dispatch( proposals_received(json) )
        })
        .catch((error) => {
            console.log(error)
        })
    }
}



export const password_reset = (passwords,token) =>{
    const path = `${pathClient}/resetpassword/${token}`;
    return function(dispatch){
        dispatch({type: types.PASSWORD_RESET_REQUEST})
        return apiCaller(path, {
            method: 'PATCH',
            body: JSON.stringify(passwords),
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((json)=>{
            return dispatch({type: types.PASSWORD_RESET_COMPLETE})

        })
        .catch(error=>error)
    }
}


const caller = ( path, config, onSuccess, onError) => apiCaller(path,config)
.then((json)=>{
    console.log(json);
    return onSuccess(json)
})
.catch((error)=>{
    console.log(error);
    return onError(error)
})

export const forgot_password = ( email ) => {
    return (dispatch) =>{
        dispatch({type: types.FORGOT_PASSWORD_REQUEST})
        const onSuccess = ()=> dispatch({type: types.FORGOT_PASSWORD_SUCCESS})
        const onError = () => dispatch({ type: types.FORGOT_PASSWORD_ERROR });
        const path = `${pathClient}/forgotpassword`
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(email)
        };
        
        return caller(path, config, onSuccess, onError)
    }
}







export const proposal_request = (data, token) => {
    return function (dispatch) {

        dispatch({ type: "SENDING PROPOSAL" })
        const onSuccess = (data) => {
            console.log(data)
            return dispatch({ type: "PROPOSAL SENT" })
    }
        const onError = (error) => {
            console.log(error)
            return dispatch({ type: "PROPOSAL ERROR" })
        };
        const path =  `/api/v1/provider/proposal`;
        const config = {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }

        return caller(path, config, onSuccess, onError);
    }
}