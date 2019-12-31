import types from './actionTypes';
import fetch from "isomorphic-unfetch";
import { apiCaller } from '../api'


const baseURL = `http://localhost:3000`

const pathClient = `/api/v1/client`

export const add_education = ({ education: { education}}) =>({
    type: types.ADD_EDUCATION,
    education
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


export const login_user = (userData) => ({
    type: types.LOGIN,
    userData,
})


const add_jobs = ({ jobs, remaining, resultsLength, page, numofJobs} ) => ({
    jobs, remaining, resultsLength, page, numofJobs,
    type: types.LOAD_JOBS
})

export const islogin = val => ({
    type: types.ISLOGIN,
    val
})

export const updateUserInfo = userData => ({
    type: types.UPDATE_USER_INFO,
    userData
})




export const loaded_jobs = (page, limit) =>{
    return function (dispatch){

         dispatch({type: types.FETCHING_JOBS})
        return fetch(`http://localhost:3000/api/v1/client/jobslist?page=${page}&limit=${limit}`)
        .then(
            res =>{
                
                 dispatch({type: types.FETCHING_JOBS})
                 return res.json()
                } ,
            error => {
                
                dispatch({type: types.FETCHING_JOBS})
                console.log(error)
            }
            )
            .then(json => dispatch( add_jobs(json) ) )

    }
}

export const updateEdu = (id, data) => {
    return function (dispatch) {
        return fetch(`${baseURL}/api/v1/client/education/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=> res.json(),
        error=>console.log(error))
        .then(json => dispatch(add_education(json)))

    }
}






export const add_employment = ({employment}) => ({
    type: types.ADD_EMPLOYMENT,
    employmentHistory: employment.employmentHistory
});

export const addEmp = (id, data) => {
    console.log(data)
    return function (dispatch) {
        return fetch(`${baseURL}/api/v1/client/employment/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then( (res) => {
            return res.json()
        },
        (error) => {
            console.log(error)
        }
        )
        .then(json => dispatch(add_employment(json)))
    }
}













export const userUpdate = (path, data, action) => {
    console.log(data)

    return async function (dispatch) {
try   {
        const res = await fetch(`${baseURL}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const data =await res.json()
       return dispatch(action(data))

    } catch(error) {

        console.log(error)
    }

}
}



export const deleteEducation = (userid, eduid) => {
    const path = `${pathClient}/education/${userid}/${eduid}`;


    return function(dispatch){

        return apiCaller(path,{
            method: 'DELETE',
            redirect: 'follow'
        })
        .then(res=>{
            console.log(res)
            return dispatch(remove_education(eduid))
        
        })
    }

}


export const deleteEmpAction = (userid, epmid) => {
  const path = `${pathClient}/employment/${userid}/${epmid}`;

  return function(dispatch) {
    return apiCaller(path, {
      method: "DELETE",
      redirect: "follow"
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

export const AddSkillAction = (skill, userid) => {
    const path = `${pathClient}/skills/${userid}`

    return function (dispatch){

        return apiCaller(path, {
          method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
         body: JSON.stringify(skill)
          
        })
        .then(json => dispatch(add_skill(json)))
    }
}


export const DeleteSkillAction = (userid, skillid) => {
    const path = `${pathClient}/skills/${userid}/${skillid}`;

    return function (dispatch) {
        return apiCaller(path, {
          method: "DELETE",
          redirect: "follow"
        })
        .then(res => {
            return dispatch(delete_skill(skillid))
        })
    }

}


