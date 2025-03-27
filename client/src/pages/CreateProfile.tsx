const CreateProfile = () =>{



return(
    <div className="bg-black h-screen flex flex-col justify-center items-center text-primary">
        <div className="text-white text-center text-6xl font-bold">
            
        </div>
        <div>
            <button onClick={() => navigate("/create-profile")}className="bg-teal-500 hover:bg-teal-300 rounded-xl font-bold text-black mt-8 py-4 px-8">Create Profile</button>
        </div>
    </div>
);

};

export default CreateProfile;