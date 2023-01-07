import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageProducer } from './producer.service';
import * as AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION, // aws region
  accessKeyId: process.env.ACCESS_KEY_ID, // aws access key id
  secretAccessKey: process.env.SECRET_ACCESS_KEY, // aws secret access key
});

@Module({
  imports: [
    SqsModule.register({
      consumers: [],
      producers: [
        {
          name: process.env.TEST_QUEUE, // name of the queue
          queueUrl: process.env.TEST_QUEUE_URL,
          region: process.env.AWS_REGION, // url of the queue
        },
      ],
    }),
  ],
  controllers: [],
  providers: [MessageProducer],
  exports: [MessageProducer],
})
export class ProducerModule {}
