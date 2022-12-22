import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
    constructor() {
        super({
            client: {
                clientId: 'notifications',
                brokers: ['liberal-cicada-5187-us1-kafka.upstash.io:9092'],
                sasl: {
                  mechanism: 'scram-sha-256',
                  username: 'bGliZXJhbC1jaWNhZGEtNTE4NyRdTNWZG7JDaRRwwhHq6N_xl0kVbxDnYHpztgw',
                  password: 'a635b14eb918443eb325071f87e1bb11',
                },
                ssl: true,
            }
        })
    }
    async onModuleDestroy() {
        await this.close();
    }

}