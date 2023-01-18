import React, { useEffect } from 'react';

const KommunicateChat = () => {
    useEffect(() => {
        (function (d, m) {
            var kommunicateSettings = {
                "appId": "474c9710d28f2f0c1b2eb962a788f648",
                "popupWidget": true,
                "automaticChatOpenOnNavigation": true
            };
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0];
            h.appendChild(s);
            window.kommunicate = m;
            return m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    })
    return (
        <div></div>
    )

}
export default KommunicateChat
