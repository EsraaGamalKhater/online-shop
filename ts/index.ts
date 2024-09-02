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

class Person{
    constructor( public name: string,public age: number) {
       
    }
    info(){
        console.log(`${this.name} ${this.age} `)
    }
}

// new Person("esraa", 20).info()
class  User extends Person{
    address:string;
    constructor(name: string, age: number,address: string) {
        super(name,age)
        this.address=address;
    }
    info(){
        super.info();
        console.log(this.address); 
        
    }
}
// let user1=new User("esraa",20,"Zagazig")

// user1.info()

class con<Type>{
    constructor(public phone:number ,public email:Type){
        console.log(`${phone} ${email}`)
    }
}
let con1 = new con(11294,true)
let con2 = new con<string>(11294,"esraa")


