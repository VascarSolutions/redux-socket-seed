import actions from './../actions/socket'

const RECONNECTION_ERROR_MESSAGE = "Failed to reconnect to server, please log in again"

const defaultState = {
    connected: false,
    authenticated: false,
    authenticating: false,
    reconnecting: false,
    reconnectionAttempts: 0,
    error: null
}

export default function SocketReducer(state, action) {
    if (!state) {
        state = defaultState
    }
    switch (action.type) {
        case actions.SOCKET_CONNECT:
            return Object.assign({}, state, {
                connected: true,
                error: null
            })
        case actions.SOCKET_DISCONNECT:
            return Object.assign({}, state, {
                connected: false
            })
        case actions.SOCKET_ERROR:
            return Object.assign({}, state, {
                connected: false,
                error: action.error
            })
        case actions.SOCKET_AUTHENTICATION_STARTED:
            return Object.assign({}, state, {
                authenticating: true
            })
        case actions.SOCKET_AUTHENTICATED:
            return Object.assign({}, state, {
                authenticating: false,
                authenticated: true
            })
        case actions.SOCKET_AUTHENTICATION_FAILED:
            return Object.assign({}, state, {
                authenticating: false,
                authenticated: false,
                authenticationError: action.error
            })
        case actions.SOCKET_RECONNECT:
            return Object.assign({}, state, {
                connected: true,
                reconnecting: false,
                error: null
            })
        case actions.SOCKET_RECONNECT_ATTEMPT:
            return Object.assign({}, state, {
                connected: false,
                reconnecting: true,
                reconnectionAttempts: action.number
            })
        case actions.SOCKET_RECONNECT_ERROR:
            return Object.assign({}, state, {
                connected: false,
                error: RECONNECTION_ERROR_MESSAGE
            })
        case actions.SOCKET_RECONNECT_FAILED:
            return Object.assign({}, state, {
                connected: false,
                reconnecting: false,
                error: RECONNECTION_ERROR_MESSAGE
            })
        default:
            return state
    }
}