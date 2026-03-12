import mysql from "mysql2/promise";

export default async function handler(req, res) {

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

      const connection = await mysql.createConnection({
        host: "TU_HOST",
        user: "TU_USER",
        password: "TU_PASSWORD",
        database: "fleet"
      });

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
        mensaje: "Reporte guardado"
      });

    } catch (error) {

      res.status(500).json(error);

    }

  }

  if (req.method === "GET") {

    const connection = await mysql.createConnection({
      host: "TU_HOST",
      user: "TU_USER",
      password: "TU_PASSWORD",
      database: "fleet"
    });

    const [rows] = await connection.execute("SELECT * FROM reportes");

    res.status(200).json(rows);

  }

}