
import { useState } from 'react';
import styles from '../../styles/dashboard.module.css' 
import { FcServices } from 'react-icons/fc'
import { MdCreate } from 'react-icons/md'


interface ServiceData {
    name: string,
    desc: string
}

const Dashboard = () => {

    const [service,setservice] = useState<string>("");
    const [desc,setdesc] = useState<string>("");

    const handleService = (e:React.ChangeEvent<HTMLInputElement>) => {
        setservice(e.currentTarget.value);
    }

    const handleDesc = (e:React.ChangeEvent<HTMLInputElement>) => {
        setdesc(e.currentTarget.value);
    }
    

    const [data,setdata] = useState<Array<ServiceData>>([
        {
            "name": "Compute Services",
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
    ])

    const handleCreate = () => {
        setdata([...data,{
            name: service,
            desc: desc
        }])
    }

    return(
        <div className={styles.dashboard }>
            <button 
                type="button" 
                className="fw-bolder fs-5 btn btn-primary align-self-end m-4" 
                data-bs-toggle="modal" 
                data-bs-target="#ServiceModal"
                onClick={() => {
                    setservice("");
                    setdesc("")
                }}
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

            <div className={styles.dashboard_container}>
                {
                    data.map((p:ServiceData) => {
                        return(
                            <div key={p.name} className={styles.card}>
                                <div className="card-body rounded shadow-lg p-4 d-flex flex-column align-items-center text-center">
                                    <div className={styles.logo}><FcServices size={'80'}/></div>
                                    <h5 className="card-title fs-3 mt-4">{p.name}</h5>
                                    <p className="fw-500 mt-3">{p.desc}</p>
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