let reportes = [];

export default function handler(req, res) {

if(req.method === "POST"){

const data = req.body;

const nuevoReporte = {
id: reportes.length + 1,
id_vehiculo: data.id_vehiculo,
fecha: data.fecha,
latitud: data.latitud,
longitud: data.longitud,
descripcion_falla: data.descripcion_falla,
firma_conductor_base64: data.firma_conductor_base64
};

reportes.push(nuevoReporte);

return res.status(201).json({
id: nuevoReporte.id
});

}

if(req.method === "GET"){

return res.status(200).json(reportes);

}

res.status(405).json({error:"Metodo no permitido"});
}