import endorsements from './61-65h.js';
import HTMLBuilder from './HTMLBuilder.js';
import PDFBuilder from './PDFBuilder.js';

const bodyBuilder = new HTMLBuilder();
const eleEndorsements = document.getElementById('endorsements');
const {txtCfiName, txtCfiNumber, txtCfiExpDate, txtSigningDate} = document.forms[0].elements;

txtCfiName.value = localStorage.getItem('txtCfiName');
txtCfiNumber.value = localStorage.getItem('txtCfiNumber');
txtCfiExpDate.value = localStorage.getItem('txtCfiExpDate');
txtSigningDate.value = new Date().toLocaleDateString();

const regulationLinkFn = (match) => {
    return `<a target="_blank" href="https://www.ecfr.gov/current/title-14/section-${match}">${match}</a>`
}

const fillInTheBlankFn = (match) => {
    const placeholder = match.substring(1, match.length - 1);
    return `</span><input placeholder="${placeholder}" size="${placeholder.length}" type="text"></input><span>`
}

for(const [sectionTitle, sectionEndorsement] of Object.entries(endorsements)) {
    bodyBuilder.append(`<h1>${sectionTitle}</h1>`);
    for(const [anchorName, endorsement] of Object.entries(sectionEndorsement))
    {
            const note = endorsement.note ? `<span class="highlight">${endorsement.note}</span><br>` : '';
            bodyBuilder.append(`<div>
            <input type="checkbox" data-section="${sectionTitle}" value="${anchorName}">
            <span>${anchorName}</span>
            <span>${endorsement.title.replace(/(91|61)\.\d+/g, regulationLinkFn)}</span>
            <div>${note}<span>${endorsement.body.replace(/\[[^\]]+\]/g, fillInTheBlankFn)}</span></div>
        </div>`);
    }
}

bodyBuilder.setOnElement(eleEndorsements);

document.querySelector('button').addEventListener('click', () => {
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

    pdfBuilder.renderTo(document.querySelector('embed'));
});