// 是否為行動裝置（提升相容性）
const isMobile = navigator.userAgentData?.mobile ?? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// 主函式：根據設備下載或分享媒體
export function handleMediaDownload(data, type, mimetype) {
    if (type === "image") {
        convertDataUrlToBlob(data).then(blob => {
            if (isMobile) {
                shareFile(blob, mimetype);
            } else {
                downloadFile(blob, mimetype);
            }
        });
    } else if (type === "video") {
        if (isMobile) {
            shareFile(data, mimetype);
        } else {
            downloadFile(data, mimetype);
        }
    } else {
        console.error("未知的媒體類型 : ", type);
    }
}

// 轉換 DataURL 至 Blob（img 專用）
function convertDataUrlToBlob(dataUrl) {
    return fetch(dataUrl)
        .then(res => res.blob())
        .catch(error => console.error("轉換 dataURL 失敗:", error));
}

// 下載 Blob 檔案
function downloadFile(blob, mimeType) {
    const extension = getFileExtension(mimeType);
    const fileName = nameFormater() + extension;
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement("a"), { href: url, download: fileName });

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`檔案已下載: ${fileName}`);
}

// 分享 Blob 檔案
function shareFile(blob, mimeType) {
    const fileName = nameFormater();
    const extension = getFileExtension(mimeType) || "";
    const file = new File([blob], fileName + extension, { type: mimeType });

    if (navigator.share) {
        navigator.share({
            title: "分享媒體",
            text: "這是我的媒體檔案，來看看吧！",
            files: [file]
        })
        .then(() => console.log("成功分享"))
        .catch(err => console.error("分享失敗:", err));
    } else {
        console.warn("裝置不支援分享功能，將改為下載");
        downloadFile(blob, mimeType);
    }
}

// 產生唯一檔案名稱
function nameFormater() {
    return Date.now().toString();
}

// 取得副檔名
function getFileExtension(mimeType) {
    return mimeToExtension.get(mimeType.toLowerCase()); // 確保 `mimeType` 小寫匹配
}

// 副檔名 Map（未來可擴展）
const mimeToExtension = new Map([
    ["image/png", ".png"],
    ["image/webp", ".webp"],
    ["video/mp4", ".mp4"],
    ["video/webm", ".webm"],
]);