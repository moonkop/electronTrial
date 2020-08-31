(function(a, c) {
    if (typeof module === "object" && typeof module.exports === "object") {
        window.nl = c({});
    } else {
        if (typeof define === "function" && define.amd) {
            define(["exports"], c);
        } else {
            window.nl = c({});
        }
    }
}
)(this, function(exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    "use strict";
    if (nl === undefined) {
        var nl = {};
    }
    if (nl.sara === undefined) {
        nl.sara = {};
    }
    if (nl.sara.webdav === undefined) {
        nl.sara.webdav = {};
    }
    if (nl.sara.webdav.codec === undefined) {
        nl.sara.webdav.codec = {};
    }
    "use strict";
    if (nl.sara.webdav.Exception !== undefined) {
        throw "Class name nl.sara.webdav.Exception already taken, could not load JavaScript library for WebDAV connectivity.";
    }
    nl.sara.webdav.Exception = function(message, code) {
        Object.defineProperty(this, "message", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "code", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        if (message !== undefined) {
            this.message = message;
        }
        if (code !== undefined) {
            this.code = code;
        }
    }
    ;
    nl.sara.webdav.Exception.WRONG_TYPE = 1;
    nl.sara.webdav.Exception.NAMESPACE_TAKEN = 2;
    nl.sara.webdav.Exception.UNEXISTING_PROPERTY = 3;
    nl.sara.webdav.Exception.WRONG_XML = 4;
    nl.sara.webdav.Exception.WRONG_VALUE = 5;
    nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER = 6;
    nl.sara.webdav.Exception.AJAX_ERROR = 7;
    nl.sara.webdav.Exception.NOT_IMPLEMENTED = 8;
    nl.sara.webdav.Exception.prototype.toString = function() {
        return this.message;
    }
    ;
    "use strict";
    if (nl.sara.webdav.Ie !== undefined) {
        throw "Class name nl.sara.webdav.Ie already taken, could not load JavaScript library for WebDAV connectivity.";
    }
    nl.sara.webdav.Ie = {};
    nl.sara.webdav.Ie.isIE = false;
    /*@cc_on
nl.sara.webdav.Ie.isIE = true;
@*/
    nl.sara.webdav.Ie.getLocalName = function(node) {
        if (nl.sara.webdav.Ie.isIE && node.baseName) {
            return node.baseName;
        } else {
            return node.localName;
        }
    }
    ;
    "use strict";
    if (nl.sara.webdav.Client !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.Client already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.Client = function(config, useHTTPS, port, defaultHeaders) {
        Object.defineProperty(this, "_baseUrl", {
            value: null,
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "_username", {
            value: null,
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "_password", {
            value: null,
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "_headers", {
            value: {},
            enumerable: false,
            configurable: false,
            writable: true
        });
        if (config !== undefined) {
            var host;
            if (typeof (config) !== "string") {
                host = config.host;
                useHTTPS = (config.useHTTPS !== false);
                port = config.port;
                defaultHeaders = config.defaultHeaders;
                if (config.username !== undefined) {
                    this._username = config.username;
                    if (config.password !== undefined) {
                        this._password = config.password;
                    } else {
                        this._password = "";
                    }
                }
            } else {
                host = config;
            }
            if (host !== undefined) {
                var protocol = (useHTTPS === true) ? "https" : "http";
                port = (port !== undefined) ? port : ((protocol === "https") ? 443 : 80);
                this._baseUrl = protocol + "://" + host + ((((protocol === "http") && (port === 80)) || ((protocol === "https") && (port === 443))) ? "" : ":" + port);
            }
        }
        if (defaultHeaders !== undefined) {
            this._headers = defaultHeaders;
        }
    }
    ;
    nl.sara.webdav.Client.PROPNAME = 1;
    nl.sara.webdav.Client.ALLPROP = 2;
    nl.sara.webdav.Client.INFINITY = "infinity";
    nl.sara.webdav.Client.FAIL_ON_OVERWRITE = 3;
    nl.sara.webdav.Client.TRUNCATE_ON_OVERWRITE = 4;
    nl.sara.webdav.Client.SILENT_OVERWRITE = 5;
    nl.sara.webdav.Client.prototype.getUrl = function(path) {
        if (path.substring(0, 1) !== "/") {
            path = "/" + path;
        }
        if (this._baseUrl !== null) {
            return this._baseUrl + path;
        } else {
            return path;
        }
    }
    ;
    nl.sara.webdav.Client.prototype.propfind = function(path, callback, depth, props, include, headers) {
        if ((path === undefined) || (callback === undefined)) {
            throw new nl.sara.webdav.Exception("PROPFIND requires the parameters path and callback",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if (!(typeof path === "string")) {
            throw new nl.sara.webdav.Exception("PROPFIND parameter; path should be a string",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        if (depth === undefined) {
            depth = 0;
        }
        var depthHeader = null;
        switch (depth) {
        case 0:
        case 1:
            depthHeader = depth;
            break;
        case nl.sara.webdav.Client.INFINITY:
            depthHeader = "infinity";
            break;
        default:
            throw new nl.sara.webdav.Exception("Depth header should be '0', '1' or nl.sara.webdav.Client.INFINITY",nl.sara.webdav.Exception.WRONG_VALUE);
            break;
        }
        if (props === undefined) {
            props = nl.sara.webdav.Client.ALLPROP;
        }
        var propsBody = document.implementation.createDocument("DAV:", "propfind", null);
        switch (props) {
        case nl.sara.webdav.Client.PROPNAME:
            propsBody.documentElement.appendChild(propsBody.createElementNS("DAV:", "propname"));
            break;
        case nl.sara.webdav.Client.ALLPROP:
            propsBody.documentElement.appendChild(propsBody.createElementNS("DAV:", "allprop"));
            if (include !== undefined) {
                if (!(include instanceof Array)) {
                    throw new nl.sara.webdav.Exception("Propfind parameter; include should be an array",nl.sara.webdav.Exception.WRONG_TYPE);
                }
                var includeBody = propsBody.createElementNS("DAV:", "include");
                for (var i = 0; i < include.length; i++) {
                    var item = include[i];
                    if (!nl.sara.webdav.Ie.isIE && !(item instanceof nl.sara.webdav.Property)) {
                        continue;
                    }
                    includeBody.appendChild(propsBody.createElementNS(item.namespace, item.tagname));
                }
                if (includeBody.hasChildNodes()) {
                    propsBody.documentElement.appendChild(includeBody);
                }
            }
            break;
        default:
            if (!(props instanceof Array)) {
                throw new nl.sara.webdav.Exception("Props parameter should be nl.sara.webdav.Client.PROPNAME, nl.sara.webdav.Client.ALLPROP or an array with Property objects",nl.sara.webdav.Exception.WRONG_VALUE);
            }
            var propertyBody = propsBody.createElementNS("DAV:", "prop");
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (!nl.sara.webdav.Ie.isIE && !(prop instanceof nl.sara.webdav.Property)) {
                    continue;
                }
                propertyBody.appendChild(propsBody.createElementNS(prop.namespace, prop.tagname));
            }
            if (!propertyBody.hasChildNodes()) {
                throw new nl.sara.webdav.Exception("Propfind parameter; if props is an array, it should be an array of Properties",nl.sara.webdav.Exception.WRONG_TYPE);
            }
            propsBody.documentElement.appendChild(propertyBody);
            break;
        }
        var serializer = new XMLSerializer();
        var body = '<?xml version="1.0" encoding="utf-8" ?>' + serializer.serializeToString(propsBody);
        var ajax = this.getAjax("PROPFIND", url, callback, headers);
        ajax.setRequestHeader("Depth", depthHeader);
        ajax.setRequestHeader("Content-Type", 'application/xml; charset="utf-8"');
        ajax.send(body);
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.proppatch = function(path, callback, setProps, delProps, headers) {
        if ((path === undefined) || (callback === undefined) || ((setProps === undefined) && (delProps === undefined))) {
            throw new nl.sara.webdav.Exception("PROPPATCH requires the parameters path, callback and at least one of setProps or delProps",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if (!(typeof path === "string") || ((setProps !== undefined) && !(setProps instanceof Array)) || ((delProps !== undefined) && !(delProps instanceof Array))) {
            throw new nl.sara.webdav.Exception("PROPPATCH parameter; path should be a string, setProps and delProps should be arrays",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        var propsBody = document.implementation.createDocument("DAV:", "propertyupdate", null);
        if (setProps !== undefined) {
            var props = propsBody.createElementNS("DAV:", "prop");
            for (var i = 0; i < setProps.length; i++) {
                var prop = setProps[i];
                if (!nl.sara.webdav.Ie.isIE && !(prop instanceof nl.sara.webdav.Property)) {
                    continue;
                }
                var element = propsBody.createElementNS(prop.namespace, prop.tagname);
                for (var j = 0; j < prop.xmlvalue.length; j++) {
                    var nodeCopy = propsBody.importNode(prop.xmlvalue.item(j), true);
                    element.appendChild(nodeCopy);
                }
                props.appendChild(element);
            }
            if (!props.hasChildNodes()) {
                throw new nl.sara.webdav.Exception("Proppatch parameter; setProps should be an array of Properties",nl.sara.webdav.Exception.WRONG_TYPE);
            }
            var set = propsBody.createElementNS("DAV:", "set");
            set.appendChild(props);
            propsBody.documentElement.appendChild(set);
        }
        if (delProps !== undefined) {
            var props = propsBody.createElementNS("DAV:", "prop");
            for (var i = 0; i < delProps.length; i++) {
                var prop = delProps[i];
                if (!nl.sara.webdav.Ie.isIE && !(prop instanceof nl.sara.webdav.Property)) {
                    continue;
                }
                var element = propsBody.createElementNS(prop.namespace, prop.tagname);
                props.appendChild(element);
            }
            if (!props.hasChildNodes()) {
                throw new nl.sara.webdav.Exception("Proppatch parameter; delProps should be an array of Properties",nl.sara.webdav.Exception.WRONG_TYPE);
            }
            var remove = propsBody.createElementNS("DAV:", "remove");
            remove.appendChild(props);
            propsBody.documentElement.appendChild(remove);
        }
        var serializer = new XMLSerializer();
        var body = '<?xml version="1.0" encoding="utf-8" ?>' + serializer.serializeToString(propsBody);
        var ajax = this.getAjax("PROPPATCH", url, callback, headers);
        ajax.setRequestHeader("Content-Type", 'application/xml; charset="utf-8"');
        ajax.send(body);
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.mkcol = function(path, callback, body, contenttype, headers) {
        if ((path === undefined) || (callback === undefined)) {
            throw new nl.sara.webdav.Exception("MKCOL requires the parameters path and callback",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if ((typeof path !== "string") || ((contenttype !== undefined) && (typeof contenttype !== "string"))) {
            throw new nl.sara.webdav.Exception("MKCOL parameter; path and contenttype should be strings",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        var ajax = this.getAjax("MKCOL", url, callback, headers);
        if (body !== undefined) {
            if (contenttype !== undefined) {
                ajax.setRequestHeader("Content-Type", contenttype);
            }
            ajax.send(body);
        } else {
            ajax.send();
        }
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.remove = function(path, callback, headers) {
        if ((path === undefined) || (callback === undefined)) {
            throw new nl.sara.webdav.Exception("DELETE requires the parameters path and callback",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if (typeof path !== "string") {
            throw new nl.sara.webdav.Exception("DELETE parameter; path should be strings",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        var ajax = this.getAjax("DELETE", url, callback, headers);
        ajax.send();
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.get = function(path, callback, headers) {
        if ((path === undefined) || (callback === undefined)) {
            throw new nl.sara.webdav.Exception("GET requires the parameters path and callback",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if (typeof path !== "string") {
            throw new nl.sara.webdav.Exception("GET parameter; path should be strings",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        var ajax = null;
        ajax = this.getAjax("GET", url, callback, headers);
        ajax.send();
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.head = function(path, callback, headers) {
        if ((path === undefined) || (callback === undefined)) {
            throw new nl.sara.webdav.Exception("HEAD requires the parameters path and callback",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if (typeof path !== "string") {
            throw new nl.sara.webdav.Exception("HEAD parameter; path should be strings",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        var ajax = null;
        ajax = this.getAjax("HEAD", url, callback, headers);
        ajax.send();
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.put = function(path, callback, body, contenttype, headers) {
        if ((path === undefined) || (callback === undefined) || (body === undefined)) {
            throw new nl.sara.webdav.Exception("PUT requires the parameters path, callback and body",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if ((typeof path !== "string") || ((contenttype !== undefined) && (typeof contenttype !== "string"))) {
            throw new nl.sara.webdav.Exception("PUT parameter; path and contenttype should be strings",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        var ajax = null;
        ajax = this.getAjax("PUT", url, callback, headers);
        if (contenttype !== undefined) {
            ajax.setRequestHeader("Content-Type", contenttype);
        }
        ajax.send(body);
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.options = function(path, callback, body, contenttype, headers) {
        if ((path === undefined) || (callback === undefined)) {
            throw new nl.sara.webdav.Exception("OPTIONS requires the parameters path and callback",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if ((typeof path !== "string") || ((body !== undefined) && (typeof body !== "string")) || ((contenttype !== undefined) && (typeof contenttype !== "string"))) {
            throw new nl.sara.webdav.Exception("OPTIONS parameter; path, body and contenttype should be strings",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        var ajax = null;
        ajax = this.getAjax("OPTIONS", url, callback, headers);
        if (body !== undefined) {
            if (contenttype !== undefined) {
                ajax.setRequestHeader("Content-Type", contenttype);
            } else {
                ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            ajax.send(body);
        } else {
            ajax.send();
        }
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.post = function(path, callback, body, contenttype, headers) {
        if ((path === undefined) || (callback === undefined)) {
            throw new nl.sara.webdav.Exception("POST requires the parameters path and callback",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if ((typeof path !== "string") || ((body !== undefined) && (typeof body !== "string")) || ((contenttype !== undefined) && (typeof contenttype !== "string"))) {
            throw new nl.sara.webdav.Exception("POST parameter; path, body and contenttype should be strings",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        var ajax = null;
        ajax = this.getAjax("POST", url, callback, headers);
        if (body !== undefined) {
            if (contenttype !== undefined) {
                ajax.setRequestHeader("Content-Type", contenttype);
            } else {
                ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            ajax.send(body);
        } else {
            ajax.send();
        }
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.copy = function(path, callback, destination, overwriteMode, depth, headers) {
        if ((path === undefined) || (callback === undefined) || (destination === undefined)) {
            throw new nl.sara.webdav.Exception("COPY requires the parameters path, callback and destination",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if ((typeof path !== "string") || (typeof destination !== "string")) {
            throw new nl.sara.webdav.Exception("COPY parameter; path and destination should be strings",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        if (destination.substr(0, 1) === "/") {
            destination = this.getUrl(destination);
        }
        var ajax = this.getAjax("COPY", url, callback, headers);
        ajax.setRequestHeader("Destination", destination);
        if (depth !== undefined) {
            if ((depth !== 0) && (depth !== "infinity")) {
                throw new nl.sara.webdav.Exception("COPY parameter; depth should be '0' or 'infinity'",nl.sara.webdav.Exception.WRONG_VALUE);
            }
            ajax.setRequestHeader("Depth", depth);
        }
        if (overwriteMode === nl.sara.webdav.Client.FAIL_ON_OVERWRITE) {
            ajax.setRequestHeader("Overwrite", "F");
        }
        ajax.send();
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.move = function(path, callback, destination, overwriteMode, headers) {
        if ((path === undefined) || (callback === undefined) || (destination === undefined)) {
            throw new nl.sara.webdav.Exception("MOVE requires the parameters path, callback and destination",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if ((typeof path !== "string") || (typeof destination !== "string")) {
            throw new nl.sara.webdav.Exception("MOVE parameter; path and destination should be strings",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        if (destination.substr(0, 1) === "/") {
            destination = this.getUrl(destination);
        }
        var ajax = this.getAjax("MOVE", url, callback, headers);
        ajax.setRequestHeader("Destination", destination);
        if (overwriteMode === nl.sara.webdav.Client.FAIL_ON_OVERWRITE) {
            ajax.setRequestHeader("Overwrite", "F");
        } else {
            if (overwriteMode === nl.sara.webdav.Client.TRUNCATE_ON_OVERWRITE) {
                ajax.setRequestHeader("Overwrite", "T");
            }
        }
        ajax.send();
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.lock = function(path, callback, body, headers) {
        if ((path === undefined) || (callback === undefined)) {
            throw new nl.sara.webdav.Exception("LOCK requires the parameters path and callback",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if ((typeof path !== "string") || (!nl.sara.webdav.Ie.isIE && (body !== undefined) && !(body instanceof Document))) {
            throw new nl.sara.webdav.Exception("LOCK parameter; path should be a string, body should be an instance of Document",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        var serializer = new XMLSerializer();
        var body = '<?xml version="1.0" encoding="utf-8" ?>' + serializer.serializeToString(body);
        var ajax = null;
        ajax = this.getAjax("LOCK", url, callback, headers);
        if (body !== undefined) {
            ajax.setRequestHeader("Content-Type", 'application/xml; charset="utf-8"');
            ajax.send(body);
        } else {
            ajax.send();
        }
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.unlock = function(path, callback, lockToken, headers) {
        if ((path === undefined) || (callback === undefined) || (lockToken === undefined)) {
            throw new nl.sara.webdav.Exception("UNLOCK requires the parameters path, callback and lockToken",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if ((typeof path !== "string") || (typeof lockToken !== "string")) {
            throw new nl.sara.webdav.Exception("UNLOCK parameter; path and lockToken should be strings",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        headers["Lock-Token"] = lockToken;
        var ajax = null;
        ajax = this.getAjax("UNLOCK", url, callback, headers);
        ajax.send();
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.getAjax = function(method, url, callback, headers) {
        var ajax = (((typeof Components !== "undefined") && (typeof Components.classes !== "undefined")) ? Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Components.interfaces.nsIXMLHttpRequest) : new XMLHttpRequest());
        if (this._username !== null) {
            ajax.open(method, url, true, this._username, this._password);
        } else {
            ajax.open(method, url, true);
        }
        ajax.onreadystatechange = function() {
            nl.sara.webdav.Client.ajaxHandler(ajax, callback);
        }
        ;
        if (headers === undefined) {
            headers = {};
        }
        for (var header in this._headers) {
            if (headers[header] === undefined) {
                ajax.setRequestHeader(header, this._headers[header]);
            }
        }
        for (var header in headers) {
            ajax.setRequestHeader(header, headers[header]);
        }
        return ajax;
    }
    ;
    nl.sara.webdav.Client.ajaxHandler = function(ajax, callback) {
        if (ajax.readyState === 4) {
            var body = ajax.responseText;
            if (ajax.status === 207) {
                for (var counter = 0; counter < ajax.responseXML.childNodes.length; counter++) {
                    if (nl.sara.webdav.Ie.getLocalName(ajax.responseXML.childNodes.item(counter)) === "multistatus") {
                        body = new nl.sara.webdav.Multistatus(ajax.responseXML.childNodes.item(counter));
                        break;
                    }
                }
            }
            callback(ajax.status, body, ajax.getAllResponseHeaders());
        }
    }
    ;
    "use strict";
    if (nl.sara.webdav.Codec !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace name nl.sara.webdav.Codec already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.Codec = function(namespace, tagname, toXML, fromXML) {
        Object.defineProperty(this, "namespace", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "tagname", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "toXML", {
            value: undefined,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "fromXML", {
            value: undefined,
            enumerable: true,
            configurable: false,
            writable: true
        });
        if (namespace !== undefined) {
            this.namespace = namespace;
        }
        if (tagname !== undefined) {
            this.tagname = tagname;
        }
        if (toXML !== undefined) {
            this.toXML = toXML;
        }
        if (fromXML !== undefined) {
            this.fromXML = fromXML;
        }
    }
    ;
    "use strict";
    if (nl.sara.webdav.Multistatus !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.Multistatus already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.Multistatus = function(xmlNode) {
        Object.defineProperty(this, "_responses", {
            value: {},
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "responsedescription", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        if (typeof xmlNode !== "undefined") {
            if ((xmlNode.namespaceURI !== "DAV:") || (nl.sara.webdav.Ie.getLocalName(xmlNode) !== "multistatus")) {
                throw new nl.sara.webdav.Exception("Node is not of type DAV:multistatus",nl.sara.webdav.Exception.WRONG_XML);
            }
            var data = xmlNode.childNodes;
            for (var i = 0; i < data.length; i++) {
                var child = data.item(i);
                if ((child.namespaceURI === null) || (child.namespaceURI !== "DAV:")) {
                    continue;
                }
                switch (nl.sara.webdav.Ie.getLocalName(child)) {
                case "responsedescription":
                    this.responsedescription = child.childNodes.item(0).nodeValue;
                    break;
                case "response":
                    var response = new nl.sara.webdav.Response(child);
                    var responseChilds = child.childNodes;
                    var hrefs = [];
                    for (var j = 0; j < responseChilds.length; j++) {
                        var responseChild = responseChilds.item(j);
                        if ((nl.sara.webdav.Ie.getLocalName(responseChild) === "href") && (responseChild.namespaceURI !== null) && (responseChild.namespaceURI === "DAV:")) {
                            hrefs.push(responseChild.childNodes.item(0).nodeValue);
                        }
                    }
                    if (hrefs.length > 1) {
                        for (var k = 0; k < hrefs.length; k++) {
                            var copyResponse = new nl.sara.webdav.Response();
                            copyResponse.href = hrefs[k];
                            copyResponse.status = response.status;
                            copyResponse.error = response.error;
                            copyResponse.responsedescription = response.responsedescription;
                            copyResponse.location = response.location;
                            this.addResponse(copyResponse);
                        }
                    } else {
                        this.addResponse(response);
                    }
                    break;
                }
            }
        }
    }
    ;
    nl.sara.webdav.Multistatus.prototype.addResponse = function(response) {
        if (!nl.sara.webdav.Ie.isIE && !(response instanceof nl.sara.webdav.Response)) {
            throw new nl.sara.webdav.Exception("Response should be instance of Response",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var name = response.href;
        this._responses[name] = response;
        return this;
    }
    ;
    nl.sara.webdav.Multistatus.prototype.getResponse = function(name) {
        return this._responses[name];
    }
    ;
    nl.sara.webdav.Multistatus.prototype.getResponseNames = function() {
        return Object.keys(this._responses);
    }
    ;
    "use strict";
    if (nl.sara.webdav.Property !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace name nl.sara.webdav.Property already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.Property = function(xmlNode, status, responsedescription, errors) {
        Object.defineProperty(this, "_xmlvalue", {
            value: null,
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "_errors", {
            value: [],
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "namespace", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "tagname", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "status", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "responsedescription", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        if ((typeof xmlNode !== "undefined") && (xmlNode.nodeType === 1)) {
            this.namespace = xmlNode.namespaceURI;
            this.tagname = nl.sara.webdav.Ie.getLocalName(xmlNode);
            this.xmlvalue = xmlNode.childNodes;
        }
        if (status !== undefined) {
            this.status = status;
        }
        if (responsedescription !== undefined) {
            this.responsedescription = responsedescription;
        }
        if (errors instanceof Array) {
            for (var i = 0; i < errors.length; i++) {
                this.addError(errors[i]);
            }
        }
    }
    ;
    (function() {
        var codecNamespaces = {};
        Object.defineProperty(nl.sara.webdav.Property.prototype, "xmlvalue", {
            set: function(value) {
                if (value === null) {
                    this._xmlvalue = null;
                    return;
                }
                if (!nl.sara.webdav.Ie.isIE && !(value instanceof NodeList)) {
                    throw new nl.sara.webdav.Exception("xmlvalue must be an instance of NodeList",nl.sara.webdav.Exception.WRONG_TYPE);
                }
                this._xmlvalue = value;
            },
            get: function() {
                return this._xmlvalue;
            }
        });
        nl.sara.webdav.Property.addCodec = function(codec) {
            if (typeof codec.namespace !== "string") {
                throw new nl.sara.webdav.Exception("addCodec: codec.namespace must be a String",nl.sara.webdav.Exception.WRONG_TYPE);
            }
            if (typeof codec.tagname !== "string") {
                throw new nl.sara.webdav.Exception("addCodec: codec.tagname must be a String",nl.sara.webdav.Exception.WRONG_TYPE);
            }
            if (codecNamespaces[codec.namespace] === undefined) {
                codecNamespaces[codec.namespace] = {};
            }
            codecNamespaces[codec.namespace][codec.tagname] = {
                fromXML: (codec.fromXML ? codec.fromXML : undefined),
                toXML: (codec.toXML ? codec.toXML : undefined)
            };
        }
        ;
        nl.sara.webdav.Property.prototype.setValueAndRebuildXml = function(value) {
            var xmlDoc = document.implementation.createDocument(this.namespace, this.tagname, null);
            if ((codecNamespaces[this.namespace] === undefined) || (codecNamespaces[this.namespace][this.tagname] === undefined) || (codecNamespaces[this.namespace][this.tagname]["toXML"] === undefined)) {
                if (value !== null) {
                    var cdata = xmlDoc.createCDATASection(value);
                    xmlDoc.documentElement.appendChild(cdata);
                }
                this._xmlvalue = xmlDoc.documentElement.childNodes;
            } else {
                this._xmlvalue = codecNamespaces[this.namespace][this.tagname]["toXML"](value, xmlDoc).documentElement.childNodes;
            }
        }
        ;
        nl.sara.webdav.Property.prototype.getParsedValue = function() {
            if (this._xmlvalue.length > 0) {
                if ((codecNamespaces[this.namespace] === undefined) || (codecNamespaces[this.namespace][this.tagname] === undefined) || (codecNamespaces[this.namespace][this.tagname]["fromXML"] === undefined)) {
                    var parsedValue = "";
                    for (var i = 0; i < this._xmlvalue.length; i++) {
                        var node = this._xmlvalue.item(i);
                        if ((node.nodeType === 3) || (node.nodeType === 4)) {
                            parsedValue += node.nodeValue;
                        } else {
                            parsedValue = undefined;
                            break;
                        }
                    }
                    return parsedValue;
                } else {
                    return codecNamespaces[this.namespace][this.tagname]["fromXML"](this._xmlvalue);
                }
            }
            return null;
        }
        ;
    }
    )();
    nl.sara.webdav.Property.prototype.addError = function(error) {
        if (!nl.sara.webdav.Ie.isIE && !(error instanceof Node)) {
            throw new nl.sara.webdav.Exception("Error must be an instance of Node",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        this._errors.push(error);
        return this;
    }
    ;
    nl.sara.webdav.Property.prototype.getErrors = function() {
        return this._errors;
    }
    ;
    nl.sara.webdav.Property.prototype.toString = function() {
        return this.getParsedValue();
    }
    ;
    "use strict";
    if (nl.sara.webdav.Response !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.Response already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.Response = function(xmlNode) {
        Object.defineProperty(this, "_namespaces", {
            value: {},
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "href", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "status", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "error", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "responsedescription", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "location", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        if (typeof xmlNode !== "undefined") {
            if ((xmlNode.namespaceURI !== "DAV:") || (nl.sara.webdav.Ie.getLocalName(xmlNode) !== "response")) {
                throw new nl.sara.webdav.Exception("Node is not of type DAV:response",nl.sara.webdav.Exception.WRONG_XML);
            }
            var data = xmlNode.childNodes;
            for (var i = 0; i < data.length; i++) {
                var child = data.item(i);
                if ((child.namespaceURI === null) || (child.namespaceURI !== "DAV:")) {
                    continue;
                }
                switch (nl.sara.webdav.Ie.getLocalName(child)) {
                case "href":
                case "status":
                case "error":
                case "responsedescription":
                    this[nl.sara.webdav.Ie.getLocalName(child)] = child.childNodes.item(0).nodeValue;
                    break;
                case "location":
                    this[nl.sara.webdav.Ie.getLocalName(child)] = child.childNodes.item(0).childNodes.item(0).nodeValue;
                    break;
                case "propstat":
                    var propstatChilds = child.childNodes;
                    var status = null;
                    var errors = [];
                    var responsedescription = null;
                    var props = [];
                    for (var j = 0; j < propstatChilds.length; j++) {
                        var propstatChild = propstatChilds.item(j);
                        if ((propstatChild.nodeType !== 1) || (propstatChild.namespaceURI !== "DAV:")) {
                            continue;
                        }
                        switch (nl.sara.webdav.Ie.getLocalName(propstatChild)) {
                        case "prop":
                            for (var k = 0; k < propstatChild.childNodes.length; k++) {
                                props.push(propstatChild.childNodes.item(k));
                            }
                            break;
                        case "error":
                            for (k = 0; k < propstatChild.childNodes.length; k++) {
                                errors.push(propstatChild.childNodes.item(k));
                            }
                            break;
                            break;
                        case "status":
                            status = propstatChild.childNodes.item(0).nodeValue;
                            status = parseInt(status.substr(status.indexOf(" ") + 1, 3));
                            break;
                        case "responsedescription":
                            responsedescription = propstatChild.childNodes.item(0).nodeValue;
                            break;
                        }
                    }
                    for (j = 0; j < props.length; j++) {
                        if (props[j].nodeType === 1) {
                            var property = new nl.sara.webdav.Property(props[j],status,responsedescription,errors);
                            this.addProperty(property);
                        }
                    }
                    break;
                }
            }
        }
    }
    ;
    nl.sara.webdav.Response.prototype.addProperty = function(property) {
        if (!nl.sara.webdav.Ie.isIE && !(property instanceof nl.sara.webdav.Property)) {
            throw new nl.sara.webdav.Exception("Response property should be instance of Property",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var namespace = property.namespace;
        if (typeof namespace !== "string") {
            namespace = "";
        }
        if (this._namespaces[namespace] === undefined) {
            this._namespaces[namespace] = {};
        }
        this._namespaces[namespace][property.tagname] = property;
        return this;
    }
    ;
    nl.sara.webdav.Response.prototype.getProperty = function(namespace, prop) {
        if ((this._namespaces[namespace] === undefined) || (this._namespaces[namespace][prop] === undefined)) {
            return undefined;
        }
        return this._namespaces[namespace][prop];
    }
    ;
    nl.sara.webdav.Response.prototype.getNamespaceNames = function() {
        return Object.keys(this._namespaces);
    }
    ;
    nl.sara.webdav.Response.prototype.getPropertyNames = function(namespace) {
        if (this._namespaces[namespace] === undefined) {
            return new Array();
        }
        return Object.keys(this._namespaces[namespace]);
    }
    ;
    "use strict";
    if (nl.sara.webdav.codec.Principal_collection_setCodec !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.codec.Principal_collection_setCodec already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.codec.Principal_collection_setCodec = new nl.sara.webdav.Codec();
    nl.sara.webdav.codec.Principal_collection_setCodec.namespace = "DAV:";
    nl.sara.webdav.codec.Principal_collection_setCodec.tagname = "principal-collection-set";
    nl.sara.webdav.codec.Principal_collection_setCodec.fromXML = function(nodelist) {
        var collections = [];
        for (var key = 0; key < nodelist.length; key++) {
            var node = nodelist.item(key);
            if ((node.nodeType === 1) && (node.localName === "href") && (node.namespaceURI === "DAV:")) {
                var href = "";
                for (var subkey = 0; subkey < node.childNodes.length; subkey++) {
                    var childNode = node.childNodes.item(subkey);
                    if ((childNode.nodeType === 3) || (childNode.nodeType === 4)) {
                        href += childNode.nodeValue;
                    }
                }
                collections.push(href);
            }
        }
        return collections;
    }
    ;
    nl.sara.webdav.codec.Principal_collection_setCodec.toXML = function(value, xmlDoc) {
        for (var key in value) {
            var href = xmlDoc.createElementNS("DAV:", "href");
            href.appendChild(xmlDoc.createCDATASection(value[key]));
            xmlDoc.documentElement.appendChild(href);
        }
        return xmlDoc;
    }
    ;
    nl.sara.webdav.Property.addCodec(nl.sara.webdav.codec.Principal_collection_setCodec);
    "use strict";
    if (nl.sara.webdav.codec.Inherited_acl_setCodec !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.codec.Inherited_acl_setCodec already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.codec.Inherited_acl_setCodec = new nl.sara.webdav.Codec();
    nl.sara.webdav.codec.Inherited_acl_setCodec.namespace = "DAV:";
    nl.sara.webdav.codec.Inherited_acl_setCodec.tagname = "inherited-acl-set";
    nl.sara.webdav.codec.Inherited_acl_setCodec.fromXML = nl.sara.webdav.codec.Principal_collection_setCodec.fromXML;
    nl.sara.webdav.codec.Inherited_acl_setCodec.toXML = nl.sara.webdav.codec.Principal_collection_setCodec.toXML;
    nl.sara.webdav.Property.addCodec(nl.sara.webdav.codec.Inherited_acl_setCodec);
    "use strict";
    if (nl.sara.webdav.Ace !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.Ace already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.Ace = function(xmlNode) {
        Object.defineProperty(this, "_namespaces", {
            value: {},
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "_principal", {
            value: null,
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "_invertprincipal", {
            value: false,
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "_grantdeny", {
            value: null,
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "_isprotected", {
            value: false,
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "_inherited", {
            value: false,
            enumerable: false,
            configurable: false,
            writable: true
        });
        function parsePrincipal(object, child) {
            if (!nl.sara.webdav.Ie.isIE && !(child instanceof Node)) {
                throw new nl.sara.webdav.Exception("Principal XML node not recognized!",nl.sara.webdav.Exception.WRONG_XML);
            }
            for (var j = 0; j < child.childNodes.length; j++) {
                var principal = child.childNodes.item(j);
                if ((principal.nodeType !== 1) || (principal.namespaceURI === null) || (principal.namespaceURI !== "DAV:")) {
                    continue;
                }
                switch (nl.sara.webdav.Ie.getLocalName(principal)) {
                case "href":
                    object.principal = principal.childNodes.item(0).nodeValue;
                    break;
                case "all":
                    object.principal = nl.sara.webdav.Ace.ALL;
                    break;
                case "authenticated":
                    object.principal = nl.sara.webdav.Ace.AUTHENTICATED;
                    break;
                case "unauthenticated":
                    object.principal = nl.sara.webdav.Ace.UNAUTHENTICATED;
                    break;
                case "property":
                    for (var k = 0; k < principal.childNodes.length; k++) {
                        var element = principal.childNodes.item(k);
                        if (element.nodeType !== 1) {
                            continue;
                        }
                        var prop = new nl.sara.webdav.Property(element);
                        object.principal = prop;
                        break;
                    }
                    break;
                case "self":
                    object.principal = nl.sara.webdav.Ace.SELF;
                    break;
                default:
                    throw new nl.sara.webdav.Exception("Principal XML Node contains illegal child node: " + nl.sara.webdav.Ie.getLocalName(principal),nl.sara.webdav.Exception.WRONG_XML);
                    break;
                }
            }
        }
        function parsePrivileges(object, privilegeList) {
            for (var i = 0; i < privilegeList.length; i++) {
                var privilege = privilegeList.item(i);
                if ((privilege.nodeType === 1) && (privilege.namespaceURI === "DAV:") && (nl.sara.webdav.Ie.getLocalName(privilege) === "privilege")) {
                    object.addPrivilege(new nl.sara.webdav.Privilege(privilege.childNodes[0]));
                }
            }
        }
        if (typeof xmlNode !== "undefined") {
            if ((xmlNode.namespaceURI !== "DAV:") || (nl.sara.webdav.Ie.getLocalName(xmlNode) !== "ace")) {
                throw new nl.sara.webdav.Exception("Node is not of type DAV:ace",nl.sara.webdav.Exception.WRONG_XML);
            }
            var data = xmlNode.childNodes;
            for (var i = 0; i < data.length; i++) {
                var child = data.item(i);
                if ((child.namespaceURI === null) || (child.namespaceURI !== "DAV:")) {
                    continue;
                }
                switch (nl.sara.webdav.Ie.getLocalName(child)) {
                case "principal":
                    this.invertprincipal = false;
                    parsePrincipal(this, child);
                    break;
                case "invert":
                    this.invertprincipal = true;
                    for (var j = 0; j < child.childNodes.length; j++) {
                        var element = child.childNodes.item(j);
                        if ((element.namespaceURI !== "DAV:") || (nl.sara.webdav.Ie.getLocalName(element) !== "principal")) {
                            continue;
                        }
                        parsePrincipal(this, element);
                    }
                    break;
                case "grant":
                    this.grantdeny = nl.sara.webdav.Ace.GRANT;
                    parsePrivileges(this, child.childNodes);
                    break;
                case "deny":
                    this.grantdeny = nl.sara.webdav.Ace.DENY;
                    parsePrivileges(this, child.childNodes);
                    break;
                case "protected":
                    this.isprotected = true;
                    break;
                case "inherited":
                    for (var j = 0; j < child.childNodes.length; j++) {
                        var element = child.childNodes.item(j);
                        if ((element.namespaceURI !== "DAV:") || (nl.sara.webdav.Ie.getLocalName(element) !== "href")) {
                            continue;
                        }
                        this.inherited = child.childNodes.item(j).childNodes.item(0).nodeValue;
                    }
                    break;
                }
            }
        }
    }
    ;
    nl.sara.webdav.Ace.GRANT = 1;
    nl.sara.webdav.Ace.DENY = 2;
    nl.sara.webdav.Ace.ALL = 3;
    nl.sara.webdav.Ace.AUTHENTICATED = 4;
    nl.sara.webdav.Ace.UNAUTHENTICATED = 5;
    nl.sara.webdav.Ace.SELF = 6;
    Object.defineProperty(nl.sara.webdav.Ace.prototype, "principal", {
        set: function(value) {
            switch (value) {
            case nl.sara.webdav.Ace.ALL:
            case nl.sara.webdav.Ace.AUTHENTICATED:
            case nl.sara.webdav.Ace.UNAUTHENTICATED:
            case nl.sara.webdav.Ace.SELF:
                break;
            default:
                if (!nl.sara.webdav.Ie.isIE && !(value instanceof nl.sara.webdav.Property)) {
                    value = String(value);
                }
                break;
            }
            this._principal = value;
        },
        get: function() {
            return this._principal;
        }
    });
    Object.defineProperty(nl.sara.webdav.Ace.prototype, "invertprincipal", {
        set: function(value) {
            this._invertprincipal = Boolean(value);
        },
        get: function() {
            return this._invertprincipal;
        }
    });
    Object.defineProperty(nl.sara.webdav.Ace.prototype, "isprotected", {
        set: function(value) {
            this._isprotected = Boolean(value);
        },
        get: function() {
            return this._isprotected;
        }
    });
    Object.defineProperty(nl.sara.webdav.Ace.prototype, "grantdeny", {
        set: function(value) {
            if ((value !== nl.sara.webdav.Ace.GRANT) && (value !== nl.sara.webdav.Ace.DENY)) {
                throw new nl.sara.webdav.Exception("grantdeny must be either nl.sara.webdav.Ace.GRANT or nl.sara.webdav.Ace.DENY",nl.sara.webdav.Exception.WRONG_VALUE);
            }
            this._grantdeny = value;
        },
        get: function() {
            return this._grantdeny;
        }
    });
    Object.defineProperty(nl.sara.webdav.Ace.prototype, "inherited", {
        set: function(value) {
            if (Boolean(value)) {
                this._inherited = String(value);
            } else {
                this._inherited = false;
            }
        },
        get: function() {
            return this._inherited;
        }
    });
    nl.sara.webdav.Ace.prototype.addPrivilege = function(privilege) {
        if (!nl.sara.webdav.Ie.isIE && !(privilege instanceof nl.sara.webdav.Privilege)) {
            throw new nl.sara.webdav.Exception("Privilege should be instance of Privilege",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var namespace = privilege.namespace;
        if (namespace) {
            if (this._namespaces[namespace] === undefined) {
                this._namespaces[namespace] = {};
            }
        } else {
            throw new nl.sara.webdav.Exception("Privilege should have a namespace",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        this._namespaces[namespace][privilege.tagname] = privilege;
        return this;
    }
    ;
    nl.sara.webdav.Ace.prototype.getPrivilege = function(namespace, privilege) {
        if ((this._namespaces[namespace] === undefined) || (this._namespaces[namespace][privilege] === undefined)) {
            return undefined;
        }
        return this._namespaces[namespace][privilege];
    }
    ;
    nl.sara.webdav.Ace.prototype.getNamespaceNames = function() {
        return Object.keys(this._namespaces);
    }
    ;
    nl.sara.webdav.Ace.prototype.getPrivilegeNames = function(namespace) {
        if (this._namespaces[namespace] === undefined) {
            return new Array();
        }
        return Object.keys(this._namespaces[namespace]);
    }
    ;
    "use strict";
    if (nl.sara.webdav.Acl !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.Acl already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.Acl = function(xmlNode) {
        Object.defineProperty(this, "_aces", {
            value: [],
            enumerable: false,
            configurable: false,
            writable: true
        });
        if (typeof xmlNode !== "undefined") {
            if ((xmlNode.namespaceURI !== "DAV:") || (nl.sara.webdav.Ie.getLocalName(xmlNode) !== "acl")) {
                throw new nl.sara.webdav.Exception("Node is not of type DAV:acl",nl.sara.webdav.Exception.WRONG_XML);
            }
            for (var i = 0; i < xmlNode.childNodes.length; i++) {
                var child = xmlNode.childNodes.item(i);
                if ((child.namespaceURI === null) || (child.namespaceURI !== "DAV:") || (nl.sara.webdav.Ie.getLocalName(child) !== "ace")) {
                    continue;
                }
                this.addAce(new nl.sara.webdav.Ace(child));
            }
        }
    }
    ;
    nl.sara.webdav.Acl.prototype.addAce = function(ace, position) {
        if (!nl.sara.webdav.Ie.isIE && !(ace instanceof nl.sara.webdav.Ace)) {
            throw new nl.sara.webdav.Exception("Ace should be instance of Ace",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        if ((position === undefined) || (position > (this._aces.length - 1))) {
            this._aces.push(ace);
        } else {
            position = Number(position);
            if (position < 1) {
                this._aces.unshift(ace);
            } else {
                this._aces.splice(position, 0, ace);
            }
        }
        return this;
    }
    ;
    nl.sara.webdav.Acl.prototype.getAces = function() {
        return this._aces;
    }
    ;
    nl.sara.webdav.Acl.prototype.getAce = function(position) {
        position = Number(position);
        if ((position < 0) || (position >= this.getLength())) {
            throw new nl.sara.webdav.Exception("No ACE found on position " + position,nl.sara.webdav.Exception.UNEXISTING_PROPERTY);
        }
        return this._aces[position];
    }
    ;
    nl.sara.webdav.Acl.prototype.getLength = function() {
        return this._aces.length;
    }
    ;
    "use strict";
    if (nl.sara.webdav.codec.AclCodec !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.codec.AclCodec already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.codec.AclCodec = new nl.sara.webdav.Codec();
    nl.sara.webdav.codec.AclCodec.namespace = "DAV:";
    nl.sara.webdav.codec.AclCodec.tagname = "acl";
    nl.sara.webdav.codec.AclCodec.fromXML = function(nodelist) {
        var xmlDoc = document.implementation.createDocument("DAV:", "acl", null);
        var acl = xmlDoc.documentElement;
        for (var i = 0; i < nodelist.length; i++) {
            acl.appendChild(xmlDoc.importNode(nodelist.item(i), true));
        }
        return new nl.sara.webdav.Acl(acl);
    }
    ;
    nl.sara.webdav.codec.AclCodec.toXML = function(acl, xmlDoc) {
        var aclLength = acl.getLength();
        for (var i = 0; i < aclLength; i++) {
            var ace = acl.getAce(i);
            var aceBody = xmlDoc.createElementNS("DAV:", "ace");
            var principal = xmlDoc.createElementNS("DAV:", "principal");
            var princVal = ace.principal;
            switch (princVal) {
            case nl.sara.webdav.Ace.ALL:
                principal.appendChild(xmlDoc.createElementNS("DAV:", "all"));
                break;
            case nl.sara.webdav.Ace.AUTHENTICATED:
                principal.appendChild(xmlDoc.createElementNS("DAV:", "authenticated"));
                break;
            case nl.sara.webdav.Ace.UNAUTHENTICATED:
                principal.appendChild(xmlDoc.createElementNS("DAV:", "unauthenticated"));
                break;
            case nl.sara.webdav.Ace.SELF:
                principal.appendChild(xmlDoc.createElementNS("DAV:", "self"));
                break;
            default:
                if (typeof princVal === "string") {
                    var href = xmlDoc.createElementNS("DAV:", "href");
                    href.appendChild(xmlDoc.createCDATASection(princVal));
                    principal.appendChild(href);
                } else {
                    var property = xmlDoc.createElementNS("DAV:", "property");
                    var prop = xmlDoc.createElementNS(princVal.namespace, princVal.tagname);
                    if (princVal.xmlvalue !== null) {
                        for (var j = 0; j < princVal.xmlvalue.length; j++) {
                            var nodeCopy = xmlDoc.importNode(princVal.xmlValue.item(j), true);
                            prop.appendChild(nodeCopy);
                        }
                    }
                    property.appendChild(prop);
                    principal.appendChild(property);
                }
                break;
            }
            if (ace.invertprincipal) {
                var invert = xmlDoc.createElementNS("DAV:", "invert");
                invert.appendChild(principal);
                aceBody.appendChild(invert);
            } else {
                aceBody.appendChild(principal);
            }
            var privilegeParent = null;
            if (ace.grantdeny === nl.sara.webdav.Ace.DENY) {
                privilegeParent = xmlDoc.createElementNS("DAV:", "deny");
            } else {
                if (ace.grantdeny === nl.sara.webdav.Ace.GRANT) {
                    privilegeParent = xmlDoc.createElementNS("DAV:", "grant");
                } else {
                    throw new nl.sara.webdav.Exception("'grantdeny' property not set on one of the ACE's in this ACL",nl.sara.webdav.Exception.WRONG_VALUE);
                }
            }
            var namespaces = ace.getNamespaceNames();
            for (j = 0; j < namespaces.length; j++) {
                var namespace = namespaces[j];
                var privileges = ace.getPrivilegeNames(namespace);
                for (var k = 0; k < privileges.length; k++) {
                    var privilege = ace.getPrivilege(namespace, privileges[k]);
                    var privilegeElement = xmlDoc.createElementNS("DAV:", "privilege");
                    var priv = xmlDoc.createElementNS(privilege.namespace, privilege.tagname);
                    if (privilege.xmlvalue !== null) {
                        for (var l = 0; l < privilege.xmlvalue.length; l++) {
                            var nodeCopy = xmlDoc.importNode(privilege.xmlValue.item(j), true);
                            priv.appendChild(nodeCopy);
                        }
                    }
                    privilegeElement.appendChild(priv);
                    privilegeParent.appendChild(privilegeElement);
                }
            }
            aceBody.appendChild(privilegeParent);
            xmlDoc.documentElement.appendChild(aceBody);
        }
        return xmlDoc;
    }
    ;
    nl.sara.webdav.Property.addCodec(nl.sara.webdav.codec.AclCodec);
    "use strict";
    nl.sara.webdav.Client.prototype.acl = function(path, callback, acl, headers) {
        if ((path === undefined) || (callback === undefined)) {
            throw new nl.sara.webdav.Exception("ACL requires the parameters path, callback and acl",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if (!(typeof path === "string") || (!nl.sara.webdav.Ie.isIE && !(acl instanceof nl.sara.webdav.Acl))) {
            throw new nl.sara.webdav.Exception("ACL parameter; path should be a string, acl should be an instance of Acl",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        var aclBody = document.implementation.createDocument("DAV:", "acl", null);
        aclBody = nl.sara.webdav.codec.AclCodec.toXML(acl, aclBody);
        var serializer = new XMLSerializer();
        var body = '<?xml version="1.0" encoding="utf-8" ?>' + serializer.serializeToString(aclBody);
        var ajax = null;
        if (nl.sara.webdav.Ie.isIE) {
            if (url.lastIndexOf("?") !== -1) {
                url = url + "&_method=acl";
            } else {
                url = url + "?_method=acl";
            }
            ajax = this.getAjax("POST", url, callback, headers);
        } else {
            ajax = this.getAjax("ACL", url, callback, headers);
        }
        ajax.setRequestHeader("Content-Type", 'application/xml; charset="utf-8"');
        ajax.send(body);
        return this;
    }
    ;
    nl.sara.webdav.Client.prototype.report = function(path, callback, body, headers) {
        if ((path === undefined) || (callback === undefined) || (body === undefined)) {
            throw new nl.sara.webdav.Exception("REPORT requires the parameters path, callback and body",nl.sara.webdav.Exception.MISSING_REQUIRED_PARAMETER);
        }
        if ((typeof path !== "string") || (!nl.sara.webdav.Ie.isIE && !(body instanceof Document))) {
            throw new nl.sara.webdav.Exception("REPORT parameter; path should be a string, body should be an instance of Document",nl.sara.webdav.Exception.WRONG_TYPE);
        }
        var url = this.getUrl(path);
        var serializer = new XMLSerializer();
        var body = '<?xml version="1.0" encoding="utf-8" ?>' + serializer.serializeToString(body);
        var ajax = null;
        if (nl.sara.webdav.Ie.isIE) {
            if (url.lastIndexOf("?") !== -1) {
                url = url + "&_method=report";
            } else {
                url = url + "?_method=report";
            }
            ajax = this.getAjax("POST", url, callback, headers);
        } else {
            ajax = this.getAjax("REPORT", url, callback, headers);
        }
        ajax.setRequestHeader("Content-Type", 'application/xml; charset="utf-8"');
        ajax.send(body);
        return this;
    }
    ;
    "use strict";
    if (nl.sara.webdav.codec.Current_user_privilege_setCodec !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.codec.Current_user_privilege_setCodec already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.codec.Current_user_privilege_setCodec = new nl.sara.webdav.Codec();
    nl.sara.webdav.codec.Current_user_privilege_setCodec.namespace = "DAV:";
    nl.sara.webdav.codec.Current_user_privilege_setCodec.tagname = "current-user-privilege-set";
    nl.sara.webdav.codec.Current_user_privilege_setCodec.fromXML = function(nodelist) {
        var privileges = [];
        for (var key = 0; key < nodelist.length; key++) {
            var node = nodelist.item(key);
            if ((node.nodeType === 1)) {
                var privilege = new nl.sara.webdav.Privilege(node);
                privileges.push(privilege);
            }
        }
        return privileges;
    }
    ;
    nl.sara.webdav.codec.Current_user_privilege_setCodec.toXML = function(value, xmlDoc) {
        for (var key in value) {
            var privilege = xmlDoc.createElementNS(value[key].namespace, value[key].tagname);
            xmlDoc.documentElement.appendChild(privilege);
        }
        return xmlDoc;
    }
    ;
    nl.sara.webdav.Property.addCodec(nl.sara.webdav.codec.Current_user_privilege_setCodec);
    "use strict";
    if (nl.sara.webdav.Privilege !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.Privilege already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.Privilege = function(xmlNode) {
        Object.defineProperty(this, "_xmlvalue", {
            value: null,
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "namespace", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, "tagname", {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        if (typeof xmlNode !== "undefined") {
            this.namespace = xmlNode.namespaceURI;
            this.tagname = nl.sara.webdav.Ie.getLocalName(xmlNode);
            this.xmlvalue = xmlNode.childNodes;
        }
    }
    ;
    (function() {
        var codecNamespaces = {};
        Object.defineProperty(nl.sara.webdav.Privilege.prototype, "xmlvalue", {
            set: function(value) {
                if (value === null) {
                    this._xmlvalue = null;
                    return;
                }
                if (!nl.sara.webdav.Ie.isIE && !(value instanceof NodeList)) {
                    throw new nl.sara.webdav.Exception("xmlvalue must be an instance of NodeList",nl.sara.webdav.Exception.WRONG_TYPE);
                }
                this._xmlvalue = value;
            },
            get: function() {
                return this._xmlvalue;
            }
        });
        nl.sara.webdav.Privilege.addCodec = function(codec) {
            if (typeof codec.namespace !== "string") {
                throw new nl.sara.webdav.Exception("addCodec: codec.namespace must be a String",nl.sara.webdav.Exception.WRONG_TYPE);
            }
            if (typeof codec.tagname !== "string") {
                throw new nl.sara.webdav.Exception("addCodec: codec.tagname must be a String",nl.sara.webdav.Exception.WRONG_TYPE);
            }
            if (codecNamespaces[codec.namespace] === undefined) {
                codecNamespaces[codec.namespace] = {};
            }
            codecNamespaces[codec.namespace][codec.tagname] = {
                fromXML: (codec.fromXML ? codec.fromXML : undefined),
                toXML: (codec.toXML ? codec.toXML : undefined)
            };
        }
        ;
        nl.sara.webdav.Privilege.prototype.setValueAndRebuildXml = function(value) {
            var xmlDoc = document.implementation.createDocument(this.namespace, this.tagname, null);
            if ((codecNamespaces[this.namespace] === undefined) || (codecNamespaces[this.namespace][this.tagname] === undefined) || (codecNamespaces[this.namespace][this.tagname]["toXML"] === undefined)) {
                if (value !== null) {
                    var cdata = xmlDoc.createCDATASection(value);
                    xmlDoc.documentElement.appendChild(cdata);
                }
                this._xmlvalue = xmlDoc.documentElement.childNodes;
            } else {
                this._xmlvalue = codecNamespaces[this.namespace][this.tagname]["toXML"](value, xmlDoc).documentElement.childNodes;
            }
        }
        ;
        nl.sara.webdav.Privilege.prototype.getParsedValue = function() {
            if (this._xmlvalue.length > 0) {
                if ((codecNamespaces[this.namespace] === undefined) || (codecNamespaces[this.namespace][this.tagname] === undefined) || (codecNamespaces[this.namespace][this.tagname]["fromXML"] === undefined)) {
                    var parsedValue = "";
                    for (var i = 0; i < this._xmlvalue.length; i++) {
                        var node = this._xmlvalue.item(i);
                        if ((node.nodeType === 3) || (node.nodeType === 4)) {
                            parsedValue += node.nodeValue;
                        } else {
                            parsedValue = undefined;
                            break;
                        }
                    }
                    return parsedValue;
                } else {
                    return codecNamespaces[this.namespace][this.tagname]["fromXML"](this._xmlvalue);
                }
            }
            return null;
        }
        ;
    }
    )();
    nl.sara.webdav.Privilege.prototype.toString = function() {
        return this.getParsedValue();
    }
    ;
    "use strict";
    if (nl.sara.webdav.codec.CreationdateCodec !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.codec.CreationdateCodec already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.codec.CreationdateCodec = new nl.sara.webdav.Codec();
    nl.sara.webdav.codec.CreationdateCodec.namespace = "DAV:";
    nl.sara.webdav.codec.CreationdateCodec.tagname = "creationdate";
    nl.sara.webdav.codec.CreationdateCodec.fromXML = function(nodelist) {
        var node = nodelist.item(0);
        if ((node.nodeType === 3) || (node.nodeType === 4)) {
            return new Date(node.nodeValue);
        } else {
            return null;
        }
    }
    ;
    nl.sara.webdav.codec.CreationdateCodec.toXML = function(value, xmlDoc) {
        var cdata = xmlDoc.createCDATASection(value.toISOString());
        xmlDoc.documentElement.appendChild(cdata);
        return xmlDoc;
    }
    ;
    nl.sara.webdav.Property.addCodec(nl.sara.webdav.codec.CreationdateCodec);
    "use strict";
    if (nl.sara.webdav.codec.GetcontentlengthCodec !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.codec.GetcontentlengthCodec already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.codec.GetcontentlengthCodec = new nl.sara.webdav.Codec();
    nl.sara.webdav.codec.GetcontentlengthCodec.namespace = "DAV:";
    nl.sara.webdav.codec.GetcontentlengthCodec.tagname = "getcontentlength";
    nl.sara.webdav.codec.GetcontentlengthCodec.fromXML = function(nodelist) {
        var node = nodelist.item(0);
        if ((node.nodeType === 3) || (node.nodeType === 4)) {
            return parseInt(node.nodeValue);
        } else {
            return null;
        }
    }
    ;
    nl.sara.webdav.codec.GetcontentlengthCodec.toXML = function(value, xmlDoc) {
        var cdata = xmlDoc.createCDATASection(value.toString());
        xmlDoc.documentElement.appendChild(cdata);
        return xmlDoc;
    }
    ;
    nl.sara.webdav.Property.addCodec(nl.sara.webdav.codec.GetcontentlengthCodec);
    "use strict";
    if (nl.sara.webdav.codec.GetlastmodifiedCodec !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.codec.GetlastmodifiedCodec already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.codec.GetlastmodifiedCodec = new nl.sara.webdav.Codec();
    nl.sara.webdav.codec.GetlastmodifiedCodec.namespace = "DAV:";
    nl.sara.webdav.codec.GetlastmodifiedCodec.tagname = "getlastmodified";
    nl.sara.webdav.codec.GetlastmodifiedCodec.fromXML = function(nodelist) {
        var node = nodelist.item(0);
        if ((node.nodeType === 3) || (node.nodeType === 4)) {
            return new Date(node.nodeValue);
        } else {
            return null;
        }
    }
    ;
    nl.sara.webdav.codec.GetlastmodifiedCodec.toXML = function(value, xmlDoc) {
        function pad(text) {
            text = text.toString();
            while (text.length < 2) {
                text = "0" + text;
            }
            return text;
        }
        var wkday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var date1 = pad(value.getUTCDate()) + " " + month[value.getUTCMonth()] + " " + value.getUTCFullYear();
        var time = pad(value.getUTCHours()) + ":" + pad(value.getUTCMinutes()) + ":" + pad(value.getUTCSeconds());
        var cdata = xmlDoc.createCDATASection(wkday[value.getUTCDay()] + ", " + date1 + " " + time + " GMT");
        xmlDoc.documentElement.appendChild(cdata);
        return xmlDoc;
    }
    ;
    nl.sara.webdav.Property.addCodec(nl.sara.webdav.codec.GetlastmodifiedCodec);
    "use strict";
    if (nl.sara.webdav.codec.OwnerCodec !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.codec.OwnerCodec already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.codec.OwnerCodec = new nl.sara.webdav.Codec();
    nl.sara.webdav.codec.OwnerCodec.namespace = "DAV:";
    nl.sara.webdav.codec.OwnerCodec.tagname = "owner";
    nl.sara.webdav.codec.OwnerCodec.fromXML = function(nodelist) {
        var returnValue = null;
        var hrefNode = nodelist[0];
        if ((hrefNode.nodeType === 1) && (hrefNode.namespaceURI === "DAV:") && (hrefNode.localName === "href")) {
            var node = hrefNode.childNodes.item(0);
            if ((node.nodeType === 3) || (node.nodeType === 4)) {
                returnValue = node.nodeValue;
            }
        }
        return returnValue;
    }
    ;
    nl.sara.webdav.codec.OwnerCodec.toXML = function(value, xmlDoc) {
        var hrefNode = xmlDoc.createElementNS("DAV:", "href");
        hrefNode.appendChild(xmlDoc.createCDATASection(value.toString()));
        xmlDoc.documentElement.appendChild(hrefNode);
        return xmlDoc;
    }
    ;
    nl.sara.webdav.Property.addCodec(nl.sara.webdav.codec.OwnerCodec);
    "use strict";
    if (nl.sara.webdav.codec === undefined) {
        nl.sara.webdav.codec = {};
    }
    if (nl.sara.webdav.codec.ResourcetypeCodec !== undefined) {
        throw new nl.sara.webdav.Exception("Namespace nl.sara.webdav.codec.ResourcetypeCodec already taken, could not load JavaScript library for WebDAV connectivity.",nl.sara.webdav.Exception.NAMESPACE_TAKEN);
    }
    nl.sara.webdav.codec.ResourcetypeCodec = new nl.sara.webdav.Codec();
    nl.sara.webdav.codec.ResourcetypeCodec.namespace = "DAV:";
    nl.sara.webdav.codec.ResourcetypeCodec.tagname = "resourcetype";
    nl.sara.webdav.codec.ResourcetypeCodec.COLLECTION = 1;
    nl.sara.webdav.codec.ResourcetypeCodec.UNSPECIFIED = 2;
    nl.sara.webdav.codec.ResourcetypeCodec.PRINCIPAL = 4;
    nl.sara.webdav.codec.ResourcetypeCodec.fromXML = function(nodelist) {
        for (var i = 0; i < nodelist.length; i++) {
            var node = nodelist.item(i);
            if (node.namespaceURI === "DAV:") {
                switch (nl.sara.webdav.Ie.getLocalName(node)) {
                case "collection":
                    return nl.sara.webdav.codec.ResourcetypeCodec.COLLECTION;
                case "principal":
                    return nl.sara.webdav.codec.ResourcetypeCodec.PRINCIPAL;
                }
            }
        }
        return nl.sara.webdav.codec.ResourcetypeCodec.UNSPECIFIED;
    }
    ;
    nl.sara.webdav.codec.ResourcetypeCodec.toXML = function(value, xmlDoc) {
        switch (value) {
        case nl.sara.webdav.codec.ResourcetypeCodec.COLLECTION:
            var collection = xmlDoc.createElementNS("DAV:", "collection");
            xmlDoc.documentElement.appendChild(collection);
        case nl.sara.webdav.codec.ResourcetypeCodec.PRINCIPAL:
            var collection = xmlDoc.createElementNS("DAV:", "principal");
            xmlDoc.documentElement.appendChild(collection);
            break;
        }
        return xmlDoc;
    }
    ;
    nl.sara.webdav.Property.addCodec(nl.sara.webdav.codec.ResourcetypeCodec);
    exports = nl;
    return exports;
});
