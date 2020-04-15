class Version {
    /**
     * @param {Release} release
     */
    constructor(release) {
        this.release = release;
        this.name = new VersionString(release.tag_name).version
    }

    init(section) {
        this.container = document.createElement("div", );
        this.container.classList.add("version-body");
        this.container.style.display = "none";

        this.container.innerHTML += `<h1>${unescape(this.release.name || this.release.tag_name)}</h1>`
        this.container.innerHTML += `<div>${marked(this.release.body)}</div>`

        this.container.innerHTML += "<h2>Downloads</h2>"
        let links = document.createElement("ul");
        for (const asset of this.release.assets) {
            let link = escape(asset.browser_download_url);
            let name = escape(asset.name);
            links.innerHTML += `<li class="download-link"><a href="${link}">${name}</a></li> `
        }

        this.container.appendChild(links);

        section.appendChild(this.container);
    }

    activate(e) {
        this.container.style.display = "";

        if (e !== undefined) {
            HistoryHandler.pushSearch({version: this.release.tag_name})
        }
    }

    deactivate() {
        this.container.style.display = "none";
    }
}

class Section {
    /**
     *
     * @param {string} name
     * @param {Version[]} versions
     */
    constructor(name, versions) {
        this.name = name;
        this.versions = versions;
    }

    init(section) {
        this.container = document.createElement("div");
        this.container.classList.add("section", "flex-container");
        this.container.style.display = "none";
        section.appendChild(this.container);
        for (let e of this.versions) {
            let releaseButton = document.createElement("span");
            releaseButton.classList.add("flex-column", "button");
            releaseButton.innerText = e.name;
            releaseButton.addEventListener("click", event => {
                this.resetVersions();
                e.activate(event);
            })
            this.container.appendChild(releaseButton);
            e.init(section);
        }

    }

    activate(e) {
        this.container.style.display = "initial";

        // this.versions[0].activate();

        if (e !== undefined) {
            HistoryHandler.pushSearch({mcversion: this.name, version: null})
        }
    }

    deactivate() {
        this.container.style.display = "none";
        this.resetVersions();
    }

    resetVersions() {
        for (let v of this.versions) {
            v.deactivate();
        }
    }

}

class Project {

    /**
     * @param {string} name
     * @param {Section[]} sections
     */
    constructor(name, sections) {
        this.name = name;
        this.sections = sections;

        this.button = null;
        this.container = null;
    }

    init(downloads) {

        let container = document.createElement("div");
        container.id = this.name + "-container";
        container.classList.add("flex-container");
        container.style.display = "none";

        let sectionsNode = document.createElement("div");
        // sectionsNode.id = this.name + "-sections";
        sectionsNode.classList.add("sections");
        container.appendChild(sectionsNode);
        for (let section of this.sections) {
            let sectionButton = document.createElement("span");
            sectionButton.classList.add("flex-column", "section-button", "button");
            sectionButton.innerText = section.name;
            sectionButton.addEventListener("click", e => {
                this.resetSections();
                section.activate(e);
            });
            sectionsNode.appendChild(sectionButton);
            section.init(container);
        }

        downloads.appendChild(container);
        this.container = container;
    }

    activate(e) {
        this.button.classList.add("active-project");
        this.container.style.display = "";

        if (e !== undefined) {
            HistoryHandler.pushSearch({project: this.name, mcversion: null, version: null})
        }
    }

    deactivate() {
        this.button.classList.remove("active-project");
        this.container.style.display = "none";

        this.resetSections();
    }

    resetSections() {
        for (let s of this.sections) {
            s.deactivate();
        }
    }
}

/**
 * @property {Project[]}
 */
class Downloads {

    /**
     * @param {Project[]} projects
     */
    constructor(projects) {
        this.projects = projects;
    }

    init() {
        let downloadsNode = document.getElementById("downloads");
        let projectsNode = document.createElement("div");
        projectsNode.id = "projects";
        projectsNode.classList.add("flex-container");
        downloadsNode.appendChild(projectsNode);
        for (const p of this.projects) {

            let button = document.createElement("span");
            button.classList.add("project-button", "button");
            button.innerText = p.name;
            button.addEventListener("click", (e) => {
                this.resetProjects();
                p.activate(e);
            })
            projectsNode.appendChild(button);
            p.button = button;

            p.init(downloadsNode);
        }

    }

    resetProjects() {
        for (let p of this.projects) {
            p.deactivate();
        }
    }
}

/**
 * Parses a version string and returns an object containing the mcversion and
 * the version.
 */
class VersionString {
    /**
     * Parses a version string.
     *
     * @param {string} name The version string to parse
     */
    constructor(name) {
        let version;
        let mcversion;

        let match = /v?(.+)-mc(.+)$/.exec(name);

        if (!match) {
            if (/-\d/.exec(name)) {
                version = name.substring(name.indexOf('-') + 1);
                name = name.substring(0, name.indexOf('-'));
            } else {
                version = name;
            }
            let parts = name.split(".");
            mcversion = parts.slice(0, 3).join('.');
        } else {
            version = match[1];
            mcversion = match[2];
        }

        this.version = version;
        this.mcversion = mcversion;
    }
}

/**
 * Sorts github releases by minecraft version. Returns a object of lists
 *
 * @param {Release[]} releases
 * @returns {Object<Release[]>}
 */
function arrangeGithubReleasesByMinecraftVersion(releases) {
    let versions = {};

    for (let release of releases) {
        if (release.prerelease) {
            continue;
        }
        let mcversion = new VersionString(release.tag_name).mcversion;

        if (versions[mcversion] === undefined) {
            versions[mcversion] = [];
        }
        versions[mcversion].push(release);
    }
    return versions;
}


class HistoryHandler {
    /**
     *
     * @param {Downloads} downloads
     */
    constructor(downloads) {
        this.downloads = downloads;
        this.displayProjects();
        this.initListeners();
    }

    /**
     *
     * @param {{}} params
     */
    static pushSearch(params) {
        let url = new URL(window.location.href);
        let urlParams = new URLSearchParams(url.search);
        for (const key in params) {
            if (params[key] === null) {
                urlParams.delete(key);
            } else {
                urlParams.set(key, params[key]);
            }
        }
        url.search = urlParams.toString();
        window.history.pushState("page2", "Title", url.href);
    }

    static parseArgs() {
        let params = new URLSearchParams(window.location.search);

        let args = {};
        if (params.has("project")) {
            args.project = params.get("project");
            if (params.has("mcversion")) {
                args.mcversion = params.get("mcversion");
                if (params.has("version")) {
                    args.version = params.get("version");
                }
            }
        }
        return args;
    }

    displayProjects() {
        let args = HistoryHandler.parseArgs();

        this.downloads.resetProjects();
        if (args.project !== undefined) {

            // find the project with the name from parameters
            for (let project of this.downloads.projects) {
                if (project.name === args.project) {
                    project.activate();

                    project.resetSections();
                    if (args.mcversion !== undefined) {

                        // find the section with the correct minecraft version
                        for (let section of project.sections) {
                            if (section.name === args.mcversion) {
                                section.activate();

                                section.resetVersions();
                                if (args.version !== undefined) {

                                    // find the version that matches the parameter
                                    for (let v of section.versions) {
                                        if (v.release.tag_name === args.version) {
                                            v.activate();
                                            break;
                                        }
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    }
                    break;
                }
            }
        }
    }

    initListeners() {
        window.addEventListener("popstate", () => {
            this.displayProjects();
        })
    }
}
