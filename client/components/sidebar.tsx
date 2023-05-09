import { useRouter } from 'next/router';
import styles from '../styles/sidebar.module.css'
import { useState } from 'react';
import Link from 'next/link';


interface ServiceData {
    name: string,
    desc: string
}

const Sidebar:React.FC = () => {

    // const router = useRouter;

    const [data,setdata] = useState<Array<ServiceData>>([
        {
            "name": "Compute Service",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "name": "Networking",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "name": "Storage Service",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "name": "Big Data",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "name": "Security and Identity Managment",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "name": "Operation Tools",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
    ]);



    return(
        <div className={styles.sidebar}>
            <div className={styles.sidebar_container} >
                <Link className='w-100 text-decoration-none' href='/dashboard'>
                    <div className="fs-5 mt-2 p-3 text-light fw-bolder bg-danger w-100">
                        Home
                    </div>
                </Link>
                {
                    data.map( (p:ServiceData) => {
                        return (
                            <Link key={p.name} className='w-100 text-decoration-none' href={`/dashboard/${p.name.toLowerCase()}`}>
                                <div className="fs-5 mt-2 p-3 text-light fw-bolder w-100">
                                    {p.name}
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Sidebar;