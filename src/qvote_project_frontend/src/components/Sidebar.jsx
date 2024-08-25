
import { useContext } from 'react'; // global state test
import { userContext } from '../layout/Root'; // global state test

function Sidebar() {
    const { currentUser, setCurrentUser } = useContext(userContext); // global state test

    return (
        <div className="absolute
        left-0
        top-24
        rounded-r-2xl
        w-[15%]
        h-96
        bg-custom-green">
            <h2 className="text-xl text-center
            font-medium
            text-custom-lightgreen
            px-6 py-2">{currentUser !== null ? currentUser : 'Recent Trends'
            /* global state test */}</h2>
            <hr className="w-[90%]
            border-2
            border-custom-green-searchbar-highlighted
            rounded-sm
            mx-1 my-[1px]
            p-0" />
        </div>
    )
};

export default Sidebar