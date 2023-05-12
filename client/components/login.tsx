import {FaUserCircle} from 'react-icons/fa';
import {RiLockPasswordLine} from 'react-icons/ri'
import {MdOutlineAlternateEmail} from 'react-icons/md'
import { useEffect,useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';


const Login: React.FC = () => {

    const router = useRouter();

    const [msg,setmsg] = useState<string>("");
    const [email,setemail] = useState<string>("");
    const [password,setpassword] = useState<string>();

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setemail(e.currentTarget.value);
    }

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setpassword(e.currentTarget.value);
    }

    const authenticate = async() => {
        if(password!=="" && email!==""){
            await axios.post("http://localhost:5000/login",{email,password})
            .then( res => {
                console.log(res.data.msg);
                localStorage.setItem('Access','true');
                router.push("/dashboard");
            })
            .catch( err => {
                console.log("Error :",err);
                setmsg(err.response.data.msg);
            })
        }
        else{
            setmsg("fields are empty")
        }
    }

    return(
        <div className="d-flex .justify-content-between">
            <div className="login_left w-50">
                <img src="/cloud-services.png" className="img-fluid" alt="cloud image" />
            </div>
            <div className="login_right w-50 d-flex justify-content-center align-items-center">
                <div className='border border-dark p-5 d-flex flex-column gap-4 position-relative rounded'>
                    <div className='position-absolute ' style={{top: '-11.5%'}}>
                        <FaUserCircle color={'#262f3d'} size={'70'}/>
                    </div>
                    <div className='text-danger'>{msg}</div>
                    <div className="input-group input-group-lg ">
                        <span className="input-group-text" id="inputGroup-sizing-lg"><MdOutlineAlternateEmail size={'25'}/></span>
                        <input 
                            type="email" 
                            placeholder='email'
                            className="form-control" 
                            onChange={handleEmail}
                        />
                    </div>
                    <div className="input-group input-group-lg">
                        <span className="input-group-text" id="inputGroup-sizing-lg"><RiLockPasswordLine size={'25'}/></span>
                        <input 
                            type="password" 
                            placeholder='password'
                            className="form-control"
                            onChange={handlePassword}
                        />
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-outline-dark"
                        onClick={authenticate}
                    >
                        Login
                    </button>
                    <Link href={'/signup'}><div className="align-self-start btn btn-link link-offset-2 link-underline link-underline-opacity-0" role="button" >Create account</div></Link>
                </div>
            </div>
        </div>
    );
}

export default Login;