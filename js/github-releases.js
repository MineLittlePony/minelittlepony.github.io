function makeReleaseButton() {
    var URL = "https://api.github.com/repos/MineLittlePony/MineLittlePony/releases/latest"
    $.get(URL, function (data) {
        var url = data.html_url
        var version = data.tag_name

        var mcver = version.substring(0, version.lastIndexOf("."))
        if (mcver.endsWith(".0"))
            mcver = mcver.substring(0, mcver.length - 2)

        $(".mcversion").text(mcver)
        $("#latest").attr("href", url)
    })
}