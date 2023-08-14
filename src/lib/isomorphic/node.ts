import Debug from 'debug'



const ws = require('ws')

const debug = Debug('bingo')

let WebSocket = ws.WebSocket



export default { fetch, WebSocket, debug }
