import { hoardingBackend } from 'Admin/hoardingBackend';
import { invoiceBackend } from 'Admin/invoiceBackend';
import AddInvoice from 'components/Modal/AddInvoice';
import Navbar from 'components/Navbar';
import React, { useCallback, useEffect, useState } from 'react';

const Invoice = (props) => {

    const [state, setState] = useState({
        clients:[],
        stopLoading:false,
    });

    const blankUpload = {
        files:[],
        cid:"",
        aid:window.localStorage.getItem("uid"),
        status:false,
        success:false,
        addInvoice:false,
        addLedger:false
    }

    const [upload,setUpload] = useState({
        ...blankUpload
    })
    
    const getAll = useCallback(async () => {
        try {
            const clients = await hoardingBackend.getClientsList();
            setState(state=>({
                ...state,
                clients: [...clients.data],
                status:false,
                stopLoading:true
            }))
        } catch (error) {
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        getAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[
        getAll
    ])

    const close = () => {
        setUpload({...blankUpload})
    }

    const uploadInvoice = async () => {
        if(upload.files.length < 1 || !upload.cid){
            return setUpload({...upload,status:"Something is missing!"})
        }
        try {
            const formData = new FormData();
            formData.set('aid',upload.aid);
            formData.set('cid',upload.cid);
            for (let index = 0; index < upload.files.length; index++) {
                const element = upload.files[index];
                formData.append("files",element);
            }
            formData.set('aid',upload.aid);
            await invoiceBackend.addInvoice(formData);
            setUpload({...upload,success:true});

        } catch (error) {
            console.log(error);
        }
    }

    const uploadLedger = async () => {
        try {
            if(upload.files.length < 1 || !upload.cid){
                return setUpload({...upload,status:"Something is missing!"})
            }
            try {
                const formData = new FormData();
                formData.set('aid',upload.aid);
                formData.set('cid',upload.cid);
                for (let index = 0; index < upload.files.length; index++) {
                    const element = upload.files[index];
                    formData.append("files",element);
                }
                formData.set('aid',upload.aid);
                await invoiceBackend.addLedger(formData);
                setUpload({...upload,success:true});
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            
        }
    }
    

    return state.stopLoading && ( <>
        <Navbar />
        <div className="jumbotron">
            <div className="row px-3 d-flex">
                <div class="form-group">
                    <label for="exampleInputEmail1 ">Search</label>
                    <br></br>
                    <button className="btn btn-primary" onClick={()=>{
                        setUpload((prev)=>({...prev,addInvoice:true}))
                    }}>
                        + Invoice
                    </button>
                    <button className="btn btn-primary ml-3"onClick={()=>{
                        setUpload((prev)=>({...prev,addLedger:true}))
                    }}>
                        + Ledger
                    </button>
                </div>
            </div>
            <AddInvoice isVisible={upload.addInvoice} submit={uploadInvoice} close={close} state={upload} setState={setUpload} clients={state.clients} name={"Add Invoice"}/>
            <AddInvoice isVisible={upload.addLedger} submit={uploadLedger} close={close} state={upload} setState={setUpload} clients={state.clients} name={"Add Ledger"}/>

        </div>
        </>
     );
}
 
export default Invoice;