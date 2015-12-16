app.factory('Utils', () => {
    return {
        empty: (mixed_var) => {
            let undef, i, len;
            let emptyValues = [undef, null, false, 0, '', '0'];

            for (i = 0, len = emptyValues.length; i < len; i++) {
                if (mixed_var === emptyValues[i]) {
                    return true;
                }
            }

            if (typeof mixed_var === 'object') {
                for (key in mixed_var) {
                    return false;
                }

                return true;
            }

            return false;
        },

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
