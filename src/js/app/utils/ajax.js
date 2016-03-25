export default function ajax(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload  = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr);
        xhr.send();
    });
}
