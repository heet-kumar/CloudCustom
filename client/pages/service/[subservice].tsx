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


interface MyObj {
    [key: string]: string;
}

interface dataObj {
    name: string
}

interface resData {
    id: number,
    sid: number,
    ssid: number,
    name: string,
    params: string
}

const SubService:React.FC = () => {

    const route = useRouter();
    const root = route.query;
    console.log("Root : ",root.subservice);

    const [obj,setObj] = useState<Array<Object>>([]);
    const [state,setState] = useState<boolean>(true);

    const [subServiceData,setSubServiceData] = useState<{ssid: number, sid: number, name: string, desc: string, columns:string}>(
        {
            "ssid": 27,
            "sid": 32,
            "name": "Pub/Sub",
            "desc": "XYZ Ipsum is simply dummy text of the printing and typesetting industry.",
            "columns": '["Name","Region","Machine Family","CPUs","Memory","Boot Disk Size","Boot Disk OS","Allow traffic"]'
        }
    )

    useEffect(() => {
        const data = localStorage.getItem('Access');
        if(data!=='true') route.push("/")
    },[])

    useEffect(() => {
        console.log("route -> : ",root)
        const getData = async() => {
            await axios.post("http://localhost:5000/subservices/name",{name: root.subservice})
            .then( async(res) => {
                console.log("Testing : ",res);
                if(res.data.length!==0) setSubServiceData(res.data[0])
            })
            .catch( err => {
                console.log(err);
                alert(err.response.data.msg);
            })  
        }
        if(root.subservice!==undefined) getData();
    },[root.subservice])

    const myObj: MyObj = {};


    const [name,setName] = useState<string>("")
    const [text,setText] = useState<string>("");

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value);
    }

    const handlesave = (p:string) => {
        myObj[p] = text;
        console.log("Object : ",myObj)
        setObj([...obj,myObj])
    }

    const handleName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    }
    
    const [resource,setResource] = useState<Array<resData>>([
        {
            id: 2,
            sid: 5,
            ssid: 27,
            name: "Testing Object",
            params: '[{"Bucket Name":"asia-south-1"},{"Region":"asia-south-1"},{"Private or Public":"private"},{"Encryption":"ssh"},{"Storage Class":"Object type"},{"Bucket Name":"Object type"},{"Region":"Object type"},{"Private or Public":"Object type"},{"Bucket Name":"GCP-Bucket"},{"Bucket Name":"GCP-Bucket"},{"Region":"asia-south-2"},{"Private or Public":"private"},{"Encryption":"ssh"},{"Storage Class":"Object type"}]'
        },
    ])

    const handleCreate = async() => {
        console.log("Final Data : ",obj);
        await axios.post("http://localhost:5000/resources/create",{
            sid: subServiceData.sid,
            ssid: subServiceData.ssid,
            name,
            params: JSON.stringify(obj)
        })
        .then( res => {
            console.log(res.data.msg);
            setState(!state);
        })
        .catch( err => {
            console.log(err);
            alert(err.response.data.msg);
        })
    }

    useEffect( () => {
        
        const getData = async() => {
            await axios.get("http://localhost:5000/resources/all")
            .then( res => {
                console.log(res.data.msg);
                setResource(res.data.msg);
            })
            .catch( err => {
                console.log(err);
                alert(err.response.data.msg);
            })
        }
        getData();

    },[state])

    const editCard = (id:number) => {

    }

    const deleteCard = async(id:number) => {

        axios.post("http://localhost:5000/resources/delete",{id})
        .then( res => {
            console.log(res.data.msg);
            setState(!state);
        })
        .catch( err => {
            console.log(err);
            alert(err.response.data.msg);
        })
    }

    return(
        <div className={style.service}>

            {/* Modal */}

            <button 
                type="button" 
                className="fw-bolder fs-5 btn btn-primary align-self-end mx-5 my-3" 
                data-bs-toggle="modal" 
                data-bs-target="#SubServiceModal"
            >
                <MdCreate /> Create Resource
            </button>

            <div className="modal fade" id="SubServiceModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-capitalize" id="exampleModalLabel">{subServiceData.name}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="floatingService" 
                                    onChange={handleName}
                                />
                                <label htmlFor="floatingService">Name</label>
                            </div>
                        {
                            JSON.parse(subServiceData.columns).map( (p:string) => {
                                return(
                                    <div key={p} className="d-flex align-items-center justify-content-between">
                                        <div className="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="floatingService" 
                                                onChange={handleInput}
                                            />
                                            <label htmlFor="floatingService">{p}</label>
                                        </div>
                                        <div >
                                            <button 
                                                className="btn btn-primary" 
                                                type="submit"
                                                onClick={() => handlesave(p)}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        }
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

            <div className={style.service_container}>
                <div className="shadow card w-100 mb-3">
                    <div className="card-body">
                        <h3 className="text-capitalize text-light-emphasis card-title fs-1 fw-bolder mb-3">{root.subservice}</h3>
                        <p className="card-text fs-5 fw-500">{subServiceData?.desc}</p>
                        <ul className="d-flex flex-wrap">
                        {
                            JSON.parse(subServiceData.columns).map( (d:string) => {
                                return(
                                    <li key={d} className="mx-4">{d}</li>
                                );
                            })
                        }
                        </ul>
                    </div>
                </div>

                <div className="w-100 p-4 mt-4 shadow rounded border"> 
                    {
                        resource.map((p,i) => {
                            if(p.ssid===subServiceData.ssid)
                            return(
                                <div key={p.id} className="shadow card w-100 mb-4">

                                    <div className="card-body d-flex">
                                        <div className="d-flex align-items-center"><HiChip color={'#dc3545'} size={'50'}/></div>
                                        <div className="card-body">
                                            <h5 className="card-title fs-3 mx-4 text-capitalize">{p.name}</h5>
                                            <ul className="d-flex flex-wrap gap-4">
                                            {
                                                JSON.parse(p.params).map( (obj:dataObj) => (
                                                    <li key={JSON.stringify(obj)} className="">
                                                        {
                                                            Object.entries(obj).map(([key,value]) => (
                                                                <div key={key}>{key}: {value}</div>
                                                            ))
                                                        }
                                                    </li>
                                                ))
                                            }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-end">
                                        <button 
                                            className='btn' 
                                            onClick={() => editCard(p.id)}
                                        >
                                            <FaEdit size={'20'} />
                                        </button>
                                        <button 
                                            className='btn' 
                                            onClick={() => deleteCard(p.id)}
                                        >
                                            <AiFillDelete size={'25'} />
                                        </button>
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


