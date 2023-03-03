import PersonasDaoMem from "../dao/PersonasDaoMem.js";
const IdGenerator = {
    id:1,
    next() {return this.id++}
}

const personaDao = new PersonasDaoMem()
console.log('----------------------------------------------------')
console.log('1) Obtener todas las personas')
console.log(personaDao.getAll())

console.log('----------------------------------------------------');
console.log('2) Corporar a una persona')
const persona1 = {id: IdGenerator.next(), nombre:'Sofia', apellido:'Alvarez', DNI: '7397102'}
console.log(personaDao.save(persona1))

console.log('----------------------------------------------------')
console.log('3)Incorporar otra persona')
const persona2 = {id: IdGenerator.next(), nombre:'Rodolfo', apellido:'Sanchez', DNI: '4961041'}
console.log(personaDao.save(persona2))

console.log('----------------------------------------------------')
console.log('4) Obtener todas las personas')
console.log(personaDao.getAll())

console.log('----------------------------------------------------')
console.log('5) Obtener una persona por id')
console.log(personaDao.getById(persona2.id))

console.log('----------------------------------------------------')
console.log('6) Actualizar una persona por id')
console.log(personaDao.updateById(persona2.id, {nombre: 'Ana Maria', apellido: 'Gomez', DNI: '0236485'}))

console.log('----------------------------------------------------')
console.log('7) Borrar una persona por id')
console.log(personaDao.deleteById(persona2.id))

console.log('----------------------------------------------------')
console.log('8) Obtener todas las personas')
console.log(personaDao.getAll())

console.log('----------------------------------------------------')
console.log('9) Borrar todas las personas')
personaDao.deleteAll()

console.log('----------------------------------------------------')
console.log('10) Obtener todas las personas')
console.log(personaDao.getAll())