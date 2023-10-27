import instance from './instance.js';
const uploadFormData = document.getElementById("uploadFormData");   // 上传文件
const uploadFormDataMul = document.getElementById("uploadFormDataMul");   // 上传文件
const uploadBase64 = document.getElementById("uploadBase64");   // 上传文件
const selected = document.getElementById("selected");   // 选中文件
const selectedMul = document.getElementById("selectedMul");   // 选中文件
const progress = document.getElementById("progress");   // 进度条
const progressMul = document.getElementById("progressMul");   // 进度条

let _file = null, _files = [];

selected.addEventListener("change", function () {
    const file = selected.files[0];
    if (!file) return;
    _file = file;
});

// 基于FormData单文件上传
uploadFormData.addEventListener("click", function () {
    if (!_file) return;
    const formData = new FormData();
    formData.append("filename", _file.name);
    formData.append("file", _file);
    progress.style.opacity = 1;
    instance.post("/formData", formData, {
        onUploadProgress: function (event) {
            progress.value = event.loaded / event.total * 100;
        }
    }).then(data => {

    }).finally(() => {
        progress.style.opacity = 0;
        progress.value = 0;
        _file = null;
    })
})

// 基于base64实现文件上传
const changeToBase64 = file => {
    return new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (e) {
            resolve(e.target.result);
        }
    })
}
uploadBase64.addEventListener("click", function () {
    if (!_file) {
        alert("没有选择文件");
        return;
    }
    changeToBase64(_file).then(base64 => {
        instance.post("/base64", { file: encodeURIComponent(base64), filename: _file.name }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }, {
            onUploadProgress: function (event) {
                progress.value = event.loaded / event.total * 100;
            }
        }).then(data => {

        }).finally(() => {
            progress.style.opacity = 0;
            progress.value = 0;
            _file = null;
        });
    })
})