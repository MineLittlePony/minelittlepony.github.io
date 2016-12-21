
function getMCVersion(version) {
    version = version.substring(0, version.lastIndexOf("."))
    if (version.endsWith(".0"))
        version = version.substring(0, version.length - 2);
    return version;
}
function makeReleaseButton() {
    var URL = "https://api.github.com/repos/MineLittlePony/MineLittlePony/releases"
    $.get(URL, function (data) {
        var latest;
        var prerelease
        for (var i = 0; i < data.length; i++) {
            var tag = data[i];
            if (tag.target_commitish == "master") {
                if (!prerelease && tag.prerelease) {
                    prerelease = tag;
                } else if (!tag.prerelease){
                    latest = tag;
                    break;
                }
            }
        }
        var url = latest.html_url
        var version = latest.tag_name

        var mcver = getMCVersion(version)

        $(".mcversion").text(mcver)
        $("#latest").attr("href", url)

        if (prerelease) {
            var betaUrl = prerelease.html_url
            var betaVersion = latest.tag_name
            var betaVer = getMCVersion(betaVersion)
            if (betaVer != mcver) {
                $(".mcversion").append(" (Beta: " + betaVer + ")")
            }

            $("#prerelease").attr("href", betaUrl);
            $("#prerelease").show()
            $("#latest").children().first().addClass("download-latest")
        }
    })
}