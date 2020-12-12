// ==UserScript==
// @name Krunker wallhack
// @description 102105
// @version 1.0
// @author SkidTamer
// @match *https://krunker.io/*
// @exclude *krunker.io/social*
// @grant unsafeWindow
// @run-at document-start
// ==/UserScript==
window = unsafeWindow;

const vars = {}

const zion = function(code) {
    for (let z in /(&&!\w\['\w+']&&\w\['\w+'\]&&)\w\['(\w+)'](\){)/) {
        const key = /(&&!\w\['\w+']&&\w\['\w+'\]&&)\w\['(\w+)'](\){)/ [z];
        vars[z] = key.regex.exec(code)[key.pos];
    }
    code = code.replace(/(&&!\w\['\w+']&&\w\['\w+'\]&&)\w\['(\w+)'](\){)/, "$1true$3")
    return code;
}

const _Function = Function;
window.Function = new Proxy(Function, {
    construct(target, args) {
        if ((args[2] || "").startsWith("var vrtInit")) {
            args[2] = zion(args[2]);
            window.Function = _Function;
        }
        return new target(...args);
    }
})
