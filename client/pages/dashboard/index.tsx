
import { useEffect, useState } from 'react';
import styles from '../../styles/dashboard.module.css' 
import { FcServices } from 'react-icons/fc'
import { MdCreate } from 'react-icons/md'
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';


interface ServiceData {
    sid: number,
    name: string,
    desc: string
}

const Dashboard = () => {

    const [service,setservice] = useState<string>("");
    const [desc,setdesc] = useState<string>("");
    const [state,setState] = useState<string>("");

    const handleService = (e:React.ChangeEvent<HTMLInputElement>) => {
        setservice(e.currentTarget.value);
    }

    const handleDesc = (e:React.ChangeEvent<HTMLInputElement>) => {
        setdesc(e.currentTarget.value);
    }
    

    const [data,setdata] = useState<Array<ServiceData>>([
        {
            "sid": 20,
            "name": "Compute Services",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {  
            "sid": 19,
            "name": "Networking",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "sid": 18,
            "name": "Storage Service",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "sid": 17,
            "name": "Big Data",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "sid": 16,
            "name": "Security and Identity Managment",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "sid": 15,
            "name": "Operation Tools",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
    ])

    useEffect( () => {
        const getData = async() => {
            const result = await axios.get("http://localhost:5000/services/all");
            console.log(result.data.msg)
            setdata(result.data.msg)
        }
        getData();
    },[state])

    const handleCreate = async () => {
        const result = await axios.post("http://localhost:5000/services/create",{name:service,desc:desc})
        console.log(result)
        setState(result.data.msg);
        
        // setdata([...data,{
        //     sid: 14,
        //     name: service,
        //     desc: desc
        // }])
    }

    const deleteCard = (cname:string) => {
        const newdata = data.filter( p => p.name !== cname);
        setdata(newdata);
    }

    const editcard = (cname:string) => {

    }

    return(
        <div className={styles.dashboard }>

            {/* Modal Code */}

            <button 
                type="button" 
                className="fw-bolder fs-5 btn btn-primary align-self-end mx-5 my-3" 
                data-bs-toggle="modal" 
                data-bs-target="#ServiceModal"
            >
                <MdCreate /> Create
            </button>

            <div className="modal fade" id="ServiceModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Create New Service</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="floatingService" 
                                onChange={handleService}
                                placeholder="Enter Service Name" 
                            />
                            <label htmlFor="floatingService">Service Name</label>
                        </div>
                        <div className="form-floating">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="floatingDesc" 
                                onChange={handleDesc}
                                placeholder="Short Description" 
                            />
                            <label htmlFor="floatingDesc">Short Description</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={handleCreate}
                            data-bs-dismiss="modal"
                        >
                            Save
                        </button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Basic container */}

            <div className={styles.dashboard_container}>
                {
                    data.map((p:ServiceData) => {
                        return(
                            <div key={p.name} className={styles.card}>
                                <div className='card'>
                                    <div className="card-header d-flex justify-content-between">
                                        <button className='btn' onClick={() => editcard(p.name)}><FaEdit size={'20'} /></button>
                                        <button className='btn' onClick={() => deleteCard(p.name)}><AiFillDelete size={'25'} /></button>
                                    </div>
                                    <Link href={`/dashboard/${p.name.toLowerCase()}`} className='text-decoration-none text-black'>
                                        <div className="card-body rounded shadow-lg p-4 d-flex flex-column align-items-center text-center">
                                            <div className={styles.logo}><FcServices size={'80'}/></div>
                                            <h5 className="card-title fs-3 mt-4">{p.name}</h5>
                                            <p className="fw-500 mt-3">{p.desc}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Dashboard;