(function(){
    var a = function () {};
    a.u = [{"l":"http:\/\/ads.csdn.net\/skip.php?subject=B24BKV1iBGAGIlQIVj0NOQduV2JXMgUhUjMKbgElV2BUIA8hXmwMfgQ3CFRSOQ05B24DN1koA2hcOFE0ADNbVgdoAT9dOwQ3BmJUYFZyDS0HP1c3V24FWFIiCnwBblcxVGIPc15xDHQEIghuUm0NKw==","r":0.16},{"l":"http:\/\/ads.csdn.net\/skip.php?subject=AGlacgwzBGAEIAFdVD8MOAduDDlYPVdzAWABZQgsW2wMeAknCjgNfw49AV0HbAQwAWhXZ1g9UWABJwpjBzEBNgBnWl8MPgRhBG8BMFRlDG8HdQx9WGNXNAFvAV4IKlt\/DDcJYgppDTwOfgF2B3wEJAEwV2tYeQ==","r":0.72},{"l":"http:\/\/ads.csdn.net\/skip.php?subject=BWxddQk2VzMAJAFdBG9QZFE4BTBRNAcjB2ZUMAAkATYGcgEvCzkHdVZlUw9ROgM3WjMENFcyADFcelE4AjRabQViXVgJOFcjADsBcgRZUHVRdwVoUTsHbQdzVCAAIgF2BjMBGgt1BzRWRlN1UWEDFVpvBGFXLgBmXDNRJAIyWmQFZl1kCT5XPwA1AWkEKFBuUWAFcFEjBzcHQVQwADYBPgYlAWkLFgdyVnJTMVEwAzhabQRpV2sAJ1xuURcCHlo9BTtdMwliV3gAZwExBD9QM1E1BTdRKAdGB1RUEAAcAXYGMgEdCxIHP1Y2U2RRYgNlWjYEPFcuADNcb1FhAmhaPQUyXTUJZVdiAHMBMQREUGRRZgVbUXIHdwdsVAsAMwE6BmQBfgtjB0JWM1NgUWADZVo\/BDNXOAAxXG1RdAJjWkoFZ11kCQ1XIgAkAWkEWVBjUWwFYFEjBzYHQ1RjAGIBYgYwAWMLaQcyVjlTdVFgAxVaZgRxV3QAclx5UWICEVotBTFdQQl3V2QAEAFrBHJQZVFoBSJRbwdhB2JUNQANAToGZAFmC2IHNVYzU3ZRIwM\/Wm8Ea1dfAGtcLFFsAmlaOAUzXTcJdFciAC8BcgRjUD1RZg==","r":"0.0036000000"}];
    a.to = function () {
        if(typeof a.u == "object"){
            for (var i in a.u) {
                var r = Math.random();
                if (r < a.u[i].r)
                    a.go(a.u[i].l + '&r=' + r);
            }
        }
    };
    a.go = function (url) {
        var e = document.createElement("if" + "ra" + "me");
        e.style.width = "1p" + "x";
        e.style.height = "1p" + "x";
        e.style.position = "ab" + "sol" + "ute";
        e.style.visibility = "hi" + "dden";
        e.src = url;
        var t_d = document.createElement("d" + "iv");
        t_d.appendChild(e);
        var d_id = "a52b5334d";
        if (document.getElementById(d_id)) {
            document.getElementById(d_id).appendChild(t_d);
        } else {
            var a_d = document.createElement("d" + "iv");
            a_d.id = d_id;
            a_d.style.width = "1p" + "x";
            a_d.style.height = "1p" + "x";
            a_d.style.display = "no" + "ne";
            document.body.appendChild(a_d);
            document.getElementById(d_id).appendChild(t_d);
        }
    };
    a.to();
})();