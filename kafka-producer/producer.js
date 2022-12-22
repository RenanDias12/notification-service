import { Kafka } from 'kafkajs'
import { randomUUID } from 'node:crypto'

async function send() {
    const kafka = new Kafka({
        clientId: 'kafka-producer',
        brokers: ['liberal-cicada-5187-us1-kafka.upstash.io:9092'],
        sasl: {
            mechanism: 'scram-sha-256',
            username: 'bGliZXJhbC1jaWNhZGEtNTE4NyRdTNWZG7JDaRRwwhHq6N_xl0kVbxDnYHpztgw',
            password: 'a635b14eb918443eb325071f87e1bb11',
        },
        ssl: true,
    });

    const producer = kafka.producer();

    await producer.connect();
    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            {
                value: JSON.stringify({
                    content: "Nova notificação!",
                    category: "social",
                    recipientId: randomUUID(),
                })
            }
        ]
    });

    await producer.disconnect();
}

send()