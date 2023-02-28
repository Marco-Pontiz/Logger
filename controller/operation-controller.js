import { sum, substract, multiply, divide, getAll } from '../busisness/operation-business';

const suma0ps = async(req, res) => {
    let {a,b} = req.query;
    res.send(`La suma de ${a} y ${b} es ${await sum (Number(a), Number(b))}`);
}

const resta0ps = async(req, res) => {
    let {a,b} = req.query;
    res.send(`La resta de ${a} y ${b} es ${await substract (Number(a), Number(b))}`);
}

const multiplicar0ps = async(req, res) => {
    let {a,b} = req.query;
    res.send(`La multiplicacion de ${a} y ${b} es ${await multiply (Number(a), Number(b))}`);
}

const dividir0ps = async(req, res) => {
    let {a,b} = req.query;
    res.send(`La division de ${a} y ${b} es ${await divide (Number(a), Number(b))}`);
}

const getAll0ps = async (req,res) => res.send(await getAll());

export default {
    suma0ps,
    resta0ps,
    multiplicar0ps,
    dividir0ps,
    getAll0ps
};