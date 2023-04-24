# SOLID

when writing code, make sure it easy to understand and read. follow solid to resolve this
SOLID stand for five different principle 
  1.Single responsibility principle (SRP)
  2.Open-Closed principle (OCP)
  3.Liskov Substitution principle (LSP)
  4.Interface Segregation principle (ISL)
  5.Dependency injection principle (DIP)

## The Single Responsibility Principle (SRP)
says that each part of your code should only have one job

```javascript
// Incorrect way of doing it

let clickCount = 0;
function handleButtonClick() {
    clickCount += 1;
    document.getElementById("click-count").innerHTML = clickCount;
}

// Correct way of doing it
let clickCount = 0;

function handleButtonClick() {
    clickCount += 1;
}

function updateClickCount() {
    document.getElementById("click-count").innerHTML = clickCount;
}
``` 

## The Open-Closed Principle (OCP)
says that your code should be open for extension but closed for modification

```javascript
// Incorrect way of doing it
function add(a, b) {
    return a + b;
}

// It is not a good idea to change the `add` function to a `subtract` function.
function subtract(a, b) {
    return a - b;
}

// Correct way of doing it
class Calculator {
    static add(a, b) {
        return a + b;
    }

    static subtract(a, b) {
        return a - b;
    }
}
```

## The Liskov Substitution Principle (LSP)
says that you should be able to use a subclass wherever you would use the parent class

```javascript
class Animals {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return "Animals make noise";
    }
}

class Dogs extends Animals {
    speak() {
        return "Woof";
    }
}

const animal = new Animals("Animals");
console.log(animal.speak()); // prints "Animals make noise"

const dog = new Dogs("Dog");
console.log(dog.speak()); // prints "Woof"
console.log(dog instanceof Animals); // prints "true"
```

## The Interface Segregation Principle (ISP)
says that you should not force clients to implement interfaces they don't use.

```javascript
// Incorrect way of doing it
interface Automobile {
    drive(): void;
    fly(): void;
}

class Car implements Automobile {
    drive(): void {
        // code for driving
    }

    fly(): void {
        // code for flying (not applicable for cars)
    }
}

// Correct way of doing it
interface Drivable {
    drive(): void;
}

interface Flyable {
    fly(): void;
}

class Car implements Drivable {
    drive(): void {
        // code for driving
    }
}
```

## The Dependency Inversion Principle (DIP)
says that high-level modules should not depend on low-level modules, but both should depend on abstractions.

```javascript
// Incorrect way of doing it
class Engine {
    start(): void {
        // code for starting the engine
    }
}

class Car {
    private engine: Engine;

    constructor() {
        this.engine = new Engine();
    }

    start(): void {
        this.engine.start();
    }
}

// Correct way of doing it
interface Engine {
    start(): void;
}

class RealEngine implements Engine {
    start(): void {
        // code for starting the engine
    }
}

class Car {
    private engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    start(): void {
        this.engine.start();
    }
}

const car = new Car(new RealEngine());
```

## Use cases
### 1. E-commerce website checkout process
Let's say we have an e-commerce website where customers can add items to their cart and then proceed to the checkout page. The checkout process includes calculating the total cost of the items, applying any discounts or promotions, and then processing the payment.

According to the Single Responsibility Principle (SRP), we should separate the checkout process into different classes, each with their own specific responsibility. For example, we could have a Cart class that keeps track of the items in the cart, a Discounts class that applies any discounts or promotions, and a Payment class that handles the payment processing.

```javascript
class Cart {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
}

class Discounts {
    applyDiscount(total) {
        return total * 0.9; // 10% off
    }
}

class Payment {
    processPayment(total) {
      console.log(total);
        // code for processing the payment
    }
}

class Checkout {
    cart;
    discounts;
    payment;

    constructor(cart, discounts, payment) {
        this.cart = cart;
        this.discounts = discounts;
        this.payment = payment;
    }

    processCheckout() {
        const total = this.discounts.applyDiscount(this.cart.getTotal());
        this.payment.processPayment(total);
    }
}

const cart = new Cart();
cart.addItem({ name: "item1", price: 20 });
cart.addItem({ name: "item2", price: 30 });

const checkout = new Checkout(cart, new Discounts(), new Payment());
checkout.processCheckout();
```

In this example, each class has a single responsibility: the Cart class keeps track of the items in the cart, the Discounts class applies discounts, the Payment class processes the payment, and the Checkout class coordinates the process. This makes the code more maintainable and easy to understand.

### 2. Weather app
Let's say we have a weather app that displays the current temperature, humidity, and pressure for a given location. We want to add a new feature that displays the wind speed and direction.

According to the Open-Closed Principle (OCP), we should be able to add this new feature without modifying the existing code that displays the temperature, humidity, and pressure.

```javascript
class WeatherData {
  constructor(temperature, humidity, pressure) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
  }
}

class WeatherDisplay {
  // weatherData in here is not allow
  console.log(JSON.stringify(weatherData))
  display(weatherData) {
    console.log(`Temperature: ${weatherData.temperature}`);
    console.log(`Humidity: ${weatherData.humidity}`);
    console.log(`Pressure: ${weatherData.pressure}`);
  }
}

class WindDisplay {
  display(weatherData) {
    console.log(`Wind speed: ${weatherData.windSpeed}`);
    console.log(`Wind direction: ${weatherData.windDirection}`);
  }
}

class WeatherApp {
  weatherData;
  weatherDisplay;
  windDisplay;
  constructor(weatherData) {
    this.weatherData = weatherData;
    this.weatherDisplay = new WeatherDisplay();
    this.windDisplay = new WindDisplay();
  }

  displayWeather() {
    this.weatherDisplay.display(this.weatherData);
    this.windDisplay.display(this.weatherData);
  }
}

const weatherData = new WeatherData(72, 50, 1013);
weatherData.windSpeed = 5;
weatherData.windDirection = "NW";
const weatherApp = new WeatherApp(weatherData);
weatherApp.displayWeather();
```

In this example, the WeatherApp class is open for extension by adding the new WindDisplay class without modifying the existing WeatherDisplay class. This allows us to add new features to the app without affecting the existing code.

### 3. Game characters
Let's say we have a game that has different types of characters, each with their own unique abilities. We want to add a new type of character without breaking the existing game mechanics.

According to the Liskov Substitution Principle (LSP), we should be able to use the new character class wherever we would use the parent character class, and the game should still work correctly.

```javascript
class Character {
    move() {
        console.log("Character moved");
    }
}

class Warrior extends Character {
    attack() {
        console.log("Warrior attacked");
    }
}

class Mage extends Character {
    castSpell() {
        console.log("Mage cast a spell");
    }
}

class Paladin extends Warrior {
    heal() {
        console.log("Paladin healed");
    }
}

const characters = [new Warrior(), new Mage(), new Paladin()];
for (let character of characters) {
    character.move();
    if (character instanceof Warrior) {
        character.attack();
    }
    if (character instanceof Mage) {
        character.castSpell();
    }
    if (character instanceof Paladin) {
        character.heal();
    }
}
```

In this example, the Paladin class is a subclass of the Warrior class and it has its own unique ability to heal, but it still correctly implements the move method from the parent class, so it can be used wherever a Character object is used. This allows us to add new character types without breaking the existing game mechanics.

### 4. Chat application
Let's say we have a chat application that allows users to send messages and files. We want to separate the functionality of sending messages and sending files so that clients that only need one of the two features don't have to implement the other one.

According to the Interface Segregation Principle (ISP), we should create two separate interfaces, one for sending messages and another for sending files.

```javascript
interface MessageSender {
  sendMessage(message: string): void;
}

interface FileSender {
  sendFile(file: File): void;
}

class ChatClient implements MessageSender {
  sendMessage(message: string): void {
    // code for sending a message
  }
}

class FileTransferClient implements FileSender {
  sendFile(file: File): void {
    // code for sending a file
  }
}

class AdvancedChatClient implements MessageSender, FileSender {
  sendMessage(message: string): void {
    // code for sending a message
  }
  sendFile(file: File): void {
    // code for sending a file
  }
}

const chatClient = new ChatClient();
chatClient.sendMessage("Hello!");

const fileTransferClient = new FileTransferClient();
fileTransferClient.sendFile(new File("file.txt"));

const advancedChatClient = new AdvancedChatClient();
advancedChatClient.sendMessage("Hello!");
advancedChatClient.sendFile(new File("file.txt"));
```

In this example, the ChatClient class only implements the MessageSender interface and doesn't have to implement the FileSender interface, and the FileTransferClient class only implements the FileSender interface and doesn't have to implement the MessageSender interface. This allows clients to only implement the functionality they need, while keeping the code clear and easy to understand.

### 5. Social media platform
Let's say we have a social media platform that allows users to post text and image updates. We want to add a new feature that allows users to post video updates without changing the existing code for handling text and image updates.

According to the Dependency Inversion Principle (DIP), we should make sure that the code for handling updates doesn't depend on specific classes or functions, but rather on abstract concepts.

```javascript
interface Update {
  display(): void;
}

class TextUpdate implements Update {
  text: string;
  constructor(text: string) {
    this.text = text;
  }
  display(): void {
    console.log(`Text Update: ${this.text}`);
  }
}

class ImageUpdate implements Update {
  imageUrl: string;
  constructor(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

  display(): void {
    console.log(`Image Update: ${ this.imageUrl }`);
  }
}

class VideoUpdate implements Update {
  videoUrl: string;
  constructor(videoUrl: string) {
    this.videoUrl = videoUrl;
  }
  display(): void {
    console.log(`Video Update: ${ this.videoUrl }`);
  }
}

class SocialMediaApp {
  updates: Update[];
  constructor() {
    this.updates = [];
  }
  addUpdate(update: Update) {
    this.updates.push(update);
  }

  displayUpdates() {
    this.updates.forEach(update => update.display());
  }
}

const socialMediaApp = new SocialMediaApp();
socialMediaApp.addUpdate(new TextUpdate("Hello, world!"));
socialMediaApp.addUpdate(new ImageUpdate("image.jpg"));
socialMediaApp.addUpdate(new VideoUpdate("video.mp4"));
socialMediaApp.displayUpdates();
```

In this example, the SocialMediaApp class doesn't depend on specific classes for handling text, image, or video updates, but rather on the abstract concept of an Update interface. This allows us to add new types of updates (such as video updates) without changing the existing code for handling text and image updates.