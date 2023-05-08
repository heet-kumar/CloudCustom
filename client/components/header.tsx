

const Header:React.FC = () => {
    return(
        <div className="fw-bolder w-100 p-3 fs-2 text-light position-fixed" style={{backgroundColor: '#262f3d'}}>
            HashedIn
            <span className="text-danger" style={{fontSize: '115%'}}>Cloud</span>
        </div>
    );
}

export default Header;