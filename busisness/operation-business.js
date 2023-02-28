import {suma, resta, mult, div} from 'sb-calculadora';
import {save, getAll as getAll0ps} from '../persistence/operadores-persistentes' ;

async function sum (a,b) {
    const result0p = suma (a, b);
    await save({ params: [a, b] , result: result0p, operation: 'suma', tiemstamp: new Date.now ()});
    return result0p;
};

async function substract (a, b) {
    const result0p = resta(a, b);
    await save({ params: [a, b] , result: result0p, operation:'restar', tiemstamp: new Date.now ()});
    return result0p;
}


async function multiply(a,b) {
    const result0p = mult(a, b);
    await save({params: [a, b] , result: result0p, operation:'multiplicación', tiemstamp: new Date.now ()});
    return result0p;
};

async function divide(a, b) {
    const result0p = div(a, b);
    await save({params: [a, b] , result: result0p, operation:'dividir', tiemstamp: new Date.now ()});
    return result0p;
};

async function listAll() {
    return await getAll0ps(); 
}

export {
    sum,
    substract,
    multiply,
    divide,
    getAll
};