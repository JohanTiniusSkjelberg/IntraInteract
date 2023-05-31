import Sidebar from "../components/sidebar";
import Chats from "../components/chats";

function Messenger() {
    
    return (

        <div className="flex grow h-screen">
            <Sidebar />
            <Chats />
        </div>        
    )
}

export default Messenger;