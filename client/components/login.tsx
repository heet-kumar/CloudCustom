import {FaUserCircle} from 'react-icons/fa';
import {RiLockPasswordLine} from 'react-icons/ri'
import {MdOutlineAlternateEmail} from 'react-icons/md'
import { useEffect,useState } from 'react';


const Login: React.FC = () => {

    const [msg,setmsg] = useState<string>("");
    const [email,setemail] = useState<string>();
    const [password,setpassword] = useState<string>();

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setemail(e.currentTarget.value);
    }

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setpassword(e.currentTarget.value);
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
                    <button type="button" className="btn btn-outline-dark">Login</button>
                    <a href="/signup" className="align-self-start btn btn-link link-offset-2 link-underline link-underline-opacity-0" role="button" >Create account</a>
                </div>
            </div>
        </div>
    );
}

export default Login;