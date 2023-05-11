import {FaUserCircle} from 'react-icons/fa';
import {RiLockPasswordLine} from 'react-icons/ri'
import {MdOutlineAlternateEmail} from 'react-icons/md'
import {AiOutlineUser} from 'react-icons/ai'
import { useEffect,useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';


const Create: React.FC = () => {

    const router = useRouter();

    const [msg,setmsg] = useState<string>();
    const [name,setname] = useState<string>();
    const [email,setemail] = useState<string>();
    const [password,setpassword] = useState<string>();
    const [cpassword,setcpassword] = useState<string>();

    const handleName = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setname(e.currentTarget.value);
    }

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setemail(e.currentTarget.value);
    }

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setpassword(e.currentTarget.value);
    }

    const handleRePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setcpassword(e.currentTarget.value);
    }

    const authenticate = async() => {
        if(password === cpassword && name!=="" && email!==""){
            await axios.post("http://localhost:5000/signup",{name,email,password})
            .then( res => {
                console.log(res.data.msg);
                router.push("/");
            })
            .catch( err => {
                console.log("Error :",err);
                setmsg(err.response.data.msg);
            })
        }
        else{
            setmsg("Password dosen't match or fields are empty")
        }
    }


    return(
        <div className="pt-5 d-flex flex-row-reverse .justify-content-between">
            <div className="login_left w-50">
                <img src="/cloud-create.png" className="img-fluid" alt="cloud image" />
            </div>
            <div className="login_right w-50 d-flex justify-content-center align-items-center">
                <div className='border border-dark p-5 d-flex flex-column gap-4 position-relative rounded'>
                    <div className='position-absolute ' style={{top: '-8%'}}>
                        <FaUserCircle color={'#262f3d'} size={'70'}/>
                    </div>
                    <div className='text-danger'>{msg}</div>

                    <div className="input-group input-group-lg ">
                        <span className="input-group-text" id="inputGroup-sizing-lg"><AiOutlineUser size={'25'}/></span>
                        <input 
                            type="text" 
                            placeholder='Enter Your Name'
                            className="form-control" 
                            onChange={handleName}
                        />
                    </div>

                    <div className="input-group input-group-lg ">
                        <span className="input-group-text" id="inputGroup-sizing-lg"><MdOutlineAlternateEmail size={'25'}/></span>
                        <input 
                            type="email" 
                            placeholder='Email'
                            className="form-control" 
                            onChange={handleEmail}
                        />
                    </div>

                    <div className="input-group input-group-lg">
                        <span className="input-group-text" id="inputGroup-sizing-lg"><RiLockPasswordLine size={'25'}/></span>
                        <input 
                            type="password" 
                            placeholder='Password'
                            className="form-control"
                            onChange={handlePassword}
                        />
                    </div>

                    <div className="input-group input-group-lg">
                        <span className="input-group-text" id="inputGroup-sizing-lg"><RiLockPasswordLine size={'25'}/></span>
                        <input 
                            type="text" 
                            placeholder='Re-enter password'
                            className="form-control"
                            onChange={handleRePassword}
                        />
                    </div>

                    <button 
                        type="button" 
                        className="btn btn-outline-dark"
                        onClick={authenticate}
                    >
                        SignUp
                    </button>
                    <Link href={'/'}><div className="align-self-start btn btn-link link-offset-2 link-underline link-underline-opacity-0" role="button" >Login</div></Link>
                </div>
            </div>
        </div>
    );
}

export default Create;