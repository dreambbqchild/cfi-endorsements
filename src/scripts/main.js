import '../style/main.css';

import './DateExtensions.js';
import './elements/ImportantDates.js';
import './elements/ModalDialog.js';
import './elements/QuickSelect.js';

import endorsements from './data/61-65h.js';
import HTMLBuilder from './services/HTMLBuilder.js';
import PDFBuilder from './services/PDFBuilder.js';
import ValidationForm from './elements/ValidationForm.js'

document.addEventListener("DOMContentLoaded", () => {
    const now = new Date();
    const bodyBuilder = new HTMLBuilder();
    const eleEndorsements = document.getElementById('endorsements');
    const {frmEndorsements} = document.forms;
    const {txtCfiName, txtCfiNumber, txtCfiExpDate, txtSigningDate} = frmEndorsements.elements;
    const clearEndorsements = document.getElementById('clear-endorsements');
    const modalDialog = document.querySelector('modal-dialog');

    const restoreCFIInformation = () => {
        txtCfiName.value = localStorage.getItem('txtCfiName');
        txtCfiNumber.value = localStorage.getItem('txtCfiNumber');
        txtCfiExpDate.value = localStorage.getItem('txtCfiExpDate');
        txtSigningDate.value = now.toLocaleDateString();
    };

    restoreCFIInformation();

    clearEndorsements.addEventListener('click', () => {
        frmEndorsements.reset();
        restoreCFIInformation();
    });

    const regulationLinkFn = (match) => {
        const validator = ValidationForm.keyExists(match) ? `<button type="button" data-far="${match}">Open Validator</button>` : '';
        return `<a target="_blank" href="https://www.ecfr.gov/current/title-14/section-${match}">${match}</a> ${validator}`
    }

    const textFieldSize = (placeholder) => {
        if(['applicable', 'name of'].indexOf(placeholder) >= 0)
            return 30;

        if(placeholder === 'date')
            return 10;

        return placeholder.length;
    }

    const fillInTheBlankFn = (match) => {
        const placeholder = match.substring(1, match.length - 1);
        const size = textFieldSize(placeholder);
        const value = placeholder === 'date' ? now.toLocaleDateString() : '';
        return `</span><input placeholder="${placeholder}" size="${size}" type="text" value="${value}"></input><span>`
    }

    for(const [sectionTitle, sectionEndorsement] of Object.entries(endorsements)) {
        bodyBuilder.append(`<section><h2>${sectionTitle}</h2>`);
        for(const [anchorName, endorsement] of Object.entries(sectionEndorsement))
        {
                const note = endorsement.note ? `<span class="highlight line-height-1em">${endorsement.note}</span><br>` : '';
                bodyBuilder.append(`<hr/><div>
                <input type="checkbox" data-section="${sectionTitle}" value="${anchorName}">
                <span>${anchorName}</span>
                <span>${endorsement.title.replace(/(91|61)\.\d+/g, regulationLinkFn)}</span>
                <div class="endorsement-body line-height-2em">${note}<span>${endorsement.body.replace(/\[[^\]]+\]/g, fillInTheBlankFn)}</span></div>
            </div>`);
        }
        bodyBuilder.append(`</section>`);
    }

    bodyBuilder.setOnElement(eleEndorsements);

    //Connect endorsement form buttons.
    const formRegistry = {};
    for(const button of eleEndorsements.querySelectorAll('button[data-far]')) {
        button.addEventListener('click', () => {
            const {far} = button.dataset;
            let form = formRegistry[far];
            if(!form){
                 form = ValidationForm.new(button.dataset.far);
                 form.addEventListener('closing', () => modalDialog.close());
                 formRegistry[far] = form;
            } else 
                form.reset();

            modalDialog.open(form);
        });
    }

    //Form Endorsement Submit
    frmEndorsements.addEventListener('submit', (e) => {
        e.preventDefault();

        txtCfiName.value = txtCfiName.value.trim();
        txtCfiNumber.value = txtCfiNumber.value.trim();
        txtCfiExpDate.value = txtCfiExpDate.value.trim();
        txtSigningDate.value = txtSigningDate.value.trim();

        if(!e.target.checkValidity())
        {
            alert('Please make sure you\'ve entered all your information for this endorsement.');
            return;
        }

        localStorage.setItem('txtCfiName', txtCfiName.value);
        localStorage.setItem('txtCfiNumber', txtCfiNumber.value);
        localStorage.setItem('txtCfiExpDate', txtCfiExpDate.value);

        const pdfBuilder = new PDFBuilder(txtCfiName.value, txtCfiNumber.value, `Expires ${txtCfiExpDate.value}`, txtSigningDate.value);
        const checked = document.querySelectorAll('input:checked');
        for(const checkbox of checked) {
            const body = [...checkbox.parentElement.querySelector('div').children]
                .filter(c => !c.classList.contains('highlight'))
                .map(c => c.value ?? c.innerText).join('');

            pdfBuilder.append(body);
        }

        pdfBuilder.print(txtCfiName.value);
    });
});