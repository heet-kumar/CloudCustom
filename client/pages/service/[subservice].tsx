import { useRouter } from "next/router";
import style from '../../styles/service.module.css'
import { useEffect, useState } from "react";
import { HiChip } from 'react-icons/hi'
import { MdCreate } from "react-icons/md";
import Multiselect from "multiselect-react-dropdown";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";


const SubService = () => {

    const route = useRouter();
    const root = route.query;
    // console.log("Root : ",root.service);

    const [subServiceData,setSubServiceData] = useState(
        {
            "name": "Pub/Sub",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        }
    )

    

    const [resourceName,setResourceName] = useState<string>("");
    const [field,setfield] = useState<Array<string>>([]);
    
    const [resource,setResource] = useState<Array<{name: string, fields: string[]}>>([
        {
            name: "Kubernate Engine 1",
            fields : ["Name","Region","Machine Family","CPUs","Memory","Boot Disk Size","OS","Allow traffic"]
        },
        {
            name: "Kubernate Engine 2",
            fields : ["Name","Region","Machine Family","CPUs","Memory","Boot Disk Size","OS","Allow traffic"]
        },
    ])


    return(
        <div className={style.service}>

            {/* Modal */}

            <button 
                type="button" 
                className="fw-bolder fs-5 btn btn-primary align-self-end mx-5 my-3" 
                data-bs-toggle="modal" 
                data-bs-target="#SubServiceModal"
            >
                <MdCreate /> Create
            </button>

            <div className="modal fade" id="SubServiceModal" aria-hidden="true">
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
                                // onChange={handleServiceName}
                                placeholder="Enter Service Name" 
                            />
                            <label htmlFor="floatingService">Service Name</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            // onClick={handleCreate}
                            data-bs-dismiss="modal"
                        >
                            Save
                        </button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Basic container */}

            <div className={style.service_container}>
                <div className="shadow card w-100 mb-3">
                    <div className="card-body">
                        <h3 className="text-capitalize text-light-emphasis card-title fs-1 fw-bolder mb-3">{root.subservice}</h3>
                        <p className="card-text fs-5 fw-500">{subServiceData?.desc}</p>
                    </div>
                </div>

                <div className="w-100 p-4 mt-4 shadow rounded border">
                    {
                        resource.map( (p) => {
                            return(
                                <div key={p.name} className="shadow card w-100 mb-4 ">
                                    <Link href={`/service/${p.name.toLowerCase()}`} className="text-decoration-none text-black">
                                        <div className="card-body d-flex">
                                            <div className="d-flex align-items-center"><HiChip color={'#dc3545'} size={'50'}/></div>
                                            <div className="card-body">
                                                <h5 className="card-title fs-3 mx-4 text-capatalize">{p.name}</h5>
                                                <ul className="d-flex flex-wrap">
                                                    {
                                                        p.fields.map( d => {
                                                            return(
                                                                <li key={d} className="mx-4">{d}</li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="card-footer d-flex justify-content-end">
                                            <button className='btn' onClick={() => editcard(p.name)}><FaEdit size={'20'} /></button>
                                            <button className='btn' onClick={() => deleteCard(p.name)}><AiFillDelete size={'25'} /></button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default SubService;
