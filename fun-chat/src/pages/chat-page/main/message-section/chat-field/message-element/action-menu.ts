import BaseElement from '@/utils/components/base-element';
import ws from '@/web-socket/web-socket';

class ActionMenu extends BaseElement {
  id: string = '';

  text: string = '';

  delete: BaseElement = new BaseElement({
    classes: ['action-menu__delete', 'action'],
    textContent: 'Delete',
  });

  edit: BaseElement = new BaseElement({
    classes: ['action-menu__edit', 'action'],
    textContent: 'Edit',
  });

  constructor() {
    super({ tag: 'article', classes: ['message__action-menu', 'action-menu'] });

    this.delete.addListener('click', this.deleteMessage);
    this.edit.addListener('click', this.editMessage);

    this.appendChildren(this.edit, this.delete);
  }

  deleteMessage = () => {
    ws.deleteMessage(this.id);
    this.remove();
  };

  editMessage = () => {
    const chatForm = document.querySelector('.chat-form');
    if (chatForm) {
      chatForm.dispatchEvent(
        new CustomEvent('edit', { detail: { text: this.text, id: this.id } })
      );
      this.remove();
    }
  };
}

const actionMenu = new ActionMenu();
export default actionMenu;
