import { useRouter } from 'next/router';
import styles from '../styles/sidebar.module.css'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';


interface ServiceData {
    sid: number,
    name: string,
    desc: string
}

const Sidebar:React.FC = () => {

    const route = useRouter();

    const [data,setdata] = useState<Array<ServiceData>>([
        {
            "sid": 1,
            "name": "Compute Service",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "sid": 2,
            "name": "Networking",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "sid": 3,
            "name": "Storage Service",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "sid": 4,
            "name": "Big Data",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "sid": 5,
            "name": "Security and Identity Managment",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "sid": 6,
            "name": "Operation Tools",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
    ]);

    useEffect(() => {
        const getData = async() => {
            await axios.get("http://localhost:5000/services/all")
            .then( res => {
                console.log("Sidebar : ",res.data);
                setdata(res.data.msg);
            })
            .catch( err => {
                console.log(err);
            })
        }
        if(route.asPath === '/dashboard') getData();
    },[])

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
                                <div className="fs-5 mt-2 p-3 text-light fw-bolder w-100 text-capitalize">
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