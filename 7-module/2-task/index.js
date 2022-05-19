import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  modalTitle = 0;
  node = 0;
  constructor() {
    // this.#createModal();
  }

  #createModal() {
    this.modal = createElement(this.#template());

    this.modal.querySelector('.modal__close').addEventListener('click', this.close);
    document.addEventListener('keydown', this.onKeyDown);


  }

  onKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  #template() {
    return `
          <div class="modal">
            <div class="modal__overlay"></div>
            <div class="modal__inner">
              <div class="modal__header">
                <button type="button" class="modal__close">
                  <img src="../../assets/images/icons/cross-icon.svg" alt="close-icon" />
                </button>
                <h3 class="modal__title"></h3>
              </div>
              <div class="modal__body"></div>
            </div>
        </div>
    `;
  }

  setTitle(modalTitle) {
    if (document.querySelector('.modal')) {
      document.querySelector('.modal__title').innerText = modalTitle;
      return;
    }
    this.modalTitle = modalTitle;
  }

  setBody(node) {
    if (document.querySelector('.modal')) {
      document.querySelector('.modal__body').innerHTML = node.outerHTML;
      return;
    }
    this.node = node;
  }

  open() {
      this.#createModal();
      document.body.classList.add('is-modal-open');
      document.body.append(this.modal);
      document.querySelector('.modal__body').innerHTML = this.node.outerHTML;
      document.querySelector('.modal__title').innerText = this.modalTitle;
  }

  close() {
    let item = document.querySelector(".modal");
    if (item) {
      item.remove();
      document.body.classList.remove('is-modal-open');
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }
}
