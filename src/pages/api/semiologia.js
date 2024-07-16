import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'semiologia_awajun.csv');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Procesando el archivo CSV separado por punto y coma
    const rows = fileContents.split('\n');
    const headers = rows[0].split(';').map(header => header.trim());
    
    const data = rows.slice(1).map(row => {
      const values = row.split(';');
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index] ? values[index].trim() : '';
        return obj;
      }, {});
    });

    console.log("API: Sending", data.length, "items");
    console.log("Sample item:", data[0]); // Log para ver la estructura de un item

    // Configurar los headers para UTF-8
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: 'Error loading data' });
  }
}