let currentFile = null;


function newFile() {
    if (confirm("Are you sure you want to create a new file?")) {
        document.getElementById("editor").value = "";
        currentFile = null;
    }
}


function openFile() {
    let fileInput = document.getElementById("fileInput");
    fileInput.click();

    fileInput.onchange = function () {
        let file = fileInput.files[0];
        if (file) {
            let reader = new FileReader();

            reader.onload = function () {
                document.getElementById("editor").value = reader.result;
                currentFile = file.name;
            };

            reader.readAsText(file);
        }
    };
}


function saveFile() {
    if (currentFile) {
        downloadFile(currentFile);
    } else {
        saveAsFile();
    }
}


function saveAsFile() {
    let fileName = prompt("Enter file name:");
    if (fileName) {
        currentFile = fileName;
        downloadFile(fileName);
    }
}


function downloadFile(filename) {
    let text = document.getElementById("editor").value;
    let blob = new Blob([text], { type: "text/plain" });
    let anchor = document.createElement("a");

    anchor.href = URL.createObjectURL(blob);
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
}
