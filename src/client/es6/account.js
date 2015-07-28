class Account {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    set firstName (firstName){ this._firstName = firstName }
    get firstName (){ return this._firstName }
    set lastName (lastName){ this._lastName = lastName }
    get lastName (){ return this._lastName }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
