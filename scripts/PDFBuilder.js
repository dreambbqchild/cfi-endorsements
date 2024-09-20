const { jsPDF } = jspdf;

const LINE_WIDTH = 0.02;

class SignatureBuilder {
    #rightX = 8;
    #doc = null;

    constructor(doc) {
        this.#doc = doc;
    }

    rtlAdd(text) {
        const leftX = this.#rightX - this.#doc.getTextWidth(text) * 1.75;
        const result = { leftX, rightX: this.#rightX, text };
        this.#rightX = leftX - 0.1;

        return result;
    }

    final(text) {
        return {leftX: 0.5, rightX: this.#rightX, text};
    }
}

export default class PDFBuilder {
    #doc = new jsPDF('p', 'in', [8.5, 11]);
    #docY = 0.5;

    #signatureParts = [];

    constructor(cfiName, cfiNumber, expDate, signDate) {
        this.#doc.setFont('times', 'normal');
        this.#doc.setFontSize(12);
        this.#doc.setLineWidth(LINE_WIDTH); 

        const signatureBuilder = new SignatureBuilder(this.#doc);

        this.#signatureParts.push(signatureBuilder.rtlAdd(signDate));
        this.#signatureParts.push(signatureBuilder.rtlAdd(expDate));
        this.#signatureParts.push(signatureBuilder.rtlAdd(cfiNumber));
        this.#signatureParts.push(signatureBuilder.final(cfiName));
    }

    append(text) {
        const textLines = this.#doc.splitTextToSize(text, 7.5);
        let height = 0;
        for(const line of textLines) {
            const dim = this.#doc.getTextDimensions(line);
            height = dim.h;

            this.#doc.text(0.5, this.#docY, line);
            this.#docY += dim.h;
        }

        this.#docY += height * 2;

        for(const part of this.#signatureParts)
            this.#doc.line(part.leftX, this.#docY, part.rightX, this.#docY); 

        this.#docY += LINE_WIDTH + height;
        for(const part of this.#signatureParts)
            this.#doc.text(part.leftX, this.#docY, part.text);

        this.#docY += height * 2;
    }

    save() {        
        this.#doc.save('Endorsements.pdf');
    }

    renderTo(embed) {
        embed.src = this.#doc.output('datauristring');
    }
}