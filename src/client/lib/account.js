"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Account = (function () {
    function Account(name, phone, fax, site, address1, address2, city, zip) {
        _classCallCheck(this, Account);

        this.name = name;
        this.phone = phone;
        this.fax = fax;
        this.site = site;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.zip = zip;
    }

    _createClass(Account, [{
        key: "name",
        set: function set(name) {
            this._name = name;
        },
        get: function get() {
            return this._name;
        }
    }, {
        key: "phone",
        set: function set(phone) {
            this._phone = phone;
        },
        get: function get() {
            return this._phone;
        }
    }, {
        key: "fax",
        set: function set(fax) {
            this._fax = fax;
        },
        get: function get() {
            return this._fax;
        }
    }, {
        key: "site",
        set: function set(site) {
            this._site = site;
        },
        get: function get() {
            return this._site;
        }
    }, {
        key: "address1",
        set: function set(address1) {
            this._address1 = address1;
        },
        get: function get() {
            return this._adress1;
        }
    }, {
        key: "address2",
        set: function set(address2) {
            this._address2 = address2;
        },
        get: function get() {
            return this._address2;
        }
    }, {
        key: "city",
        set: function set(city) {
            this._city = city;
        },
        get: function get() {
            return this._city;
        }
    }, {
        key: "zip",
        set: function set(zip) {
            this._zip = zip;
        },
        get: function get() {
            return this._zip;
        }
    }]);

    return Account;
})();