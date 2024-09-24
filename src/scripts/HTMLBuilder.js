export default class HTMLBuilder {
    #html = '';

    get text() { return this.#html; }

    append(text) {
        this.#html += text;
    }

    setOnElement(element) {
        element.innerHTML = this.#html;
    }
}