declare type MinecraftPingResponse = {
    debug: {
        animatedmotd: boolean
        apiversion: number
        cachetime: number
        cnameinsrv: boolean
        ipinsrv: boolean
        ping: boolean
        query: boolean
        querymismatch: boolean
        srv: boolean
    }
    hostname: string
    icon: string
    ip: string
    motd: {
        clean: string[]
        html: string[]
        raw: string[]
    }
    online: boolean
    players: {
        max: number
        online: number
    }
    port: number
    protocol: number
    version: string
}
