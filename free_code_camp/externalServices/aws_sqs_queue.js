import AWS from 'aws-sdk';

const sqs = new AWS.SQS(),
  ses = new AWS.SES(),
  rekognition = new AWS.Rekognition();

// SEND MESSAGE TO SQS QUEUE
// Set the parameters for sending the message to the SQS queue
const params = {
  MessageBody: JSON.stringify({ message: 'Hello, SQS!' }),
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/1234567890/MyQueue',
};

// Send the message to the SQS queue
sqs.sendMessage(params, (err, data) => {
  let message = !!err
    ? `Error sending message to SQS: ${err}`
    : `Successfully sent message to SQS: ${data}`;
  console.log(message);
});

// RECEIVE MESSAGE
// Set the parameters for receiving messages from the SQS queue
const paramsReceive = {
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/1234567890/MyQueue',
  MaxNumberOfMessages: 10,
};

// Poll the SQS queue for new messages
setInterval(() => {
  sqs.receiveMessage(paramsReceive, (err, data) => {
    let message = !!err
      ? `Error receiving message from SQS: ${err}`
      : `Successfully received message from SQS: ${data}`;
    console.log(message);
    if (!err) {
      // Process the message ...
    }
  });
}, 5000);

// BACKGROUND JOBS PROCESSING TO SENDING AN EMAIL
// Set the parameters for sending the message to the SQS queue
const paramsMail = {
  MessageBody: JSON.stringify({
    email: 'example@example.com',
    subject: 'Hello, SQS!',
    body: 'This is a background job processed by SQS',
  }),
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/1234567890/emailQueue',
};

// Send the message to the SQS queue
sqs.sendMessage(paramsMail, (err, data) => {
  let message = !!err
    ? `Error sending message to SQS: ${err}`
    : `Successfully sent message to SQS: ${data}`;
  console.log(message);
});

setInterval(() => {
  sqs.receiveMessage(
    {
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/1234567890/emailQueue',
      MaxNumberOfMessages: 10,
    },
    (err, data) => {
      if (err) {
        console.log(`Error receiving message from SQS: ${err}`);
      } else {
        const emailParams = {
          Destination: {
            ToAddresses: [data.Messages[0].email],
          },
          Message: {
            Body: {
              Text: {
                Charset: 'UTF-8',
                Data: data.Messages[0].body,
              },
            },
            Subject: {
              Charset: 'UTF-8',
              Data: data.Messages[0].subject,
            },
          },
          Source: 'example@example.com',
        };
        ses.sendEmail(emailParams, (err, data) => {
          let message = !!err ? `Error sending email: ${err}` : `Successfully sent email: ${data}`;
          console.log(message);
        });
        sqs.deleteMessage(
          {
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/1234567890/emailQueue',
            ReceiptHandle: data.Messages[0].ReceiptHandle,
          },
          (err, data) => {
            let message = !!err
              ? `Error deleting email from SQS: ${err}`
              : `Successfully deleted email from SQS: ${data}`;
            console.log(message);
          }
        );
      }
    }
  );
}, 5000);

// AUTOMATED WORKFLOWS
// Set the parameters for sending the message to the SQS queue
const paramsWorkflow = {
  MessageBody: JSON.stringify({ imageUrl: 'https://example.com/image.jpg' }),
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/1234567890/imageQueue',
};

// Send the message to the SQS queue
sqs.sendMessage(paramsWorkflow, (err, data) => {
  let message = !!err
    ? `Error sending message to SQS: ${err}`
    : `Successfully sent message to SQS: ${data}`;
  console.log(message);
});

setInterval(() => {
  sqs.receiveMessage(
    {
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/1234567890/imageQueue',
      MaxNumberOfMessages: 10,
    },
    (err, data) => {
      if (err) {
        console.log(`Error receiving message from SQS: ${err}`);
      } else {
        const imageUrl = data.Messages[0].imageUrl;
        rekognition.detectLabels(
          {
            Image: {
              S3Object: {
                Bucket: 'imageBucket',
                Name: imageUrl,
              },
            },
            MinConfidence: 90,
          },
          (err, data) => {
            let message = !!err ? `Error processing image: ${err}` : `Image labels: ${data.Labels}`;
            console.log(message);
          }
        );
        sqs.deleteMessage(
          {
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/1234567890/imageQueue',
            ReceiptHandle: data.Messages[0].ReceiptHandle,
          },
          (err, data) => {
            let message = !!err
              ? `Error deleting image from SQS: ${err}`
              : `Successfully deleted image from SQS: ${data}`;
            console.log(message);
          }
        );
      }
    }
  );
}, 5000);


// LOAD BALANCING
// Create the SQS queue
sqs.createQueue(
  { QueueName: "requestQueue" },
  (err, data) => {
    let message = !!err
      ? `Error creating SQS queue: ${err}`
      : `Successfully created SQS queue: ${data}`;
    console.log(message);
  }
);

// Send a request to the SQS queue
const paramsBalance = {
  MessageBody: JSON.stringify({
    requestUrl: "/example",
    requestMethod: "GET",
  }),
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/1234567890/requestQueue",
};

sqs.sendMessage(paramsBalance, (err, data) => {
  let message = !!err
    ? `Error sending request to SQS: ${err}`
    : `Successfully sent request to SQS: ${data}`;
  console.log(message);
});

// Poll the SQS queue for new requests
setInterval(() => {
  sqs.receiveMessage(
    {
      QueueUrl: "https://sqs.us-east-1.amazonaws.com/1234567890/requestQueue",
      MaxNumberOfMessages: 10,
    },
    (err, data) => {
      if (err) {
        console.log(`Error receiving request from SQS: ${err}`);
      } else {
        // Route request to a free instance of the application
        //...
        sqs.deleteMessage(
          {
            QueueUrl: "https://sqs.us-east-1.amazonaws.com/1234567890/requestQueue",
            ReceiptHandle: data.Messages[0].ReceiptHandle,
          },
          (err, data) => {
            let message = !!err
              ? `Error deleting request from SQS: ${err}`
              : `Successfully deleted request from SQS: ${data}`;
            console.log(message);
          }
        );
      }
    }
  );
}, 5000);