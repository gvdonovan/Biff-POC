class EntityBase {

    constructor(validationRules){
        console.log('in base class');
        this._validationRules = validationRules;
    }
    validate(){
        for (var vr of this._validationRules){
            console.log(`Field: [${vr.name}] Required:${vr.rules.required}`);
        }
    }

    getMinLength(field){

    }
}

class Account extends EntityBase {
    constructor(name, phone, fax, site, address1, address2, city, zip) {
        super([{name: 'name', rules: {required:true, minLength: 2, maxLenght: 100}}]);

        this.name = name;
        this.phone = phone;
        this.fax = fax;
        this.site = site;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.zip = zip;
    }
    set name (name){ this._name = name }
    get name (){ return this._name }

    set phone (phone){ this._phone = phone }
    get phone (){ return this._phone }

    set fax (fax){ this._fax = fax}
    get fax (){ return this._fax }

    set site (site){ this._site = site }
    get site (){ return this._site }

    set address1 (address1){ this._address1 = address1 }
    get address1 (){ return this._address1}

    set address2 (address2){ this._address2 = address2}
    get address2 (){ return this._address2}

    set city (city){ this._city = city}
    get city (){return this._city}

    set zip (zip){ this._zip = zip }
    get zip (){ return this._zip}

    validate() {
        super.validate();
    }
}
