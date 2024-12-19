import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layout/Layout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList() {
    const dispatch = useDispatch();

    const { courseData, loading, error } = useSelector((state) => state.course);

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <Layout>
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold mb-5">
                    Explore the courses made by {" "}
                    <span className="font-bold text-yellow-500">
                        Industry experts
                    </span>
                </h1>

                <div>
                    {/* Conditional Rendering Based on courseData and loading state */}
                    {loading ? (
                        <h1
                        className="text-center text-3xl font-semibold mb-5"
                        >
                            Loading courses...
                        </h1>
                    ) : error ? (
                        <h1
                        className="text-center text-3xl font-semibold mb-5"
                        >
                            Error! , Please login To view courses.
                        </h1>
                    ) : courseData && courseData.length > 0 ? (
                        <div className="mb-10 flex flex-wrap gap-14">
                            {courseData.map((element) => {
                                return <CourseCard key={element._id} data={element} />;
                            })}
                        </div>
                    ) : (
                        <h2>No courses available. Please login to view courses.</h2>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default CourseList;
