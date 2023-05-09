import { useRouter } from "next/router";
import style from '../../styles/service.module.css'
import { useState } from "react";


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
    
    const [subServices,setSubServices] = useState([])

    return(
        <div className={style.service}>
            <div className={style.service_container}>
                <div className="shadow card w-100 mb-3">
                    <div className="card-body">
                        <h3 className="text-light-emphasis card-title fs-1 fw-bolder mb-3">{serviceData.name}</h3>
                        <p className="card-text fs-5 fw-500">{serviceData.desc}</p>
                    </div>
                </div>

                {
                    subServices.map( p => {
                        return(
                            <div className="shadow card w-100 mb-3">
                                <div className="card-body">
                                    <img src="..." className="img-fluid rounded-start" alt="..."/>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Service;
