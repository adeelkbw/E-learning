import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import TopNav from '../../../components/TopNav'
import SingleCourseJumbo from '../../../components/singleCourse/SingleCourseJumbo'
import CourseModal from '../../../components/singleCourse/CourseModal'
import LessonsList from '../../../components/singleCourse/LessonsList'
import { Context } from '../../../context'



const Course = ({ course }) => {
    const [visible, setVisible] = useState(false)
    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false)
    const [enrolled, setEnrolled] = useState({})

    const { state } = useContext(Context)
    const { user } = state

    const [isSSR, setIsSSR] = useState(true)

    useEffect(() => {
        setIsSSR(false)
    }, [])

    useEffect(() => {
    }, [user, course])


    useEffect(() => {
        if (user && course) handelCheckEnrollment()
    }, [user && course])


    const handelCheckEnrollment = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/v1/course/checkEnrollment/${course._id}`)
            setEnrolled(data.status)
            console.log(data)
            setLoading(false)

        } catch (err) {
            setLoading(false)
            toast("Enrolled Failed!")
            console.log(err)
        }
    }

    const handleFreeEnrollment = async () => {
        setLoading(true)

        try {
            const { data } = await axios.post(`/api/v1/course/freeEnrollment/${course._id}`)
            setLoading(false)
            console.log(data.msg)
            toast(data.msg)
        } catch (err) {
            console.log(err)
            setLoading(false)

        }

    }
    const handlePaidEnrollment = async () => {

    }


    return (
        <>
            <TopNav />
            {!isSSR &&

                <>
                    <div className="pt-3 pb-3">
                        <SingleCourseJumbo course={course} preview={preview} setPreview={setPreview} visible={visible} setVisible={setVisible} user={user} handlePaidEnrollment={handlePaidEnrollment} handleFreeEnrollment={handleFreeEnrollment} loading={loading} enrolled={enrolled} />

                        <CourseModal visible={visible} setVisible={setVisible} course={course} preview={preview} />
                    </div>

                    <LessonsList course={course} preview={preview} setPreview={setPreview} visible={visible} setVisible={setVisible} />
                </>
            }
        </>
    )
}


export async function getServerSideProps({ params }) {

    const { data } = await axios.get(`${process.env.API}/course/view/${params.slug}`)
    return {
        props: {
            course: data.data
        }
    }
}

export default Course