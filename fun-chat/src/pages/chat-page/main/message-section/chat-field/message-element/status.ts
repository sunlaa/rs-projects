import BaseElement from '@/utils/components/base-element';

export default class MessageStatus extends BaseElement {
  editStatus: BaseElement;

  deliveryStatus: BaseElement;

  constructor() {
    super({ classes: ['message__status', 'status'] });

    this.editStatus = new BaseElement({ classes: ['status__edit'] });

    this.deliveryStatus = new BaseElement({
      classes: ['status__delivery'],
    });

    this.appendChildren(this.editStatus, this.deliveryStatus);
  }

  changeEditStatus() {
    this.editStatus.setContent('Edited');
  }

  changeStatus(isDelivered: boolean, isReaded?: boolean) {
    if (isDelivered) {
      this.deliveryStatus.setContent('Delivered');
    } else if (isReaded) {
      this.deliveryStatus.setContent('Read');
    } else {
      this.deliveryStatus.setContent('Sent');
    }
  }
}
