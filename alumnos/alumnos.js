const Router = require('koa-router');
const router = new Router({
    prefix: '/alumnos'
});

const alumnos = [
    {dni:12345678, nombre: 'Dibu Martinez', materia: "Fisica", nota:7},
    {dni:76538076, nombre: 'Lionel Messi', materia: "Educación Fisica", nota:10},
    {dni:53788316, nombre: 'Nicolas Otamendi', materia: "Biologia", nota:8},
    {dni:68936521, nombre: 'Lionel Escaloni', materia: "Geografia", nota:10},
    {dni:27481553, nombre: 'Julian Alvarez', materia: "Matematica", nota:9}
]

router.get('/', ctx => {
    ctx.body = {alumnos};
});

router.get('/promedio/:materia', ctx => {
    const materia = ctx.params.materia;
    let suma = 0;
    let cant = alumnos.filter(alumno => alumno.materia == materia).map(alumno => (suma += alumno.nota)).length;
    const promedio = suma / cant;
    ctx.body = {
        promedio: cant ? promedio : `No hay alumnos en la ${materia}` 
    } 
})

router.get('/:dni', ctx => {
    const alumno = alumnos.filter(a => a.dni == ctx.params.dni);
    if(alumno.length > 0) {
        ctx.body = {alumno: alumno[0]};
    }else{
        ctx.body = {error: 'Alumno no encontrado'};
    }

});

router.post ('/new', ctx => {
    if(!ctx.request.body.dni || !ctx.request.body.nombre || !ctx.request.body.materia || !ctx.request.body.nota) {
        ctx.response.status = 400;
        ctx.body = {error: "Faltan Datos"};
        return;
    } else {
        alumnos.push(alumno);
        ctx.response.status = 201;
        ctx.body = { alumno };
    }
});

router.put('/update/:dni', ctx => {
    const alumno = alumnos.filter(a => a.dni == ctx.params.dni);
    if(alumno.laugth > 0){
        if(!ctx.request.body.dni || !ctx.request.body.nombre || !ctx.request.body.materia || !ctx.request.body.nota) {
            ctx.response.status = 400;
            ctx.body = {error: "Faltan Datos"};
            return;
        }
        alumno[0].nombre = ctx.request.body.nombre;
        alumno[0].materia = ctx.request.body.materia;
        alumno[0].nota = ctx.request.body.nota;
        ctx.response.status = 201;
        ctx.body = { alumno: alumno[0] };
    }else{
        ctx.response.status = 404;
        ctx.body = { error: 'Alumno no encontrado' };
    }
});

router.delete('/delete/:dni', ctx => {
    const alumno = alumnos.filter(a => a.dni == ctx.params.dni);
    if(alumno.length > 0) {
        alumnos.splice(alumnos.indexOf(alumno[0]), 1);
        ctx.response.status = 200;
        ctx.body = {alumno: alumno[0]};
    }else {
        ctx.response.status = 404;
        ctx.body = { error: 'Alumno no encontrado' };
    } 
});

module.exports = router;