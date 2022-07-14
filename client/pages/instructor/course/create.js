import React, { useState } from 'react'
import TopNav from '../../../components/TopNav'
import UserNav from '../../../components/nav/UserNav'
import Resizer from "react-image-file-resizer";
import { uploadImage } from '../../../requests/course';
import CreateCourse from '../../../components/forms/course/CreateCourse'
import { toast } from 'react-toastify';


const Create = () => {

    const [state, setState] = useState({
        name: "",
        loading: false,
        uploading: false,
        paid: true,
        description: "",
        price: "",
    })
    const [preview, setPriview] = useState("")
    const [uploadBtnText, setUploadBtnText] = useState("Upload Image")


    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleImage = async (e) => {
        let file = e.target.files[0]
        setPriview(window.URL.createObjectURL(file));
        setUploadBtnText(file.name)
        setState({ ...state, loading: true })
        try {
            Resizer.imageFileResizer(file, 300, 300, "JPEG", 100, 0, async (uri) => {
                const { data } = await uploadImage(uri)
                console.log(data);
                setState({ ...state, loading: true })
            })
        } catch (err) {
            setState({ ...state, loading: true })
            console.log(err);
            toast("Image uploaf failed! try later")
        }
    }






    return (
        <>

            <div className="container-fluid d-flex flex-row p-0">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className='col-md-10'>
                    <TopNav />
                    <h1 className='jumbotron bg-primary text-center pt-4 pb-4 grad'>Create Course</h1>
                    <div className="container-fluid ">
                        <h1>Course Details</h1>
                        <CreateCourse setState={setState} state={state} handleChange={handleChange} handleSubmit={handleSubmit} handleImage={handleImage} preview={preview} uploadBtnText={uploadBtnText} />

                    </div>
                </div>
            </div>

        </>

    )
}

export default Create