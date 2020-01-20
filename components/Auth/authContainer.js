import { useRouter } from "next/router";
const isServer = typeof window === 'undefined'


const AuthContainer = (Comp) => {
    return function (props) {
        console.log(props , 'auth container ')
    if(!isServer){
        const router = useRouter()
        if (!props.isLogin) {
            router.push('/')
        }
    }

        return (<Comp {...props} />)

    }
}


export default AuthContainer;