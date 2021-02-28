const amqp = require("amqplib");
const amqpServer = process.env.AMQP || "amqp://localhost:5672";
const waitStartup = process.env.WAIT || 0; // wait for rabbitmq container to start

async function connect() {
    try {        
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        
        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.number}`)
            if (input.number == 7 ) channel.ack(message);
        })

        console.log("Waiting for messages...");
    } catch (ex) {
        console.error(ex)
    }
}

setTimeout(() => connect(), waitStartup);
