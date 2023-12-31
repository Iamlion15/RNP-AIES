import { useState, useEffect } from "react"
import axios from "axios"
import formatDateToCustomFormat from "@/helpers/dateFormatter"
import ChatComponent from "@/components/messageComponent.js/chatComponent"
const Messages = () => {
    const [data, setData] = useState([])
    const [loggedInUserId, setLoggedInUserId] = useState('')
    const [isClicked, setIsClicked] = useState(false)
    const [activeItem, setActiveItem] = useState('');
    const [hoveredItem, setHoveredItem] = useState('')
    const [messageData, setMessageData] = useState({
        receiver: "",
        names: "",
    })
    const [message, setMessage] = useState({
        content: "",
        receiver: data.receiver,
    })
    const ViewMessage = (messageInfo) => {
        let receiver_id;
        setActiveItem(messageInfo._id)
        let user_names;

        for (let i = 0; i < messageInfo.participants.length; i++) {
            if (messageInfo.participants[i]._id !== loggedInUserId) {
                receiver_id = messageInfo.participants[i]._id;
                user_names = messageInfo.participants[i].firstname + " " + messageInfo.participants[i].lastname
            }
        }
        setMessageData({
            receiver: receiver_id,
            names: user_names
        })

    }
    const handleHoveredItem = (item) => {
        setHoveredItem(item)
    }
    useEffect(async () => {
        setLoggedInUserId(JSON.parse(localStorage.getItem('loggedInUser'))._id);
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get("http://localhost:8000/api/message/getmessages", config)
            console.log(response.data);
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }, [message])
    return (
        <>
            <div className="d-flex flex-row mx-4">
                <button className="btn btn-outline-light border-black mx-2  mb-3">
                    <i className="bi bi-envelope-open-fill mx-2" style={{ color: "black" }}></i><span className="text-black">Inbox</span>
                </button>
                <button className="btn btn-outline-light border-black mx-2 mb-3">
                    <i className="bi bi-envelope-paper-fill mx-3" style={{ color: "black" }}></i><span className="text-black">All messages</span>
                </button>
            </div>
            <div className="border-1 rounded-3 shadow mx-4 font-monospace" style={{ backgroundColor: "#FFFFFF" }}>
                <div className="m-0 p-0  font-monospace rounded-3 d-flex justify-content-center" style={{backgroundColor:"#4c97ff"}}>
                    <p style={{ fontSize: "1.5em"}} className="text-white"><strong>Messages</strong></p>
                </div>
                <div className="row no-gutters" style={{ height: "70vh" }}>
                    <div className="col-4" style={{ borderRight: "1px solid black", backgroundColor: "#f6f8fb",marginLeft:"20px" }}>
                        <div className="border-bottom">
                            <p style={{ fontSize: "1.5em" }}><strong>chats</strong></p>
                        </div>
                        <div>
                            <ul className="mt-2" style={{ listStyle: 'none', padding: 0 }}>
                                {data.map((convo, index) => {
                                    return (
                                        <li key={convo._id} className={`${!convo.message[convo.message.length - 1].Read.isRead && convo.message[convo.message.length - 1].sender._id !== loggedInUserId ? 'shadow' : ''}`} onClick={() => ViewMessage(convo)}
                                            style={{
                                                backgroundColor: activeItem === convo._id ? '#4c97ff' : '', color: activeItem === convo._id ? 'white' : '',
                                                border: activeItem === convo._id ? '0.5px solid #4c97ff' : '',
                                                borderRadius: activeItem === convo._id ? '20px' : ''
                                            }}>
                                            <div className="d-flex flex-row" style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                                                <div className="row">
                                                    <div className="col" style={{ width: "200px" }}>
                                                        <div className="d-flex flex-column">
                                                            <div className="d-flex flex-row" style={{ whiteSpace: 'nowrap', marginLeft: "20px" }}>
                                                                {convo.participants.map((participant) => (
                                                                    participant._id !== loggedInUserId && (
                                                                        <span key={participant._id}>
                                                                            <strong>{participant.firstname} {participant.lastname}</strong>
                                                                        </span>
                                                                    )
                                                                ))}
                                                            </div>
                                                            <div className="d-flex justify-content-start" style={{ overflow: 'hidden', maxWidth: '200px', marginLeft: "20px" }}>
                                                                <p className="text-muted" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontSize: '0.9em' }}>
                                                                    {convo.message[convo.message.length - 1].content}
                                                                </p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="d-flex justify-content-end" style={{ marginLeft: "30px" }}>
                                                            <p className="text-text-dark-emphasis"><small>{formatDateToCustomFormat(convo.message[convo.message.length - 1].createdAt)}</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>


                        </div>
                    </div>
                    <div className="col-7">
                        <div className="m-2">
                            {!isClicked ? (<>
                                <ChatComponent
                                    data={messageData}
                                    message={message}
                                    setMessage={setMessage}
                                />
                            </>
                            ) : <p>hello</p>}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messages