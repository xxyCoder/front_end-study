import instance from './instance.js';
const upload = document.getElementById("upload");   // 上传文件
const selected = document.getElementById("selected");   // 选中文件

let _file = null;

// 基于FormData单文件上传
(function () {
    selected.addEventListener("change", function () {
        const file = selected.files[0];
        if (!file) return;
        _file = file;
    })

    upload.addEventListener("click", function () {
        if (!_file) {
            alert("没有选择文件");
            return;
        }
        upload.classList.add("disabled");
        const formData = new FormData();
        formData.append("file", _file);
        formData.append("filename", _file.name);
        instance.post("/upload_single", formData).then(data => {

        }).finally(() => {
            upload.classList.remove("abled");
        });
    })
})();

// 基于base64实现文件上传
(function () {
    selected.addEventListener("change", function () {
        const file = selected.files[0];
        if (!file) return;
        _file = file;
    })

    const changeToBase64 = file => {
        return new Promise(resolve => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function (e) {
                resolve(e.target.result);
            }
        })
    }

    upload.addEventListener("click", function () {
        if (!_file) {
            alert("没有选择文件");
            return;
        }
        changeToBase64(_file).then(base64 => {
            instance.post("/upload_single_base64", { file: encodeURIComponent(base64), filename: _file.name }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(data => {

            });
        })
    })
})();