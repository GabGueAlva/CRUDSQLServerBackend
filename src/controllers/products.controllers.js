import { getConnection } from "../database/connection.js"
import { sql } from "../database/connection.js"

export const getDatabase = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request().query('SELECT * FROM alumno')
    console.log(result)
    res.json(result.recordset)
}

export const getAlumno = async (req, res) => {

    const pool = await getConnection()

    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .query('SELECT * FROM alumno WHERE id = @id')
    console.log(result)

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
            message: "Alumno no encontrado"
        })
    }
    
    return res.json(result.recordset[0])
}

export const createData = async (req, res) => {
    const { nombre, apellido, email, curso_id } = req.body

    if(nombre == null || apellido == null || email ==null || curso_id == null){
        return res.status(400).json({message: "Bad request"})
    }

    const pool = await getConnection()

    const result = await pool.request()
    .input('nombre', sql.VarChar, req.body.nombre)
    .input('apellido', sql.VarChar, req.body.apellido)
    .input('email', sql.VarChar, req.body.email)
    .input('curso_id', sql.Int, req.body.curso_id)
    .query("INSERT INTO alumno (nombre, apellido, email, curso_id) VALUES (@nombre, @apellido, @email, @curso_id); SELECT SCOPE_IDENTITY() AS id")
    console.log(result)
    res.json({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        curso_id: req.body.curso_id
    })
}

export const deleteAlumno = async (req, res) => {

    const pool = await getConnection()

    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .query('DELETE FROM alumno WHERE id = @id')
    console.log(result)

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
            message: "Alumno no encontrado"
        })
    }
    
    return res.json({ message: "Almuno eliminado"})
}

export const updateAlumno = async (req, res) => {

    const { id } = req.params.id

    const pool = await getConnection()

    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .input('nombre', sql.VarChar, req.body.nombre)
    .input('apellido', sql.VarChar, req.body.apellido)
    .input('email', sql.VarChar, req.body.email)
    .input('curso_id', sql.Int, req.body.curso_id)
    .query('UPDATE alumno SET nombre = @nombre, apellido = @apellido, email = @email, curso_id = @curso_id WHERE id = @id')

    console.log(result)

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
            message: "Alumno no encontrado"
        })
    }
    
    res.json({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        curso_id: req.body.curso_id
    })
}