import { useRouter } from "next/router";


const Header:React.FC = () => {

    const router = useRouter();

    return(
        <div className="d-flex justify-content-between w-100 p-3 position-fixed shadow-lg" style={{backgroundColor: '#262f3d', zIndex: '12'}}>
            <div className="fw-bolder text-light fs-2">
                HashedIn
                <span className="text-danger" style={{fontSize: '115%'}}>Cloud</span>
            </div>
            {
                (router.asPath !== '/' && router.asPath !== '/signup')?
                    <div className="align-self-center">
                        <button 
                            type="button" 
                            className="btn btn-outline-danger"
                            onClick={() => {
                                localStorage.setItem('Access','false');
                                router.push("/");
                            }}
                        >
                            Logout
                        </button>
                    </div>:<></>
            }
        </div>
    );
}

export default Header;