export default class QuickSelect extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<section>
            <div class="box">
                <span class="bold">Quick Fill</span>
            </div>
            <div class="box">
                <table>
                    <tr>
                        <td class="leaders">First, Middle Inital &amp; Last Name</td><td><input data-placeholder="First name, MI, Last name"></input></td>
                    </tr>
                    <tr>
                        <td class="leaders">he or she</td>
                        <td>
                            <select class="w-100p" data-placeholder="he or she">
                                <option>he</option>
                                <option>she</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="leaders">Make and Model of Aircraft</td><td><input data-placeholder="make and model"></input></td>
                    </tr>
                </table>
            </div>
            <div class="box">
                <button type="button" class="margin-half" data-applicable="Student Pilot Airplane" data-quick-select="A.3,A.4,A.6">Student Pilot Solo</button>
                <button type="button" class="margin-half" data-applicable="Student Pilot Airplane" data-quick-select="A.9,A.10">Student Pilot Cross Country Solo</button>
                <button type="button" class="margin-half" data-applicable="Sport Pilot Airplane" data-quick-select="A.1,A.2,A.20,A.24">Sport Pilot Endorsements</button>
                <button type="button" class="margin-half" data-applicable="Private Pilot Airplane" data-quick-select="A.1,A.2,A.33">Private Pilot Endorsements</button>
                <button type="button" class="margin-half" data-applicable="Intrument Pilot Airplane" data-quick-select="A.1,A.2,A.39,A.40">Instrument Pilot Endorsements</button>
                <button type="button" class="margin-half" data-applicable="Commerical Pilot Airplane" data-quick-select="A.1,A.2,A.35">Commerical Pilot Endorsements</button>
            </div>
        </section>`;

        for(const button of this.querySelectorAll('[data-quick-select]')) {
            button.addEventListener('click', () => {
                const values = button.dataset.quickSelect.split(',');
                const fillValues = {
                    applicable: button.dataset.applicable,
                    'name of': button.dataset.applicable,
                };
    
                for(const input of this.querySelectorAll('[data-placeholder]')){
                    fillValues[input.dataset.placeholder] = input.value;
                    if(input.value === 'he')
                        fillValues['him or her'] = 'him';
                    else if(input.value === 'she')
                        fillValues['him or her'] = 'her';
                }
                
                for(const value of values) {
                    const checkbox = document.querySelector(`input[value="${value}"]`);
                    checkbox.checked = true;
    
                    const placeholderInputs = checkbox.parentElement.querySelector('.endorsement-body').querySelectorAll('[placeholder]');
                    for(const placeholderInput of placeholderInputs) {
                        if(!fillValues[placeholderInput.placeholder])
                            continue;
    
                        placeholderInput.value = fillValues[placeholderInput.placeholder];
                    }
                }
            })
        }
    }
}

customElements.define("quick-select", QuickSelect);