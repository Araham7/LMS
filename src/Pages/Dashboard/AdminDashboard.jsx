import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";   // Importing Layout
import { Chart as ChartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";    // Importing Chart.js
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecords } from "../../Redux/Slices/RazorpaySlice";
import { Bar, Pie } from "react-chartjs-2";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

ChartJs.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);    // Registering ChartDataLabels

function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allUsersCount, subscribedUsersCount } = useSelector((state) => state.stats);     // getting "allUsersCount", "subscribedUsersCount" from "stat-slice".
    const { allPayments, finalMonths, monthlySalesRecord } = useSelector((state) => state.razorpay);    // getting "allPayments", "finalMonths", "monthlySalesRecord" from "razorpay-slice".

    /* We need to plot this data in a 'Pie-Chart'. */
    const userData = {
        labels: ["Registered Users", "Subscribed/Enrolled Users"],
        datasets: [
            {
                label: "User Detailes",
                fontColor: "white",
                data: [allUsersCount, subscribedUsersCount],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                borderWidth: 1,
                borderColor: ["yellow", "green"]
            },
        ],
    }

    /* We need to plot this data in a 'Bar-Chart'. */
    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor: "white",
        datasets: [
            {
                label: "Sales/Month",
                data: monthlySalesRecord,
                backgroundColor: ["blue"],
                borderColor: ["yellow"],
                borderWidth: 3,
            },
        ],
    }

    const myCourses = useSelector((state) => state?.course?.courseData);

    async function onCourseDelete(id) {
        if (window.confirm("Are you sure you want to delete the course ? ")) {
            const response = await dispatch(deleteCourse(id));
            console.log(response);
            if (response?.payload?.success) {
                await dispatch(getAllCourses());
            }
        }
    }

    // IIFE - Immediately Invoked Function Expression:
    useEffect(() => {
        (
            async () => {
                await dispatch(getAllCourses()); /* (Working Fine) Dispatching "getAllCourses" action. */
                await dispatch(getStatsData()); /* (Working Fine) Dispatching "getStatsData" action. */
                await dispatch(getPaymentRecords());   /* Dispatching "getPaymentRecords" action. */
            }
        )()
    }, [])

    return (
        <Layout >
            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white " >

                {/* Main-Heading */}
                <h1 className="text-3xl text-center font-bold text-yellow-500 " >
                    Admin Dashboard
                </h1>

                {/* (1) Chart */}
                <div className="grid grid-cols-2 gap-5 m-auto mx-10">

                    {/* Pie-Chart */}
                    <div data-theme="retro" className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">

                        {/* Pie-Chart */}
                        <div className="w-90 h-80">
                            <Pie data={userData} />
                        </div>

                        {/* card for user data */}
                        <div className="grid grid-cols-2 gap-5">
                            {/* card for registered users */}
                            <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Registered Users</p>
                                    <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                                </div>
                                <FaUsers className="text-yellow-500 text-5xl" />
                            </div>

                            {/* card for enrolled users */}
                            <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Subscribed Users</p>
                                    <h3 className="text-4xl font-bold">{subscribedUsersCount}</h3>
                                </div>
                                <FaUsers className="text-green-500 text-5xl" />
                            </div>
                        </div>
                    </div>

                    {/* Bar-Chart */}
                    <div data-theme="lemonade" className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">

                        {/* Bar-Chart */}
                        <div className="h-80 w-full relative">
                            <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
                        </div>

                        {/* card for sales data */}
                        <div className="grid grid-cols-2 gap-5">

                            {/* card for Subscription Count */}
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Subscription Count</p>
                                    <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                                </div>
                                <FcSalesPerformance className="text-yellow-500 text-5xl" />
                            </div>

                            {/* card for Total Revenue */}
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Total Revenue</p>
                                    <h3 className="text-4xl font-bold">{allPayments?.count * 499}</h3>
                                </div>
                                <GiMoneyStack className="text-green-500 text-5xl" />
                            </div>

                        </div>
                    </div>
                </div>

                {/* (2). Courses Overview */}
                <div data-theme="lemonade" className="w-[95vw] flex flex-col items-center justify-center gap-10 mb-10 mx-auto font-semibold border-[6px] border-yellow-400 rounded-3xl p-5 shadow-lg">

                    {/* Heading */}
                    <div className="w-full flex justify-around text-center">
                        <span className="text-center text-3xl font-semibold">
                            Courses Overview
                        </span>

                        <button
                            onClick={() => {
                                navigate("/courses/create");
                            }}
                            className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
                        >
                            Create new course
                        </button>
                    </div>

                    {/* Table */}
                    <table className="table overflow-x-scroll border border-yellow-500 border-collapse">

                        {/* Table Head */}
                        <thead>
                            <tr className="text-center text-2xl border border-yellow-500">
                                <th className="border border-yellow-500">Sl. No.</th>
                                <th className="border border-yellow-500">Course Title</th>
                                <th className="border border-yellow-500">Course Category</th>
                                <th className="border border-yellow-500">Instructor</th>
                                <th className="border border-yellow-500">Total Lectures</th>
                                <th className="border border-yellow-500">Description</th>
                                <th className="border border-yellow-500">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-center">
                            {myCourses?.map((course, idx) => {
                                return (
                                    <tr key={course._id} className="border border-yellow-500">
                                        <td className="border border-yellow-500">{idx + 1}</td> {/* SL Number */}
                                        <td className="border border-yellow-500"> {/* Course Title */}
                                            <textarea
                                                readOnly
                                                value={course?.title}
                                                className="w-30 h-auto bg-transparent resize-none p-4 text-center"
                                            ></textarea>
                                        </td>
                                        <td className="border border-yellow-500"> {/* Course Category */}
                                            {course?.category}
                                        </td>
                                        <td className="border border-yellow-500"> {/* Instructor */}
                                            {course?.createdBy}
                                        </td>
                                        <td className="border border-yellow-500"> {/* Total Lectures */}
                                            {course?.numberOfLectures}
                                        </td>
                                        <td className="border border-yellow-500"> {/* Description */}
                                            <textarea
                                                value={course?.description}
                                                readOnly
                                                className="p-4 w-30 h-auto bg-transparent resize-none"
                                            ></textarea>
                                        </td>
                                        <td> {/* Actions */}
                                            <div className="flex items-center justify-center gap-4 h-full" >
                                            <button
                                                className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                onClick={() =>
                                                    navigate("/course/displaylectures", {
                                                        state: { ...course },
                                                    })
                                                }
                                            >
                                                <BsCollectionPlayFill />
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                onClick={() => onCourseDelete(course?._id)}
                                            >
                                                <BsTrash />
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </Layout>
    )
}

export default AdminDashboard;