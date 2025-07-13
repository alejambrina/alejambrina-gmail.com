async function getMercadoLibrePublicationLinks(url) {
  try {
    console.log(`Fetching content from: ${url}`)
    const response = await fetch(url)
    const html = await response.text()

    console.log("HTML fetched. Parsing links...")

    // Expresión regular para encontrar enlaces a artículos de MercadoLibre (que contienen /MLA- seguido de números)
    // Esto busca atributos href que contengan "https://articulo.mercadolibre.com.ar/MLA-" seguido de dígitos y cualquier caracter hasta la siguiente comilla.
    const linkRegex = /href="(https:\/\/articulo\.mercadolibre\.com\.ar\/MLA-\d+[^"]*)"/g
    let match
    const uniqueLinks = new Set()

    while ((match = linkRegex.exec(html)) !== null) {
      // Asegurarse de que el enlace sea de un artículo y no de otra cosa (ej. filtros, categorías)
      if (match[1].includes("/MLA-")) {
        uniqueLinks.add(match[1])
      }
    }

    if (uniqueLinks.size > 0) {
      console.log(`Found ${uniqueLinks.size} unique publication links:`)
      uniqueLinks.forEach((link) => console.log(link))
    } else {
      console.log("No publication links found using the current pattern.")
      console.log(
        "Nota: El web scraping puede ser frágil y podría requerir ajustes si la estructura del sitio web cambia.",
      )
    }
  } catch (error) {
    console.error("Error fetching or parsing MercadoLibre links:", error)
  }
}

const mercadolibreUrl =
  "https://inmuebles.mercadolibre.com.ar/departamentos/venta/capital-federal/dueno-directo/departamento-capital-federal_NoIndex_True#applied_filter_id%3Dstate%26applied_filter_name%3DUbicaci%C3%B3n%26applied_filter_order%3D3%26applied_value_id%3DTUxBUENBUGw3M2E1%26applied_value_name%3DCapital+Federal%26applied_value_order%3D2%26applied_value_results%3D1118%26is_custom%3Dfalse"

getMercadoLibrePublicationLinks(mercadolibreUrl)
