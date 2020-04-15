/**
 * Parses the github Link headers
 *
 * @property {string} next The next link
 * @property {string} prev The previous link
 * @property {string} first The first link
 * @property {string} last The last link
 */
class GithubLinks {

    /**
     *
     * @param {Response} response
     */
    constructor(response) {

        let linkHeader = response.headers.get("Link");
        if (linkHeader !== null) {
            let links = linkHeader.split(",");
            for (const link of links) {
                let segments = link.split(";");
                if (segments.length < 2)
                    continue;

                let linkPart = segments[0].trim();
                if (!linkPart.startsWith("<") || !linkPart.endsWith(">"))
                    continue;
                linkPart = linkPart.slice(1, -1);

                for (const segment of segments.slice(1)) {
                    let rel = segment.trim().split("=");
                    if (rel.length < 2 || 'rel' !== rel[0])
                        continue;

                    let relValue = rel[1];
                    if (relValue.startsWith("\"") && relValue.endsWith("\""))
                        relValue = relValue.slice(1, -1);

                    this[relValue] = linkPart;
                }
            }
        } else {
            this.next = response.headers.get('X-Next');
            this.last = response.headers.get('X-Last');
        }
    }
}

class Github {
    /**
     *
     * @param {string} owner The project owner
     * @param {string} project The project name
     */
    constructor(owner, project) {
        this.owner = owner;
        this.project = project;
        this.repoUrl = `https://api.github.com/repos/${owner}/${project}`;
    }

    static fetch(endpoint) {
        return fetch(endpoint, {
            // enable cache to prevent api rate limiting
            // -- response headers --
            // cache-control: public, max-age=60, s-maxage=60
            cache: "force-cache"
        });
    }

    /**
     *
     * @param endpoint
     * @returns {Promise<?>}
     */
    static async call(endpoint) {
        let response = await this.fetch(endpoint);
        if (response.ok) {
            return await response.json();
        }
        throw `${response.status} - ${response.statusText}`
    }

    /**
     * Gets all releases
     *
     * @param endpoint
     * @returns {AsyncGenerator<any>}
     */
    static async* stream(endpoint) {
        let response = await this.fetch(endpoint);
        if (response.ok) {
            yield* await response.json();
            let links = new GithubLinks(response);
            if (links.next) {
                yield* this.stream(links.next);
            }
        } else {
            throw `${response.status} - ${response.statusText}`;
        }

    }

    /**
     * Gets repo info.
     *
     * @returns {Promise<Repo>}
     */
    repo() {
        return Github.call(this.repoUrl);
    }

    /**
     * Streams the published releases.
     *
     * @returns {AsyncGenerator<Release>}
     */
    releases() {
        return Github.stream(`${this.repoUrl}/releases`);
    }

}
