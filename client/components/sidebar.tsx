import { useRouter } from 'next/router';
import styles from '../styles/sidebar.module.css'

const Sidebar = () => {

    const router = useRouter

    return(
        <div className={styles.sidebar}>
            <div className={styles.sidebar_container} >
                <div className="fs-5 mt-2 p-3 text-light fw-bolder bg-danger w-100">
                    Home
                </div>
                <div className="fs-5 mt-3 p-3 text-light fw-bolder w-100">
                    Compute Service
                </div>
                <div className="fs-5 mt-3 p-3 text-light fw-bolder w-100">
                    Networking
                </div>
                <div className="fs-5 mt-3 p-3 text-light fw-bolder w-100">
                    Storage Service
                </div>
                <div className="fs-5 mt-3 p-3 text-light fw-bolder w-100">
                    Big-Data
                </div>
            </div>
        </div>
    );
}

export default Sidebar;