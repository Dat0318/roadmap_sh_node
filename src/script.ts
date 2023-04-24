import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: {
          title: 'Hello World',
          //   body: 'Lots of really interesting stuff',
          //   slug: 'my-first-post',
        },
      },
      //   profile: {
      //     create: { bio: 'I like turtles' },
      //   },
    },
  });
  console.log(user);

  const users = await prisma.user.findMany();
  console.log(users);

  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
      //   profile: true,
    },
  });
  console.dir(usersWithPosts, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

class Reptile {
  private reptiles: Array<string> = [
    'Alligator',
    'Crocodile',
    'Chameleon',
    'Komodo Dragon',
    'Iguana',
    'Salamander',
    'Snake',
    'Lizard',
    'Python',
    'Tortoise',
    'Turtle',
  ];

  shuffle(): void {
    for (let i = this.reptiles.length - 1; i > 0; i--) {
      let j: number = Math.floor(Math.random() * (i + 1));
      let temp: string = this.reptiles[i];
      this.reptiles[i] = this.reptiles[j];
      this.reptiles[j] = temp;
    }
  }

  random(count: number = 1, allowDupes?: boolean): Array<string> {
    let selected: Array<string> = [];
    if (!allowDupes && count > this.reptiles.length) {
      throw new Error(`Can't ensure no dupes for that count`);
    }

    for (let i: number = 0; i < count; i++) {
      if (allowDupes) {
        // Dupes are cool, so let's just pull random reptiles
        selected.push(this.reptiles[Math.floor(Math.random() * this.reptiles.length)]);
      } else {
        // Dupes are no go, shuffle the array and grab a few
        this.shuffle();
        selected = this.reptiles.slice(0, count);
      }
    }

    return selected;
  }
}

const reptile = new Reptile();
console.log(`With Dupes: ${reptile.random(10, true)}`);
console.log(`And Without: ${reptile.random(10)}`);

// Interface segregation principle
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
chatClient.sendMessage('Hello!');

const fileTransferClient = new FileTransferClient();
fileTransferClient.sendFile(new File(['file'], 'file.txt'));

const advancedChatClient = new AdvancedChatClient();
advancedChatClient.sendMessage('Hello!');
advancedChatClient.sendFile(new File(['file'], 'file.txt'));

// Dependency Injection Principle
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
    console.log(`Image Update: ${this.imageUrl}`);
  }
}

class VideoUpdate implements Update {
  videoUrl: string;
  constructor(videoUrl: string) {
    this.videoUrl = videoUrl;
  }
  display(): void {
    console.log(`Video Update: ${this.videoUrl}`);
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
    this.updates.forEach((update) => update.display());
  }
}

const socialMediaApp = new SocialMediaApp();
socialMediaApp.addUpdate(new TextUpdate('Hello, world!'));
socialMediaApp.addUpdate(new ImageUpdate('image.jpg'));
socialMediaApp.addUpdate(new VideoUpdate('video.mp4'));
socialMediaApp.displayUpdates();

// ############## ADAPTER PATTERN ####################

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  text?: string;
}
interface EmailResponse {}
interface EmailProvider {
  sendMail(options: EmailOptions): Promise<EmailResponse>;
}
interface CloudEmailProvider {
  send(options: EmailOptions): Promise<EmailResponse>;
}

class EmailService {
  // normal class
  constructor(public emailProvider: EmailProvider) {}
  async sendMail(options: EmailOptions): Promise<EmailResponse> {
    const result = await this.emailProvider.sendMail(options);
    return result;
  }
}

class CloudEmailAdapter implements EmailProvider {
  // class send email with nodemailer
  constructor(public emailProvider: CloudEmailProvider) {}

  async sendMail(options: EmailOptions): Promise<EmailResponse> {
    const result = this.emailProvider.send(options);
    return result;
  }
}

// send mail with adapter pattern and sendgird
import { MailService } from '@sendgrid/mail';
class SendgridEmailProvider implements CloudEmailProvider {
  private sendgridMail: MailService;
  constructor(
    private config: {
      apiKey: string;
      from: string;
    }
  ) {
    this.sendgridMail = new MailService();
    this.sendgridMail.setApiKey(this.config.apiKey);
  }

  async send(options: EmailOptions): Promise<EmailResponse> {
    const result = await this.sendgridMail.send(options);
    return result;
  }
}
// USAGE
const sendgridMail = new SendgridEmailProvider({
  apiKey: '******',
  from: 'bytefer@gmail.com',
});
const cloudEmailAdapter = new CloudEmailAdapter(sendgridMail);
const emailService = new EmailService(cloudEmailAdapter);
emailService.sendMail({
  to: '******',
  subject: 'Adapter Design Pattern',
  html: '<h3>Adapter Design Pattern</h3>',
  from: 'bytefer@gmail.com',
});

// SU KHAC BIET GIUA INTERFACE VA TYPE
interface Human {
  name: string;
  age: number;
  speak: () => void;
}

// Using an interface
const james: Human = {
  name: 'James',
  age: 30,
  speak: () => {
    console.log('Hello, my name is James.');
  },
};

type Laptop = {
  language: string;
  model: string;
  year: number;
};

type CodeMaker = Laptop;
type TheMachine = Laptop;

const bensLaptop: CodeMaker = {
  language: 'en',
  model: 'Macbook Pro',
  year: 2016,
};

const johnsLaptop: TheMachine = {
  language: 'en',
  model: 'Dell XPS',
  year: 2018,
};
const benAndJohnsLaptops: Laptop[] = [bensLaptop, johnsLaptop];
// bây giờ ta có 3 tên khác nhau về cơ bản là mô tả cùng một thứ,
// làm nó đơn giản bằng type nhưng interface không thể làm được
