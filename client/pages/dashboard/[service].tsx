import { useRouter } from "next/router";
import style from '../../styles/service.module.css'
import { useState } from "react";
import { HiChip } from 'react-icons/hi'
import { MdCreate } from "react-icons/md";
import Multiselect from "multiselect-react-dropdown";


const Service = () => {

    const route = useRouter();
    const root = route.query;
    console.log("Root : ",root.service);

    const [serviceData,setServiceData] = useState(
        {
            "name": "Compute Service",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        }
    )

    const fieldList:string[] = [
        "Name",
        "Region",
        "Machine Family",
        "CPUs",
        "Boot Disk Size",
        "Boot Disk OS",
        "Allow Traffic",
        "Description",
        "Subnet Name",
        "Subnet Description",
        "Subnet Region",
        "Subnet IP Address Range",
        "Private or Public",
        "Firewall Rules Name",
        "Firewall Rules Type",
        "Firewall Rules Filter",
        "Firewall Rules Protocol Port",
        "Firewall Rules Action",
        "Bucket Name",
        "Encryption",
        "Storage Class",
        "Cluster Name",
        "Cluster Type",
        "Software Component",
        "Master Node Machine family",
        "Master Node CPUs",
        "Master Node Memory",
        "Master Node Disk Size",
        "Master Node Disk Type",
        "Worker Node Machine Family",
        "Worker Nodes Number",
        "Worker Node CPUs",
        "Worker Node Memory",
        "Worker Node Disk Size",
        "Worker Node Disk Type",
        "IAM Username",
        "IAM Accountname",
        "IAM Roles"
    ]

    const [serviceName,setServiceName] = useState<string>("");
    const [field,setfield] = useState<Array<string>>([]);
    
    const [subServices,setSubServices] = useState<Array<{name: string, fields: string[]}>>([
        {
            name: "Virtual Machine",
            fields : ["Name","Region","Machine Family","CPUs","Memory","Boot Disk Size","OS","Allow traffic"]
        },
        {
            name: "Kubernate Engine",
            fields : ["Name","Region","Machine Family","CPUs","Memory","Boot Disk Size","OS","Allow traffic"]
        },
    ])

    const handleServiceName = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setServiceName(e.currentTarget.value);
    }

    const handleCreate = () => {
        setSubServices([...subServices,{name: serviceName,fields: field}])
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
                                onChange={handleServiceName}
                                placeholder="Enter Service Name" 
                            />
                            <label htmlFor="floatingService">Service Name</label>
                        </div>
                        <Multiselect
                            isObject={false}
                            onKeyPressFn={function noRefCheck(){}}
                            onRemove={(e) => {setfield(e); console.log(e);}}
                            onSearch={function noRefCheck(){}}
                            onSelect={(e) => {setfield(e); console.log(e);}}
                            options={fieldList}
                        />
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
                        <h3 className="text-light-emphasis card-title fs-1 fw-bolder mb-3">{root.service}</h3>
                        <p className="card-text fs-5 fw-500">{serviceData.desc}</p>
                    </div>
                </div>

                <div className="w-100 p-4 mt-4 shadow rounded border">
                    {
                        subServices.map( (p) => {
                            return(
                                <div className="shadow card w-100 mb-4">
                                    <div className="card-body d-flex">
                                        <div className="d-flex align-items-center"><HiChip color={'#dc3545'} size={'50'}/></div>
                                        <div className="card-body">
                                            <h5 className="card-title fs-3 mx-4">{p.name}</h5>
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
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Service;
