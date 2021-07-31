"use strict";

/**
 * Pings the server and returns the result promise.
 *
 * @param ip {string}
 * @return {Promise<MinecraftPingResponse>}
 */
async function ping(ip) {
    let url = `https://api.mcsrvstat.us/2/${ip}`

    const resp = await fetch(url)

    const j = await resp.json()
    if (!resp.ok) {
        throw new Error(resp.message)
    }
    return j
}

window.addEventListener('load', () => {
    (async () => {
        for (const div of document.querySelectorAll(".server")) {
            const ip = div.getAttribute("data-ip");
            const name = div.getAttribute('data-name')
            try {
                const result = await ping(ip)
                if (result.online) {
                    div.innerHTML = `
                        <img src="${result.icon || ''}" alt="No favicon"/>
                        <div class="server-content">
                            ${name} <br/>
                            <div class="server-motd">
                                ${result.motd.html.join("<br/>")}
                            </div>
                            <div class="server-info">
                                Players: (${result.players.online}/${result.players.max})<br/>
                                ${result.version}
                            </div>
                        </div>`
                } else {
                    div.innerHTML = `
                        <div class="server-content">
                            ${name}<br/>
                            <span class="server-error">Server is offline</span>                        
                        </div>`
                }
            } catch (e) {
                console.error(e)
                div.innerHTML = `
                    <div class="server-content">
                        ${div.innerHTML}<br/>
                        <span class="server-error">Could not connect to API server.</span>
                    </div>`
            }
        }
    })()
})
