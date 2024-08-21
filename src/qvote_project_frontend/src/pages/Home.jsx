
import Sidebar from '../components/Sidebar.jsx';

function Home() {
    return (
        <>
            <div className="flex justify-center items-center">
                <Sidebar />
                <div className="bg-custom-darkgreen
                min-w-[70%] max-w-fit
                min-h-96
                ml-auto mr-[8%] my-12
                rounded-3xl">
                    <div className="bg-custom-green
                    rounded-t-3xl
                    px-[3%] py-[2%]
                    text-custom-lightgreen text-xl
                    font-normal">
                        Communities
                    </div>
                    <div className="">
                                            
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;