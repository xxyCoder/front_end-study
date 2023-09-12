import server from './src/server'
import client from './src/client'

if (typeof window === 'undefined') {
    console.log(server)
} else {
    console.log(client)
}