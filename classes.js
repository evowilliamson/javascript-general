/*
JavaScript is a prototype-based language, and every object in JavaScript has a hidden internal property called [[Prototype]] 
that can be used to extend object properties and methods. You can read more about prototypes in our Understanding Prototypes
and Inheritance in JavaScript tutorial.

Until recently, industrious developers used constructor functions to mimic an object-oriented design pattern in JavaScript. 
The language specification ECMAScript 2015, often referred to as ES6, introduced classes to the JavaScript language. 
Classes in JavaScript do not actually offer additional functionality, and are often described as providing 
“syntactical sugar” over prototypes and inheritance in that they offer a cleaner and more elegant syntax. Because other 
programming languages use classes, the class syntax in JavaScript makes it more straightforward for developers to 
move between languages.

Classes Are Functions
---------------------
A JavaScript class is a type of function. Classes are declared with the class keyword. We will use function expression 
syntax to initialize a function and class expression syntax to initialize a class.*/

// Initializing a function with a function expression
let x = function() {}
// Initializing a class with a class expression
let y = class {}

/*
We can access the [[Prototype]] of an object using the Object.getPrototypeOf() method. Let’s use that to test the empty 
function we created.*/

let px = Object.getPrototypeOf(x);

/*
Output
ƒ () { [native code] }
We can also use that method on the class we just created.*/

let py = Object.getPrototypeOf(y);

/*
Output
ƒ () { [native code] }
The code declared with function and class both return a function [[Prototype]]. With prototypes, any function can become 
a constructor instance using the new keyword.*/

x = function() {}

// Initialize a constructor from a function
let constructorFromFunction = new x();

console.log(constructorFromFunction);

/*
Output
x {}
constructor: ƒ ()
This applies to classes as well.*/

y = class {}

// Initialize a constructor from a class
let constructorFromClass = new y();
console.log(constructorFromClass);

/*
Output
y {}
constructor: class
These prototype constructor examples are otherwise empty, but we can see how underneath the syntax, both methods are 
achieving the same end result.

Defining a Class
----------------
In the prototypes and inheritance tutorial, we created an example based around character creation in a text-based 
role-playing game. Let’s continue with that example here to update the syntax from functions to classes.

A constructor function is initialized with a number of parameters, which would be assigned as properties of this, 
referring to the function itself. The first letter of the identifier would be capitalized by convention.*/

// Initializing a constructor function

var HeroFunction = function HeroFunction(name, level) {
    this.name = name;
    this.level = level;
}

// /*
// When we translate this to the class syntax, shown below, we see that it is structured very similarly.*/
var HeroClass = class HeroClass {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }
}

// Initializing a class definition

/*
We know a constructor function is meant to be an object blueprint by the capitalization of the first letter of the 
initializer (which is optional) and through familiarity with the syntax. The class keyword communicates in a more 
straightforward fashion the objective of our function.

The only difference in the syntax of the initialization is using the class keyword instead of function, and 
assigning the properties inside a constructor() method.

Defining Methods
----------------
The common practice with constructor functions is to assign methods directly to the prototype instead of in 
the initialization, as seen in the greet() method below.*/

HeroFunction = function Hero(name, level) {
    this.name = name;
    this.level = level;
}

// Adding a method to the constructor
HeroFunction.prototype.greet = function() {
    return `${this.name} says hello.`;
}


/*With classes this syntax is simplified, and the method can be added directly to the class. Using the method definition 
shorthand introduced in ES6, defining a method is an even more concise process.
*/

HeroClass = class Hero {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    // Adding a method to the constructor
    greet() {
        return `${this.name} says hello.`;
    }
}

/*
Let’s take a look at these properties and methods in action. We will create a new instance of Hero using the 
new keyword, and assign some values.*/

const hero1 = new HeroClass('Varg', 1);

/*
If we print out more information about our new object with console.log(hero1), we can see more details about what is 
happening with the class initialization.

Output
Hero {name: "Varg", level: 1}
__proto__:
  ▶ constructor: class Hero
  ▶ greet: ƒ greet()
We can see in the output that the constructor() and greet() functions were applied to the __proto__, or [[Prototype]] of 
hero1, and not directly as a method on the hero1 object. While this is clear when making constructor functions, it is not 
obvious while creating classes. Classes allow for a more simple and succinct syntax, but sacrifice some clarity in the process.

Extending a Class
-----------------
An advantageous feature of constructor functions and classes is that they can be extended into new object blueprints based off 
of the parent. This prevents repetition of code for objects that are similar but need some additional or more specific features.

New constructor functions can be created from the parent using the call() method. In the example below, we will create a more 
specific character class called Mage, and assign the properties of Hero to it using call(), as well as adding an additional 
property.*/

// Creating a new constructor from the parent
function MageFunction(name, level, spell) {
    // Chain constructor with call
    HeroFunction.call(this, name, level);

    this.spell = spell;
}

/*
At this point, we can create a new instance of Mage using the same properties as Hero as well as a new one we added.*/

var hero2 = new MageFunction('Lejon', 2, 'Magic Missile');

/*
Sending hero2 to the console, we can see we have created a new Mage based off the constructor.

Output
Mage {name: "Lejon", level: 2, spell: "Magic Missile"}
__proto__:
    ▶ constructor: ƒ Mage(name, level, spell)
With ES6 classes, the super keyword is used in place of call to access the parent functions. We will use extends to refer 
to the parent class.*/

// Creating a new class from the parent
class MageClass extends HeroClass {
    constructor(name, level, spell) {
        // Chain constructor with super
        super(name, level);

        // Add a new property
        this.spell = spell;
    }
}


/*
Now we can create a new Mage instance in the same manner.*/

hero2 = new MageClass('Lejon', 2, 'Magic Missile');

/*
We will print hero2 to the console and view the output.

Output
Mage {name: "Lejon", level: 2, spell: "Magic Missile"}
__proto__: Hero
    ▶ constructor: class Mage
The output is nearly exactly the same, except that in the class construction the [[Prototype]] is linked to the parent, 
in this case Hero.

Below is a side-by-side comparison of the entire process of initialization, adding methods, and inheritance of a constructor function and a class.

constructor.js
function Hero(name, level) {
    this.name = name;
    this.level = level;
}

// Adding a method to the constructor
Hero.prototype.greet = function() {
    return `${this.name} says hello.`;
}

// Creating a new constructor from the parent
function Mage(name, level, spell) {
    // Chain constructor with call
    Hero.call(this, name, level);

    this.spell = spell;
}
class.js
// Initializing a class
class Hero {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    // Adding a method to the constructor
    greet() {
        return `${this.name} says hello.`;
    }
}

// Creating a new class from the parent
class Mage extends Hero {
    constructor(name, level, spell) {
        // Chain constructor with super
        super(name, level);

        // Add a new property
        this.spell = spell;
    }
}

Although the syntax is quite different, the underlying result is nearly the same between both methods. Classes give us a more concise 
way of creating object blueprints, and constructor functions describe more accurately what is happening under the hood.*/