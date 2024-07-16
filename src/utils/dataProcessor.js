let cachedData;

async function loadData() {
  if (cachedData) return cachedData;

  try {
    const response = await fetch('/api/semiologia');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    cachedData = await response.json();
    console.log("Data loaded:", cachedData.length, "items");
    console.log("Sample item:", cachedData[0]); // Log para ver la estructura de un item
    return cachedData;
  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
}

export async function processData(filters) {
  console.log("Processing data with filters:", filters);
  const data = await loadData();
  const filteredData = data.filter(item => {
    return (
      (item.Tipo_Categ === filters.tipo_categ || item.Tipo_Categ === "ND") &&
      (item.Sexo === filters.sexo || item.Sexo === "ND") &&
      (item.Grupo_Etario === filters.grupo_etario || item.Grupo_Etario === "ND") &&
      (item.Solo_Hijos === filters.hijos || item.Solo_Hijos === "No")
    );
  });
  console.log("Filtered data:", filteredData.length, "items");
  
  const result = filteredData
  .sort((a, b) => {
    if (a.Secuencia_tipos !== b.Secuencia_tipos) {
      return a.Secuencia_tipos - b.Secuencia_tipos;
    }
    return a.Secuencia_intra - b.Secuencia_intra;
  })
  .map(item => ({
    pregunta: item.Pregunta,
    awajun: item.Awajun,
    audios: item.audios  
  }));

  console.log("Processed result:", result.length, "items");
  if (result.length > 0) {
    console.log("Sample processed item:", result[0]);
  }
  return result;
}