import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../Layout/Layout";
import { deleteCourseLecture, getCourseLectures } from '../../Redux/Slices/LectureSlice';

function Displaylectures() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation(); // Isse humlog "CourseDiscription.jsx" ke jis course par click kiya tha us course_course_ke_lecture_ksara_sara_data_ko_is_page_me_access_kar_payenge.
    const {lectures} = useSelector((state) => state.lecture);
    const {role} = useSelector((state) => state.auth);

    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
        console.log(courseId, lectureId);
        await dispatch(deleteCourseLecture({courseId: courseId, lectureId: lectureId}));
        await dispatch(getCourseLectures(courseId));
    }

    useEffect(() => {
        console.log(state);
        if(!state) navigate("/courses");
        dispatch(getCourseLectures(state._id));
    }, []);

    return (
        <Layout>
            <div className="flex flex-col gap-10 items-center justify-center h-[90vh] py-10 text-wihte mx-[5%]">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name: {state?.title}
                </div>

                {(lectures && lectures.length > 0 ) ?  
                    (<div className="flex justify-center gap-10 w-full h-[70vh] ">

                    {/* (1). left section for playing videos and displaying course details to admin */}
                   <div data-theme="night" className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video 
                            src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"   
                            controls
                            disablePictureInPicture
                            muted
                            controlsList="nodownload"
                        >
                        </video>    
                        <div>
                            <h1>
                                <span className="text-yellow-500 font-bold text-3xl"> Title: {" "}
                                </span>
                                <span className="font-semibold text-2xl" >
                                {lectures && lectures[currentVideo]?.title}
                                </span>
                            </h1>
                            <p className="mt-[20px]">
                                <span className="text-yellow-500 font-bold text-2xl line-clamp-4">
                                    Description: {" "}
                                </span>
                                <span className="font-semibold" >
                                {lectures && lectures[currentVideo]?.description}
                                </span>
                            </p>
                        </div>
                   </div>

                   {/* (2). right section for displaying list of lectres */}
                   {/*  */}
                   <ul data-theme="sunset" className="w-[28rem] overflow-y-scroll p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                            <p>Lectures list</p>
                            {role === "ADMIN" && (
                                <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className="btn btn-outline btn-primary btn-sm">
                                    Add new lecture
                                </button>
                            )}
                        </li> 
                        {lectures && 
                            lectures.map((lecture, idx) => {
                                return (
                                    <li className="space-y-2" key={lecture._id} >
                                        <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                            <span className= "text-2xl font-black " >
                                                {" "} Lecture {idx + 1} : {" "}
                                            </span>
                                            <span className="font-semibold" >
                                            {lecture?.title}
                                            </span>
                                        </p>
                                        {role === "ADMIN" && (
                                            <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className="btn btn-xs glass">
                                                Delete lecture
                                            </button>
                                        )}
                                    </li>
                                )
                            })    
                        }
                   </ul>
                </div>) : (
                    role === "ADMIN" && (
                        <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className="btn btn-sm font-semibold text-sm text-white ">
                            Add new lecture
                        </button>
                    )
                )}
            </div>
        </Layout>
    );
}

export default Displaylectures;