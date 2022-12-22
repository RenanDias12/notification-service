import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notification';
import { makeNotification } from '../../../test/factories/notification-factory';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(notificationRepository);

    await notificationRepository.create(makeNotification());
    await notificationRepository.create(makeNotification());
    await notificationRepository.create(makeNotification({ recipientId: "recipient-2" }));

    const { count } = await countRecipientNotifications.execute({
      recipientId: "recipient-1",
    });

    expect(count).toEqual(2);
  });
});
