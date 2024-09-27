import HTMLBuilder from '../services/HTMLBuilder';
import validations from '../validations/mod.js';

const GAP = 0.67;

const closingEvent = new CustomEvent("closing");

const valueValidators = {};

const convertOperator = (op) => {
    switch(op)
    {
        case '>=': return '≥';
        case '!': return '';
        default: return op
    }
}

const inputElement = (name, operator, right) => {
    if(operator === '!')
        return `<input type="checkbox" name="${name}" value="true">`;

    return `<input type="text" class="w-100p" name="${name}" required value="0" size="${right.value.toString().length}">`
}

const buildNextLevel = (formBuilder, section, sectionPath) => {
    if(section.validators) {
        for(const [index, validator] of section.validators.entries()) {
            const [key, fn] = Object.entries(validator)[0];
            const node = esprima.parseScript(fn.toString());
            const {operator, right} = node.body[0].expression.body;
            const label = sectionPath.slice(1).map(s => `(${s})`).join('');
            const name = sectionPath.map(s => s.replace(/\./g, '_')).join('_') + `_idx${index}`;

            if(!valueValidators[name]) {
                valueValidators[name] = {
                    fn,
                    errorMessage: `${key} must be ${convertOperator(operator)} ${operator === '!' ? 'true' : right.value}`
                };
            }

            formBuilder.append(`<tr>
                <td class="leaders"><span style="display: inline-block;">${label} ${key}</span></td>            
                <td>${inputElement(name, operator, right)}</td>
            </tr>`);
        }
    }

    if(section.subsections) {
        for(const subsection of section.subsections) {
            sectionPath.push(subsection.name);
            buildNextLevel(formBuilder, subsection, sectionPath);
            sectionPath.pop();
        }
    }
} 

export default class ValidationForm extends HTMLElement {
    static observedAttributes = ["far"];

    static new(validatorKey) {
        const formWrapper = document.createElement("validation-form");
        formWrapper.setAttribute('far', validatorKey);
        return formWrapper;
    }

    static keyExists(validatorKey) {
        return !!validations[validatorKey];
    }

    #form = null;
    #formBody = null;

    constructor() {
        super();
        
        this.#form = document.createElement('form');
        
        this.#formBody = document.createElement('div');
        this.#form.appendChild(this.#formBody);
        
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('box');
        buttonGroup.innerHTML = `<div class="box">
            <button class="margin-half">Validate</button>
            <button class="margin-half" type="button" data-cmd="clear">Clear</button>
            <button class="margin-half" type="button" data-cmd="close">Close</button>
        </div>`

        for(const button of buttonGroup.querySelectorAll('[data-cmd]')) {
            const {cmd} = button.dataset;
            if(cmd === 'clear')
                button.addEventListener('click', () => this.#form.reset());
            else if(cmd === 'close')
                button.addEventListener('click', () => this.dispatchEvent(closingEvent));
        }

        this.#form.appendChild(buttonGroup);

        this.#form.method = 'POST';
        this.#form.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        this.#form.addEventListener('reset', (e) => {
            for(const input of this.#formBody.querySelectorAll('input')) {
                const {errorMessage} = valueValidators[input.name];
                input.setCustomValidity(errorMessage);
            }
        });
    }

    reset() {
        this.#form.reset();
    }

    attributeChangedCallback(name, _, newValue) {
        if(name === 'far')
            this.#onFarChanged(newValue);
    }

    #onFarChanged(validatorKey) {
        if(!ValidationForm.keyExists(validatorKey))
            throw `Validation for ${validatorKey} not found!`;

        const formBuilder = new HTMLBuilder();
        const validation = validations[validatorKey];

        this.#form.setAttribute('name', `frm${validatorKey.replace(/\./g, '_')}`);

        formBuilder.append(`<h2 class="margin-none">§ ${validatorKey} ${validation.title} Validator</h2><table>`);
        buildNextLevel(formBuilder, validation, [validatorKey]);
        formBuilder.append('</table><important-dates></important-dates>')
        formBuilder.setOnElement(this.#formBody);

        for(const input of this.#formBody.querySelectorAll('input')) {
            const {fn, errorMessage} = valueValidators[input.name];
            input.setCustomValidity(errorMessage);

            if(input.type === 'checkbox') {
                input.addEventListener('click', e => {
                    const message = fn(input.checked) ? '' : errorMessage; 
                    input.setCustomValidity(message);
                });
            } else {
                input.addEventListener('blur', () => {
                    const message = fn(input.value) ? '' : errorMessage; 
                    input.setCustomValidity(message);
                });
            }
        }

        if(!this.#form.parentElement)
            this.appendChild(this.#form);
    }
}

customElements.define("validation-form", ValidationForm);