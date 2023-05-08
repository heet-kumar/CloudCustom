import {FaUserCircle} from 'react-icons/fa';
import {RiLockPasswordFill, RiLockPasswordLine} from 'react-icons/ri'
import {MdOutlineAlternateEmail} from 'react-icons/md'


const Login: React.FC = () => {

    return(
        <div className="d-flex .justify-content-between">
            <div className="login_left w-10">
                <img src="/cloud-services.png" className="img-fluid" alt="cloud image" />
            </div>
            <div className="login_right w-50 d-flex justify-content-center align-items-center">
                <div className='border border-dark p-5 d-flex flex-column gap-4 position-relative rounded'>
                    <div className='position-absolute ' style={{top: '-12%'}}>
                        <FaUserCircle color={'#262f3d'} size={'70'}/>
                    </div>
                    <div className="input-group input-group-lg ">
                        <span className="input-group-text" id="inputGroup-sizing-lg"><MdOutlineAlternateEmail size={'25'}/></span>
                        <input 
                            type="email" 
                            placeholder='email'
                            className="form-control" 
                        />
                    </div>
                    <div className="input-group input-group-lg">
                        <span className="input-group-text" id="inputGroup-sizing-lg"><RiLockPasswordLine size={'25'}/></span>
                        <input 
                            type="password" 
                            placeholder='password'
                            className="form-control"
                        />
                    </div>
                    <button type="button" className="btn btn-outline-dark">Login</button>
                    <a className="btn btn-link link-offset-2 link-underline link-underline-opacity-0" role="button" >Create account</a>
                </div>
            </div>
        </div>
    );
}

export default Login;