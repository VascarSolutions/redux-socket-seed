var socket = null

export function getSocket() {
    return socket
}

export function setSocket(s) {
    socket = s
}

export function disconnectSocket() {
    socket.disconnect()
    socket.removeAllListeners()
    setSocket(null)
}