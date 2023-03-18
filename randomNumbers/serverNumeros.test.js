import { strictEqual, deepStrictEqual } from 'assert';

import axios from 'axios';

const url = 'http://localhost:8080/';

const sendNumber = number => axios.post(url +'ingreso', { number });
const getNumbers = () => axios(url +'egreso');

describe('Testeando a que el server funcione de forma efectiva', function () {

    it('Deberia devolver un array vacio', async function () {
        const { data } = await getNumbers();
        strictEqual(data.numbers.length, 0);
    });



    it('Debería guardar y luego recibir 10 números consecutivos', async function () {
        for (let i = 0; i < 10; i++) {
            await sendNumber(i);
        }

        const { data } = await getNumbers();

        strictEqual(data.numbers.length, 10);
        deepStrictEqual(data.numbers, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    })
})