import { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginPageCss from "../css/loginPage.module.css";
import ServerError from "../components/serverErrorPage"
import ConnectionRefuse from "../components/connectionRefusePage";
import { Oval } from 'react-loader-spinner';
import {apiUrl} from './url.js'

    //if you want to run any fun after return then use useEffect(Hook) fun/method
    //useEffect fun/method will excute directly after the completeion of return to browser this is called life cycle.
    //useEffect return only once when we not give any dependency's
    //it will take two parameters one is function and second is dependency's.

const Login = () => {
    const navigate = useNavigate();
    const[loading,setLoading] = useState();
    const [credentials, setCredentails] = useState({
        mobileNumber: '',
        password: ''
    })
    const updateHandler = e => {
        setCredentails({...credentials,[e.target.name]:e.target.value})
    }
    //const [token, setToken] = useState(localStorage.getItem('token'))
    //useState ReactHook this RactHook's always use in fun level components only don't use in class level components.
   //To use useState Hook we want to use(or)assign one var&one fun. var is for to assign the value which is given by us and fun is for to change the value of first var.
    const[credentialsErr, setCredentialsErr] = useState();
    const[connectionRefused, setconnectionRefused] =useState(false);
    const [serverErr, setServerErr] = useState(false);
    const {mobileNumber, password} = credentials;



    const userCredentialsSubmitHandler = e => {
        e.preventDefault();
        //By using the preventDefault() we can stop the reloding of form(or)this will prevent all the default activies.

        if(credentials.mobileNumber.length > 10 || credentials.mobileNumber.length < 10 || credentials.mobileNumber==="" || credentials.password.length < 8 || isNaN(mobileNumber)){
            setCredentialsErr(true)
        }else{
            setLoading(true);
            axios.post(apiUrl+"login?", credentials, {
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header to JSON
                },
            }).then(
                //By using axios we can make an request to backend like an API call.
                function (response) {
                    if(response){
                        if(response.status === 200){
                            //setToken(response.data.token)
                            //localStorage.setItem('token',response.data.token)
                            localStorage.setItem('mobile',credentials.mobileNumber)
                            localStorage.setItem('password',credentials.password)
                            navigate('/profile');
                        }else{
                            setServerErr(true)
                        }
                    }
                }
            ).catch((err) => {
                if(err.response){
                    if(err.response.status===500){
                        setServerErr(true)
                    }else if(err.response.status===401){
                        setCredentialsErr(true)
                    }else{
                        setServerErr(true)
                    }
                }else{
                    setconnectionRefused(true)
                }
            }).finally(
                ()=>{
                    setLoading(false)
                }
            )
        }
    }

   useEffect(()=>{
    if(localStorage.getItem('mobile') != null && localStorage.getItem('password')!== null) {
        alert("your browser know your credentials we are redirecting tp profile")
        navigate('/profile');
    }
   },[]) 
    
    return( 
        <div className={loginPageCss.mainDiv}>
            <div className={loginPageCss.mainContainer}>

                {serverErr || connectionRefused ?
                    <div style={{height:'100%',width:'100%'}}>
                        {serverErr ? <ServerError/>:<ConnectionRefuse />}
                    </div>
                :
                    <form onSubmit={userCredentialsSubmitHandler} autoComplete="of">
        
                        <h3>Well Come Back To Best PG's.</h3>
                        {credentialsErr &&<div className={loginPageCss.error}>Invalid Credentails Please check the <br/>Mobile Number and password.</div>}
                        
                        <div style={{marginTop:'3%'}} >Mobile Number</div>
                        <input type="text" name="mobileNumber" value={mobileNumber} onChange={updateHandler} />
                        
                        <div style={{marginTop:'5%'}} > Password</div>
                        <input type="password" name="password" value={password} onChange={updateHandler}/><br/>
                        
                        <button className={loginPageCss.loginBut}   disabled={loading}>{loading ? <Oval color="black" height={30} width={30}/>:<span>Login</span>}</button>
                        
                        <div style={{marginLeft:'8%'}}>---------------  New User?  ---------------</div>
                
                        <button  className={loginPageCss.createActBut} disabled={loading} onClick={()=>navigate('/signup')}>Create an Account</button>
                        
                        <button className={loginPageCss.homeBut} onClick={()=>navigate('/')}>Home</button>
                    </form>
                }
            </div>
        </div>
    )
}

export default Login;