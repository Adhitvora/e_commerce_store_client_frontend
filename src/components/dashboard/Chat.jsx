// import React, { useEffect, useState, useRef } from 'react'
// import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
// import { GrEmoji } from 'react-icons/gr'
// import { IoSend } from 'react-icons/io5'
// import { FaList } from 'react-icons/fa'
// import { Link, useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import io from 'socket.io-client'
// import { add_friend, send_message, updateMessage, messageClear } from '../../store/reducers/chatReducer'
// import toast from 'react-hot-toast'
// import {api_url} from '../../utils/config'
// const socket = io(api_url)

// const Chat = () => {

//     const scrollRef = useRef()

//     const dispatch = useDispatch()
//     const { sellerId } = useParams()
//     const [text, setText] = useState('')
//     const [receverMessage, setReceverMessage] = useState('')
//     const [activeSeller, setActiveSeller] = useState([])
//     const { userInfo } = useSelector(state => state.auth)
//     const { fd_messages, currentFd, my_friends, successMessage } = useSelector(state => state.chat)
//     const userId = userInfo?.id

//     useEffect(() => {
//         if (!userId) return
//         socket.emit('add_user', userId, userInfo)
//     }, [userId, userInfo])

//     useEffect(() => {
//         if (!userId) return
//         dispatch(add_friend({
//             sellerId: sellerId || "",
//             userId
//         }))
//     }, [dispatch, sellerId, userId])

//     const send = () => {
//         if (!userId) return
//         if (text) {
//             dispatch(send_message({
//                 userId,
//                 text,
//                 sellerId,
//                 name: userInfo.name
//             }))
//             setText('')
//         }
//     }

//     useEffect(() => {
//         socket.on('seller_message', msg => {
//             setReceverMessage(msg)
//         })
//         socket.on('activeSeller', (sellers) => {
//             setActiveSeller(sellers)
//         })
//     }, [])

//     useEffect(() => {
//         if (successMessage) {
//             socket.emit('send_customer_message', fd_messages[fd_messages.length - 1])
//             dispatch(messageClear())
//         }
//     }, [successMessage])

//     useEffect(() => {
//         console.log(receverMessage)
//         if (!userId) return
//         if (receverMessage) {
//             if (sellerId === receverMessage.senderId && userId === receverMessage.receverId) {
//                 dispatch(updateMessage(receverMessage))
//             } else {
//                 toast.success(receverMessage.senderName + " " + "send a message")
//                 dispatch(messageClear())
//             }
//         }
//     }, [dispatch, receverMessage, sellerId, userId])

//     useEffect(() => {
//         scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
//     }, [fd_messages])

//     const [show, setShow] = useState(false)

//     return (
//         <div className='bg-white p-3 rounded-md'>
//             <div className='w-full flex relative'>
//                 <div className={`w-[230px] md-lg:absolute bg-white transition-all md-lg:h-full ${show ? 'left-0' : '-left-[350px]'} `}>
//                     <div className='flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]'>
//                         <span><AiOutlineMessage /></span>
//                         <span>Message</span>
//                     </div>
//                     <div className='w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3'>
//                         {
//                             my_friends.map((f, i) => <Link to={`/dashboard/chat/${f.fdId}`} key={i} className={`flex gap-2 justify-start items-center pl-2 py-[5px]`} >
//                                 <div className='w-[30px] h-[30px] rounded-full relative'>
//                                     {
//                                         activeSeller.some(c => c.sellerId === f.fdId) && <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
//                                     }
//                                     <img src="/images/user.png" alt="" />
//                                 </div>
//                                 <span>{f.name}</span>
//                             </Link>)
//                         }
//                     </div>
//                 </div>
//                 <div className='w-[calc(100%-230px)] md-lg:w-full'>
//                     {
//                         currentFd ? <div className='w-full h-full'>
//                             <div className='flex justify-between items-center text-slate-600 text-xl h-[50px]'>
//                                 <div className='flex gap-2'>
//                                     <div className='w-[30px] h-[30px] rounded-full relative'>
//                                         {
//                                             activeSeller.some(c => c.sellerId === currentFd.fdId) && <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
//                                         }
//                                         <img src="/images/user.png" alt="" />
//                                     </div>
//                                     <span>{currentFd.name}</span>
//                                 </div>
//                                 <div onClick={()=>setShow(!show)} className='w-[35px] hidden md-lg:flex cursor-pointer h-[35px] rounded-sm justify-center items-center bg-sky-600 text-white'>
//                                     <FaList />
//                                 </div>
//                             </div>
//                             <div className='h-[400px] w-full bg-slate-100 p-3 rounded-md'>
//                                 <div className='w-full h-full overflow-y-auto flex flex-col gap-3'>
//                                     {
//                                         fd_messages.map((m, i) => {
//                                             if (currentFd?.fdId !== m.receverId) {
//                                                 return (
//                                                     <div key={i} ref={scrollRef} className='w-full flex gap-2 justify-start items-center text-[14px]'>
//                                                         <img className='w-[30px] h-[30px] ' src="/images/user.png" alt="" />
//                                                         <div className='p-2 bg-purple-500 text-white rounded-md'>
//                                                             <span>{m.message}</span>
//                                                         </div>
//                                                     </div>
//                                                 )
//                                             } else {
//                                                 return (
//                                                     <div key={i} ref={scrollRef} className='w-full flex gap-2 justify-end items-center text-[14px]'>
//                                                         <img className='w-[30px] h-[30px] ' src="/images/user.png" alt="" />
//                                                         <div className='p-2 bg-cyan-500 text-white rounded-md'>
//                                                             <span>{m.message}</span>
//                                                         </div>
//                                                     </div>
//                                                 )
//                                             }
//                                         })
//                                     }

//                                 </div>
//                             </div>
//                             <div className='flex p-2 justify-between items-center w-full'>
//                                 <div className='w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full'>
//                                     <label className='cursor-pointer' htmlFor=""><AiOutlinePlus /></label>
//                                     <input className='hidden' type="file" />
//                                 </div>
//                                 <div className='border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative'>
//                                     <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder='input message' className='w-full rounded-full h-full outline-none p-3' />
//                                     <div className='text-2xl right-2 top-2 absolute cursor-auto'>
//                                         <span><GrEmoji /></span>
//                                     </div>

//                                 </div>
//                                 <div className='w-[40px] p-2 justify-center items-center rounded-full'>
//                                     <div onClick={send} className='text-2xl cursor-pointer'>
//                                         <IoSend />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div> : <div onClick={()=>setShow(true)} className='w-full flex justify-center items-center text-lg ont-bold text-slate-600 h-[400px]'>
//                             <span>select seller</span>
//                         </div>
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Chat
import React, { useEffect, useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  get_messages,
  send_message,
  updateMessage,
  messageClear,
} from "../../store/reducers/chatReducer";
import { api_url } from "../../utils/config";

const socket = io(api_url);

const Chat = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const { userInfo } = useSelector((state) => state.auth);
  const { messages, successMessage } = useSelector((state) => state.chat);


  const userId = userInfo?.id;
  
  const [text, setText] = useState("");

  const ADMIN_ID = "6980480486aa781558164fb0";
  // Register socket
  useEffect(() => {
    if (!userId) return;
    socket.emit("register", {
      userId,
      role: "customer",
    });
  }, [userId]);

  // Load old messages
  useEffect(() => {
    if (!userId) return;
    dispatch(
      get_messages({
        userId,
        role: "customer",
      }),
    );
  }, [userId, dispatch]);

  // Send message
  const handleSend = () => {
    if (!text.trim()) return;

    dispatch(
      send_message({
        senderId: userId,
        senderRole: "customer",
        receiverId: ADMIN_ID,
        receiverRole: "admin",
        message: text,
      }),
    );

    setText("");
  };

  // Emit via socket after DB save
  useEffect(() => {
    if (successMessage) {
      const lastMessage = messages[messages.length - 1];

      socket.emit("send_message", lastMessage);
      dispatch(messageClear());
    }
  }, [successMessage, messages, dispatch]);

  // Receive message
  useEffect(() => {
    socket.on("receive_message", (msg) => {
      dispatch(updateMessage(msg));
    });

    return () => {
      socket.off("receive_message");
    };
  }, [dispatch]);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white p-4 rounded-md h-[500px] flex flex-col">
      <h2 className="text-lg font-semibold mb-3">Chat With Admin</h2>

      <div className="flex-1 overflow-y-auto bg-slate-100 p-3 rounded-md">
        {messages.map((m, i) => (
          <div
            key={i}
            ref={scrollRef}
            className={`flex ${m.senderRole === "customer" ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`p-2 rounded-md text-white ${m.senderRole === "customer" ? "bg-cyan-500" : "bg-purple-500"}`}
            >
              {m.message}
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border rounded-l-md p-2 outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded-r-md"
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
