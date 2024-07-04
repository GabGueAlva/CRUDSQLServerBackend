import sql from 'mssql'

const dbSettings = {
    user: "PruebaTecnica",
    password: "Antonela1*",
    server:"localhost",
    database:"Prueba",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

export async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings)
        return pool
    } catch (error) {
        console.error(error)
    }
}

export {sql}