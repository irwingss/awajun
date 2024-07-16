import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'semiologia_awajun.txt');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Procesando el archivo separado por tabulaciones
    const rows = fileContents.split('\n');
    const headers = rows[0].split('\t').map(header => header.trim());
    
    const data = rows.slice(1).map(row => {
      const values = row.split('\t');
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