export function extractIdFromUrl(url) {
    if (!Number.isNaN(parseInt(url))) return url;
    url = url.substring(0, url.length - 1);
    return parseInt(url.substring(url.lastIndexOf('/') + 1));
}
