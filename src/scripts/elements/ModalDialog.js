export default class ModalDialog extends HTMLElement {
    #modalOverlay = null;
    #modalContent = null;

    open(child) {
        if(this.#modalContent.firstChild)
            this.#modalContent.removeChild(this.#modalContent.firstChild);

        this.#modalContent.appendChild(child);
        this.#modalOverlay.classList.add('show');

        for(const input of document.getElementById('root').querySelectorAll('input, a'))
            input.setAttribute('tabindex', -1);

        document.body.style.overflow = 'hidden';
    }

    close() {
        this.#modalOverlay.classList.remove('show');

        for(const input of document.getElementById('root').querySelectorAll('input, a'))
            input.removeAttribute('tabindex');

        document.body.style.overflow = null;
    }

    connectedCallback() {
        this.innerHTML = `<div class="overlay">
            <div class="modal box">
                <div class="modal-content"></div>
            </div>
        </div>`;

        this.#modalOverlay = document.querySelector('.overlay');
        this.#modalContent = document.querySelector('.modal-content');
    }
}

customElements.define("modal-dialog", ModalDialog);