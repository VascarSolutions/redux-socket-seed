import IO from 'socket.io-client'
import {setSocket, getSocket,disconnectSocket }  from './../socket/socket'

export const actions = {
    SOCKET_CONNECT: "SOCKET_CONNECT",
    SOCKET_ERROR: "SOCKET_ERROR",
    SOCKET_DISCONNECT: "SOCKET_DISCONNECT",
    SOCKET_RECONNECT: "SOCKET_RECONNECT",
    SOCKET_RECONNECT_ATTEMPT: "SOCKET_RECONNECT_ATTEMPT",
    SOCKET_RECONNECT_ERROR: "SOCKET_RECONNECT_ERROR",
    SOCKET_RECONNECT_FAILED: "SOCKET_RECONNECT_FAILED",
    SOCKET_AUTHENTICATION_STARTED: "SOCKET_AUTHENTICATION_STARTED",
    SOCKET_AUTHENTICATED: "SOCKET_AUTHENTICATED",
    SOCKET_AUTHENTICATION_FAILED: "SOCKET_AUTHENTICATION_FAILED",

    initialize: (secret) => (
        function (dispatch) {
            var socket = IO.connect({
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: 5
            })

            socket.on('connect', function () {
                dispatch(actions.connect())
                dispatch(actions.authenticate(secret))
            })

            socket.on('reconnect', function () {
                dispatch(actions.reconnect())
            })

            socket.on('disconnect', function () {
                dispatch(actions.disconnect())

            })

            socket.on('error', function (error) {
                dispatch(actions.handleConnectError(error))
            })

            socket.on('reconnect_error', function (data) {
                dispatch(actions.reconnectError(data))
            })

            socket.on('reconnect_failed', function () {
                dispatch(actions.handleReconnectFailed())
            })

            socket.on('reconnecting', function (number) {
                dispatch(actions.reconnectAttemp(number))
            })

            socket.on('authenticated', function () {
                dispatch(actions.authenticateSuccess())
            });

            socket.on('unauthenticated', function (error) {
                dispatch(actions.handleAuthenticationError(error))
            });

            socket.on('pong', function(){
                console.log("PONG!")
            });

            setSocket(socket)
        }
    ),

    authenticate: (secret) => (
        function (dispatch) {
            var socket = getSocket()
            socket.emit('authenticate', {secret})
            dispatch(actions.authenticateStarted())
        }
    ),

    authenticateStarted: () => ({
        type: actions.SOCKET_AUTHENTICATION_STARTED
    }),

    handleAuthenticationError: (error) => (
        function (dispatch) {
            dispatch(actions.authenticateFailed(error))
        }
    ),

    authenticateSuccess: () => ({
        type: actions.SOCKET_AUTHENTICATED
    }),

    authenticateFailed: (error) => ({
        type: actions.SOCKET_AUTHENTICATION_FAILED,
        error
    }),

    connect: () => ({
        type: actions.SOCKET_CONNECT
    }),

    disconnect: () => ({
        type: actions.SOCKET_DISCONNECT
    }),

    handleConnectError: (error) => (
        function (dispatch) {
            dispatch(actions.connectError(error))
        }
    ),

    connectError: (error) => ({
        type: actions.SOCKET_ERROR,
        error
    }),

    reconnect: () => ({
        type: actions.SOCKET_RECONNECT
    }),

    reconnectAttemp: (number) => ({
        type: actions.SOCKET_RECONNECT_ATTEMPT,
        number
    }),

    reconnectError: (error) => ({
        type: actions.SOCKET_RECONNECT_ERROR,
        error
    }),

    handleReconnectFailed: () => (
        function (dispatch) {
            dispatch(actions.reconnectFailed())
            disconnectSocket()
        }
    ),

    reconnectFailed: () => ({
        type: actions.SOCKET_RECONNECT_FAILED
    })

};

export default actions