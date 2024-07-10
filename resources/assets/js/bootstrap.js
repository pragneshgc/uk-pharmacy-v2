// require lodash
//window._ = require('lodash');
import lodash from "lodash";
window._ = lodash;

// require axios
//window.axios = require('axios');
import axios from "axios";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// attach the CSRF token to axios headers
let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
    console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
}

window.axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status == 419) {
            location.reload();
            return;
        } else if (
            error.response &&
            error.response.data.message == "Unauthenticated."
        ) {
            location.reload();
            return;
        }

        let errorObject = {
            type: "unknown",
            raw: error,
            response: false,
            request: false,
            message: false,
            location: window.location.href,
        };

        if (error.response) {
            errorObject.type = "response";
            errorObject.response = {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers,
            };
        } else if (error.request) {
            errorObject.type = "request";
            errorObject.response = {
                request: error.request,
            };
        } else {
            errorObject.type = "other";
            errorObject.response = {
                message: error.message,
            };
        }

        window.axios.post("/logs/error", errorObject);

        return Promise.reject(error);
    }
);

window.onerror = function (message, source, lineno, colno, error) {
    let errorObject = {
        type: "javascript",
        message: message,
        source: source,
        line: lineno,
        column: colno,
        error: error,
        location: window.location.href,
    };

    window.axios.post("/logs/error", errorObject);
};
