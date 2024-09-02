// class Person{
//     name: string
//     age: number
//     constructor(name: string, age: number) {
//         this.name=name;
//         this.age=age;
//     }
//     info(){
//         console.log(`${this.name} ${this.age} `)
//     }
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.info = function () {
        console.log("".concat(this.name, " ").concat(this.age, " "));
    };
    return Person;
}());
// new Person("esraa", 20).info()
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(name, age, address) {
        var _this = _super.call(this, name, age) || this;
        _this.address = address;
        return _this;
    }
    User.prototype.info = function () {
        _super.prototype.info.call(this);
        console.log(this.address);
    };
    return User;
}(Person));
// let user1=new User("esraa",20,"Zagazig")
// user1.info()
var con = /** @class */ (function () {
    function con(phone, email) {
        this.phone = phone;
        this.email = email;
        console.log("".concat(phone, " ").concat(email));
    }
    return con;
}());
var con1 = new con(11294, true);
var con2 = new con(11294, "esraa");
