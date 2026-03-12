import mysql from "mysql2/promise";

export default async function handler(req, res) {

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  // GUARDAR REPORTE
  if (req.method === "POST") {

    try {

      const {
        id_vehiculo,
        fecha,
        latitud,
        longitud,
        descripcion_falla,
        firma_conductor_base64
      } = req.body;

      const [result] = await connection.execute(
        `INSERT INTO reportes 
        (id_vehiculo,fecha,latitud,longitud,descripcion_falla,firma_conductor_base64)
        VALUES (?,?,?,?,?,?)`,
        [
          id_vehiculo,
          fecha,
          latitud,
          longitud,
          descripcion_falla,
          firma_conductor_base64
        ]
      );

      res.status(201).json({
        id: result.insertId,
        mensaje: "Reporte guardado correctamente"
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }

  // OBTENER REPORTES
  if (req.method === "GET") {

    const [rows] = await connection.execute(
      "SELECT * FROM reportes ORDER BY id DESC"
    );

    res.status(200).json(rows);

  }

}