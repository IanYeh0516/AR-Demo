// 還需要在重構

export function downloadOrShareImage(dataUrl, filename) {
    // **檢查是否為行動裝置**
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // **轉換成 Blob**
    fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], filename, { type: "image/png" });
            if (isMobile && navigator.share) {
                navigator.share({
                    title: "分享截圖",
                    text: "這是我的截圖，來看看吧！",
                    files: [file]
                })
                    .then(() => console.log("成功分享"))
                    .catch(err => console.error("分享失敗:", err));
            }
            else {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                console.log("圖片已下載:", filename);
            }
        })
        .catch(err => console.error("下載 / 分享圖片失敗:", err));
}

export function downloadBlob(blob, mimeType) {
    const url = URL.createObjectURL(blob);
    const extension = mimeType.includes("webm") ? ".webm" : ".mp4";
    const link = Object.assign(document.createElement("a"), { href: url, download: Date.now() + extension });
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
