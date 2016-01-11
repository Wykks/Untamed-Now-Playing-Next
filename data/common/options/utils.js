app.factory('Utils', () => {
    return {
        escapeHtml: (str) => {
            return $('<div/>').text(str).html();
        },

        string2Bin: (str) => {
            const result = [];

            for (let i = 0; i < str.length; i++) {
                result.push(str.charCodeAt(i));
            }
            return result;
        },

        bin2String: (array) => {
            return String.fromCharCode.apply(String, array);
        }
    };
});
