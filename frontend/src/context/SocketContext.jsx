import React, { useEffect } from 'react'
import SocketDataContext from './SocketDataContext'
import { io } from 'socket.io-client'


const socket = io(``);


const SocketContext = ({ children }) => {


    useEffect(() => {

        //Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        })

    }, []);


    return (
        <SocketDataContext.Provider value={{ socket }}>
            {children}
        </SocketDataContext.Provider>
    )
}

export default SocketContext;