import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface ServiceData {
    sid: number,
    name: string,
    desc: string
}

const Header:React.FC = () => {

    const router = useRouter();

    const [data,setdata] = useState<Array<ServiceData>>([]);
    const [searchText,setSearchText] = useState<string>();

    useEffect( () => {

        const getData = async() => {
            await axios.get("http://localhost:5000/services/all")
            .then( res => {
                console.log(res.data.msg)
                setdata(res.data.msg);
            })
            .catch( err => {
                console.log(err);
            })
        }
        if(router.asPath === '/dashboard') getData();

    },[])


    return(
        <div className="d-flex justify-content-between w-100 p-3 position-fixed shadow-lg" style={{backgroundColor: '#262f3d', zIndex: '12'}}>
            <div className="fw-bolder text-light fs-2">
                HashedIn
                <span className="text-danger" style={{fontSize: '115%'}}>Cloud</span>
            </div>
            {
                (router.asPath !== '/' && router.asPath !== '/signup')?

                <div className="d-flex justify-content-between w-50">
                    <Autocomplete
                        id="free-solo-demo"
                        style={{width:'70%'}}
                        sx={{
                            "& input": {
                                color: 'black',
                                backgroundColor: '#fff'
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'white',
                                  color: 'black'
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            }
                        }}
                        freeSolo
                        options={data.map((option) => option.name)}
                        onChange={(e,v) => {
                            if(v==null) setSearchText("");
                            else setSearchText(v);
                        }}
                        renderInput={(params) => <TextField {...params} label="freeSolo" />}
                    />
                    <div className="align-self-center">
                        <button 
                            type="button" 
                            className="btn btn-outline-danger"
                            onClick={() => {
                                localStorage.setItem('Access','false');
                                router.push("/");
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>:<></>
            }
        </div>
    );
}

export default Header;