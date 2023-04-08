import { Server as IOServer } from 'socket.io'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'

interface SocketServer extends HTTPServer {
    io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
    server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIO
}
const SocketHandler = (_: NextApiRequest, res: NextApiResponseWithSocket) => {
    if (!res.socket.server.io) {
        console.log('Socket is initializing')
        const io = new IOServer(res.socket.server)
        res.socket.server.io = io
        io.on('connection', (socket) => {
            console.log('Socket connected')
            socket.on('disconnect', () => {
                console.log('Socket disconnected')
            })
        })
    }
    res.end()
}