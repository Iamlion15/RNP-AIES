import { useState, useEffect, useRef } from "react";
import axios from "axios";
const ChatComponent = ({ data,message,setMessage }) => {
    const [activateConfrim, setActivateConfirm] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState('')
    const [isNew, setIsNew] = useState(true)
    const [chats, setChats] = useState();
    const tableRef = useRef(null);
    const handleInput = (e) => {
        const input = e.target.value
        setMessage({
            ...message, content: input, receiver: data.receiver
        })
        if (input !== "") {
            setActivateConfirm(true)
        }
        else {
            setActivateConfirm(false)
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:8000/api/message/send", message, config)
            setMessage({
                ...message, content: "",
            })
            fetchChatData();
        } catch (error) {
            console.log(error)
        }
    }
    const fetchChatData = async () => {
        console.log("receiver id", data.receiver);
        const msgInformation = {
            receiverId: data.receiver
        }
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:8000/api/message/getchat", msgInformation, config)
            setChats(response.data)
            if (response.data === "") {
                setIsNew(false)
            }
            if (response.data && response.data.chat && response.data.chat.messages.length > 0) {
                const userWhoLoggedIn = JSON.parse(localStorage.getItem('loggedInUser'))._id
                const lastMessage = response.data.chat.messages[response.data.chat.messages.length - 1];
                // Check if the last message is not marked as read
                if (!lastMessage.read.isRead && lastMessage.sender.userId !== userWhoLoggedIn) {
                    console.log("here");
                    const markReadConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': JSON.parse(localStorage.getItem('token')),
                        },
                    };
                    try {
                        // Mark the message as read
                        axios.put(`http://localhost:8000/api/message/markasread/${lastMessage.messageId}`, {}, markReadConfig);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        console.log("event heard from here", data);
        setLoggedInUserId(JSON.parse(localStorage.getItem('loggedInUser'))._id);
        fetchChatData()
    }, [data]);

    useEffect(() => {
        if (tableRef.current) {
            const table = tableRef.current; //accessing the table DOM
            const lastRows = table.querySelectorAll('tr:last-child'); //selecting the last element of a row in a table
            //if the last row is present scroll down to that view
            if (lastRows.length > 0) {
                lastRows[lastRows.length - 1].scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }
    })


    return (
        <div className="d-flex flex-column font-monospace" style={{ height: '100%' }}>
            <div className="border-bottom">
                <p style={{fontSize:"1.5em"}}><strong>{data.names}</strong></p>
            </div>
                    <div className="m-3">
                        {!isNew && (<span className="mb-2">This message will be sent to : <strong> {data.names}</strong> 's document,</span>)}
                        <div className="mt-2">
                            {isNew && chats && chats.chat && (
                                <div className="bg-light" style={{ maxHeight: '250px', overflowY: 'auto',scrollbarWidth: 'thin', msOverflowStyle: 'none' }} ref={tableRef}>
                                    <style>
    {`
      /* Hide scrollbar for Chrome, Safari, and Edge */
      ::-webkit-scrollbar {
        width: 0;
      }

      /* Optional: Style scrollbar track if you want to customize its appearance */
      ::-webkit-scrollbar-track {
        background: transparent;
      }
    `}
  </style>
                                    <table className="table table-borderless" style={{ tableLayout: 'fixed' }} >
                                        <tbody>
                                            {chats.chat.messages.map((chat, index) => (
                                                <tr key={index}>
                                                    {chat.sender.userId === loggedInUserId && (
                                                        <>
                                                            <td></td>
                                                            <td
                                                                style={{
                                                                    textAlign: 'left',
                                                                    width: '50%', // Set your desired max width
                                                                    whiteSpace: 'pre-wrap',
                                                                    overflowWrap: 'break-word', // Add this line
                                                                    wordBreak: 'break-all',
                                                                }}
                                                            >
                                                                <p className="text-dark rounded-3" style={{border:"4px solid #d1e6ff"}}><span className="mx-2 my-2" style={{ display: 'inline-block' }}>{chat.content}</span></p>
                                                            </td>
                                                        </>
                                                    )}
                                                    {chat.sender.userId !== loggedInUserId && (
                                                        <td
                                                            colSpan={2}
                                                            style={{
                                                                textAlign: 'left',
                                                                width: '50%', // Set your desired max width
                                                                whiteSpace: 'pre-wrap',
                                                                overflowWrap: 'break-word', // Add this line
                                                            }}
                                                        >
                                                            <p className="" style={{ fontSize: '1em', fontWeight: 'bold' }}>{chat.content}</p>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            )}
                    
                        <div style={{ position: 'absolute', bottom: 30, width: '40%' }}>
                            <p className="m-0 p-0" style={{ fontSize: '0.8em', fontWeight: 'bold' }}>
                                <small>Type in below your message</small>
                            </p>
                            <div className="d-flex flex-row">
                                <input
                                    type="text"
                                    placeholder="Type something..."
                                    className="form-control rounded-3"
                                    value={message.content}
                                    style={{marginRight:"20px"}}
                                    required
                                        onChange={handleInput}
                                />
                                
                                <button type="button" className={!activateConfrim ? "btn btn-light" : "btn btn-primary"} disabled={!activateConfrim} onClick={handleSendMessage}>
                                <div className="d-flex flex-row ">
                                    <span className="mx-1">Send</span>
                                    <i class="bi bi-send-fill"></i>
                                    </div>
                                    </button>
                            </div>
                        </div>
                        <div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatComponent;
