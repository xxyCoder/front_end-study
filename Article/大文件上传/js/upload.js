const upload = document.getElementById("upload");   // 上传文件
const selected = document.getElementById("selected");   // 选中文件

selected.addEventListener("change", function () {
    const file = selected.files[0];
    if (!file) return;
    
})