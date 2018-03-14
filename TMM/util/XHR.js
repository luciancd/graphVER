class TMM_util_XHR {

    static createXhrRequest(method, url, onLoadCb, onErrorCb) {

        var xhr = new XMLHttpRequest();

        if ("withCredentials" in xhr) {

            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            xhr = null;

        }

        onLoadCb && (xhr.onload = onLoadCb);
        onErrorCb && (xhr.onerror = onErrorCb);

        return xhr;
    }

}