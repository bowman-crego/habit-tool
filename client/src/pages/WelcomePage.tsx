// import CreateProfile from "./CreateProfile";
import { useNavigate } from "react-router-dom";
const WelcomePage = () => {

    const navigate = useNavigate();

return (
    <div className="bg-black h-screen flex flex-col justify-center items-center text-primary">
        <div className="text-white text-center text-6xl font-bold">
            <div className="">Welcome</div>
            <div className="">Creatures</div>
            <div className="">Of</div>
            <div className="">Habit</div>
        </div>
        <div className="flex flex-col justify-items-stretch mt-4">
            <button onClick={() => navigate("/create-profile")}className="bg-teal-500 hover:bg-teal-300 rounded-full font-bold text-black mt-8 py-4 px-8 ">Create Profile</button>
            <button onClick={() => navigate("/login-page")}className="bg-teal-500 hover:bg-teal-300 rounded-full font-bold text-black mt-8 py-4 px-8">Login</button>
        </div>
    </div>
)

};

export default WelcomePage;