import express from 'express';
import session from 'express-session';
import apiRoutes from './routes/indexRoutes.js';
import * as dotenv from 'dotenv';
import passport from 'passport';
import singletonRouter from "./routes/singleton.routes";
import crypto from "crypto";
import { Strategy as LocalStrategy } from 'passport-local';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from "graphql";

dotenv.config();

const recordatorioSchema = buildSchema(`
input RecordatorioInput {
    titulo: String,
    descripcion: String,
    timestamp: Float,
    }
    type Recordatorio {
        id: ID!
        titulo: String
        descripcion: String
        timestamp: Float
    }
    type Query {
        getRecordatorios: [Recordatorio],
    }
    type Mutation {
        createRecordatorio(datos: RecordatorioInput): Recordatorio,
    }
`);

class Recordatorio {
    constructor(id, {titulo, descripcion, timestamp}) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.timestamp = timestamp
    }
}

const Recordatorios = [];
function getRecordatorios() {
    return Recordatorios;
}

function createRecordatorio({ datos }) {
    const id = crypto.randomBytes(10).toString("hex");
    const nuevoRecordatorio = new Recordatorio(id, datos);
    Recordatorios.push(nuevoRecordatorio);
    return nuevoRecordatorio;
}

const users = [];

passport.use('register', new LocalStrategy({
    passReqToCallback: true
    }, (req, name, email, password, done) => {
    
        const user = users.find(u => u.name === name)
    
        if (user) {
            return done('User already registered.')
        }
    
        const newUser = {
            name,
            email,
            password,
        };

        usuarios.push(newUser)
    
        return done(null, newUser)
    }
));

passport.use('login', new LocalStrategy((name, email, password, done) => {
    const user = users.find(u => u.name === name)

    if (!user) {
        return done(null, false)
    }

    if (user.password !== password) {
        return done(null, false)
    }

    if (user.email !== email) {
        return done(null, false)
    }

    user.contador = 0;

    return done(null, user)
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.name);
});

passport.deserializeUser(function (name, done) {
    const user = users.find(u => u.name === name)
    done(null, user);
});

const app = express();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        //Expires in 10 (minutes)
        maxAge: 600000
    }
}))



app.use("/", apiRoutes);
app.use("/datos", singletonRouter);
app.use("/graphql", graphqlHTTP({
    schema: recordatorioSchema,
    rootValue: {
        getRecordatorios,
        createRecordatorio,
    },
    graphiql: false,
}))

app.use(passport.initialize());

app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));


const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}. at ${new Date().toLocaleString()}`)
});

server.on("error", (err) => {
    console.log(err);
})