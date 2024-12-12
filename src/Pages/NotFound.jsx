import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        // bg-[#1A2238]
        <div data-theme="halloween" className="h-screen w-full flex flex-col justify-center items-center ">

            {/* (1). 404-text */}
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                404
            </h1>

            {/* (2). Page not found ... */}
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
                Page not found ...
            </div>

            {/* (3). Go-Back => Button */}
            <button className="mt-5">
                <a className="relative inline-block text-sm font-medium text-[#ffffff] group active:text-yellow-500 focus:outline-none focus:ring">
                    <span onClick={() => navigate(-1)} className="relative block px-8 py-3 bg-[#1A2238] border-2 border-current border-white  rounded-3xl font-black hover:border-slate-500 ">
                        Go Back
                    </span>
                </a>
            </button>

        </div>
    );
}

export default NotFound;