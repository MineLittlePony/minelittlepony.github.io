function makeReleaseButton() {
    var URL = "https://api.github.com/repos/MineLittlePony/MineLittlePony/releases/latest"
    $.get(URL, function (data) {
        var url = data.html_url
        var version = data.tag_name

        $(".mcversion").text(version.substring(0, version.lastIndexOf(".")))        
        $("#latest").attr("href", url)
    })
}