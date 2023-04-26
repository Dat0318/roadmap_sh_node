class Alien {
  constructor(name, phrase) {
    this.name = name;
    this.phrase = phrase;
    this.species = 'alien';
  }
  // Đây sẽ là các method của đối tượng.
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
  sayPhrase = () => console.log(this.phrase);
}

class Bug {
  constructor(name, phrase) {
    this.name = name;
    this.phrase = phrase;
    this.species = 'bug';
  }
  hide = () => console.log("You can't catch me now!");
  sayPhrase = () => console.log(this.phrase);
}

class Robot {
  constructor(name, phrase) {
    this.name = name;
    this.phrase = phrase;
    this.species = 'robot';
  }
  transform = () => console.log('Optimus prime!');
  sayPhrase = () => console.log(this.phrase);
}

const alien1 = new Alien('Ali', "I'm Ali the alien!");
const alien2 = new Alien('Lien', 'Run for your lives!');
const bug1 = new Bug('Buggy', "Your debugger doesn't work with me!");
const bug2 = new Bug('Erik', 'I drink decaf!');
const Robot1 = new Robot('Tito', 'I can cook, swim and dance!');
const Robot2 = new Robot('Terminator', 'Hasta la vista, baby!');

console.log(alien1.name); // output: "Ali"
console.log(bug2.species); // output: "bug"
Robot1.sayPhrase(); // output: "I can cook, swim and dance!"
Robot2.transform(); // output: "Optimus prime!"

// ###### TÍNH KẾ THỪA ######

class Enemy {
  constructor(power) {
    this.power = power;
  }

  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
}

class Alien extends Enemy {
  constructor(name, phrase, power) {
    super(power);
    this.name = name;
    this.phrase = phrase;
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
  sayPhrase = () => console.log(this.phrase);
}

const alien1_1 = new Alien('Ali', "I'm Ali the alien!", 10);
const alien2_1 = new Alien('Lien', 'Run for your lives!', 15);

alien1_1.attack(); // output: I'm attacking with a power of 10!
console.log(alien2_1.power); // output: 15

class Character {
  constructor(speed) {
    this.speed = speed;
  }

  move = () => console.log(`I'm moving at the speed of ${this.speed}!`);
}

class Enemy extends Character {
  constructor(power, speed) {
    super(speed);
    this.power = power;
  }

  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
}

class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    super(power, speed);
    this.name = name;
    this.phrase = phrase;
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
  sayPhrase = () => console.log(this.phrase);
}

const alien1_2 = new Alien('Ali', "I'm Ali the alien!", 10, 50);
const alien2_2 = new Alien('Lien', 'Run for your lives!', 15, 60);

alien1_2.move(); // output: "I'm moving at the speed of 50!"
console.log(alien2_2.speed); // output: 60

// REFACTOR
class Character {
  constructor(speed) {
    this.speed = speed;
  }
  move = () => console.log(`I'm moving at the speed of ${this.speed}!`);
}

class Enemy extends Character {
  constructor(name, phrase, power, speed) {
    super(speed);
    this.name = name;
    this.phrase = phrase;
    this.power = power;
  }
  sayPhrase = () => console.log(this.phrase);
  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
}

class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
}

class Bug extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'bug';
  }
  hide = () => console.log("You can't catch me now!");
}

class Robot extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'robot';
  }
  transform = () => console.log('Optimus prime!');
}

const alien1_3 = new Alien('Ali', "I'm Ali the alien!", 10, 50);
const alien2_3 = new Alien('Lien', 'Run for your lives!', 15, 60);
const bug1_3 = new Bug('Buggy', "Your debugger doesn't work with me!", 25, 100);
const bug2_3 = new Bug('Erik', 'I drink decaf!', 5, 120);
const Robot1_3 = new Robot('Tito', 'I can cook, swim and dance!', 125, 30);
const Robot2_3 = new Robot('Terminator', 'Hasta la vista, baby!', 155, 40);

// ###### TÍNH ĐÓNG GÓI ######

class Alien extends Enemy {
  #birthYear;

  constructor(name, phrase, power, speed, birthYear) {
    super(name, phrase, power, speed);
    this.species = 'alien';
    this.#birthYear = birthYear;
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
  howOld = () => console.log(`I was born in ${this.#birthYear}`);
}

const alien1_4 = new Alien('Ali', "I'm Ali the alien!", 10, 50, 10000);

// ###### TÍNH TRỪU TƯỢNG ######
// ###### TÍNH ĐA HÌNH ######

class Enemy extends Character {
  constructor(name, phrase, power, speed) {
    super(speed);
    this.name = name;
    this.phrase = phrase;
    this.power = power;
  }
  sayPhrase = () => console.log(this.phrase);
  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
}

class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
  attack = () => console.log("Now I'm doing a different thing, HA!");
}

const alien1_5 = new Alien('Ali', "I'm Ali the alien!", 10, 50);

alien1_5.attack();
// output: "Now I'm doing a different thing, HA!"

// ### CREATE OBJECT IN JAVASCRIPT ###
// su dung factory pattern

const createPerson = (firstName, lastName) => {
  return {
    firstName,
    lastName,
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  };
};
