var _validFileExtensions = ["jpg", "jpeg", "png"];

export function stopfile(file, type) {
    console.log(file.size)
    console.log(file.type)
    console.log(file.name)
    var e = file.name.split(".");
    var ext = e[e.length - 1];

    if (!_validFileExtensions.includes(ext)) {
        alert("Invalid image extension. .png, .jpg, .jpeg are supported.")

        return true
    }
    if (file.size > 5242880) {
        alert('File size should be less than 5 mb')
        return true
    }

}