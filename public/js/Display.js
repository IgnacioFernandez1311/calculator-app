class Display {
    constructor(displayPreviousValue, displayCurrentValue) {
        this.displayPreviousValue = displayPreviousValue;
        this.displayCurrentValue = displayCurrentValue;
        this.calculator = new Calculator();
        this.operationType = undefined;
        this.currentValue = '';
        this.previousValue = '';
        this.signs = {
            add : '+',
            substract : '-',
            times : 'X',
            divide : '%' 
        };
    }

    compute(type) {
        this.operationType !== 'equal' && this.calculate();
        this.operationType = type;
        this.previousValue = this.currentValue || this.previousValue;
        this.currentValue = '';
        this.printValues();

    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0,-1);
        this.printValues();
    }

    deleteAll() {
        this.currentValue = '';
        this.previousValue = '';
        this.operationType = undefined;
        this.printValues();
    }

    addNumber(number) {
        if(number === '.' && this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue.toString() + number.toString();
        this.printValues(); 
    }


    printValues() {
        this.displayCurrentValue.textContent = this.currentValue;
        this.displayPreviousValue.textContent = `${this.previousValue} ${this.signs[this.operationType] || ''}`;
    }

    calculate() {
        const previousValue = parseFloat(this.previousValue);
        const currentValue = parseFloat(this.currentValue);

        if(isNaN(currentValue) || isNaN(previousValue)) return;
        this.currentValue = this.calculator[this.operationType](previousValue, currentValue);
    }
}