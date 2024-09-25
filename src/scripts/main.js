import '../style/main.css';

import './DateExtensions.js';
import './ImportantDates.js';

import endorsements from './data/61-65h.js';
import HTMLBuilder from './HTMLBuilder.js';
import PDFBuilder from './PDFBuilder.js';
import ValidationForm from './ValidationForm.js'

document.addEventListener("DOMContentLoaded", () => {
    const now = new Date();
    const bodyBuilder = new HTMLBuilder();
    const eleEndorsements = document.getElementById('endorsements');
    const {frmEndorsements} = document.forms;
    const {txtCfiName, txtCfiNumber, txtCfiExpDate, txtSigningDate} = frmEndorsements.elements;
    const popupOverlay = document.querySelector('.overlay');
    const popupContent = document.querySelector('.popup-content');

    txtCfiName.value = localStorage.getItem('txtCfiName');
    txtCfiNumber.value = localStorage.getItem('txtCfiNumber');
    txtCfiExpDate.value = localStorage.getItem('txtCfiExpDate');
    txtSigningDate.value = now.toLocaleDateString();

    const popupClose = () => {
        popupOverlay.classList.remove('show');

        for(const input of document.getElementById('root').querySelectorAll('input, a'))
            input.removeAttribute('tabindex');

        document.body.style.overflow = null;
    }

    const popupOpen = (child) => {
        if(popupContent.firstChild)
            popupContent.removeChild(popupContent.firstChild);

        popupContent.appendChild(child);
        popupOverlay.classList.add('show');

        for(const input of document.getElementById('root').querySelectorAll('input, a'))
            input.setAttribute('tabindex', -1);

        document.body.style.overflow = 'hidden';
    }

    const regulationLinkFn = (match) => {
        const validator = ValidationForm.keyExists(match) ? `<button type="button" data-far="${match}">Open Validator</button>` : '';
        return `<a target="_blank" href="https://www.ecfr.gov/current/title-14/section-${match}">${match}</a> ${validator}`
    }

    const fillInTheBlankFn = (match) => {
        const placeholder = match.substring(1, match.length - 1);
        return `</span><input placeholder="${placeholder}" size="${placeholder.length}" type="text"></input><span>`
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

    const formRegistry = {};
    for(const button of eleEndorsements.querySelectorAll('button[data-far]')) {
        button.addEventListener('click', () => {
            const {far} = button.dataset;
            let form = formRegistry[far];
            if(!form){
                 form = ValidationForm.new(button.dataset.far);
                 form.addEventListener('closing', popupClose);
                 formRegistry[far] = form;
            } else 
                form.reset();

            popupOpen(form);
        });
    }

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