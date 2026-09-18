export interface Product {
  id: string;
  nameKey: string;
  descKey: string;
  image: string;
  categoryEn: string;
  categoryEs: string;
  technicalSheet: string;
  certificateSheet: string;
  safetySheet: string;
  affidavitSheet: string;
  detailsEn: {
    about: string;
    uses: string[];
    packaging: string[];
    certifications: string[];
    chemicalPresentation: string;
  };
  detailsEs: {
    about: string;
    uses: string[];
    packaging: string[];
    certifications: string[];
    chemicalPresentation: string;
  };
  buyOnline?: string;
  buyTiendaNube?: string;
  buyMercadoLibre?: string;
}

export const products: Product[] = [
  {
    id: "MINIT-wood",
    nameKey: "products.wood.name",
    descKey: "products.wood.desc",
    image: "/Bidones/maderas.png",
    categoryEn: "Wood Protection",
    categoryEs: "Protección de Madera",
    technicalSheet: "/documentos/Maderas/fichaTecnicaMadera.pdf",
    certificateSheet: "/documentos/Maderas/certificadoMadera.pdf",
    safetySheet: "/documentos/Maderas/hojaSeguridadMadera.pdf",
    affidavitSheet: "/documentos/declaracion de aplicacion.pdf",
    buyOnline: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    buyTiendaNube: "https://minitignifugos.mitiendanube.com/productos/",
    buyMercadoLibre: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    detailsEn: {
      about: "<strong>MINIT Woods</strong> is a <strong>Class A</strong> fire retardant and wood preservative made from natural salts. This non toxic product, colorless and odorless, penetrates deeply without altering the material's natural color or texture. <br> Besides preventing ignition and fire spread, it <strong>reduces smoke and toxic gas</strong> emissions by up to 70%. Being <strong>100% biodegradable, non-toxic, and pet-friendly</strong>, it is the safest, eco-friendly solution for protecting wood, cellulose, and composite structures.<br> When used on wood, it also prevents the presence of <strong>fungi</strong>, <strong>bacteria</strong> and <strong>insects</strong> (moths and termites).",
      uses: [
        "Wood",
        "Cardboard",
        "Straw",
        "Paper",
        "MDF",
        "OSB",
        "Agglomerate"
      ],
      packaging: [
        "Bags: 25 kg",
        "Containers: 5 and 10 liters",
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "The impregnating chemical comes in powder form in a container with the precise amount needed for dilution with regular water until the container is full. The 25 kg powder format offers maximum flexibility and cost-effectiveness for large-scale applications. Dilution ratio: <strong>1 kg of powder to 10 liters of water</strong>.",
    },
    detailsEs: {
      about: "<strong>MINIT maderas</strong> es un retardante de fuego <strong>Clase A</strong> y preservador a base de sales naturales. Este producto no tóxico, incoloro e inodoro, penetra sin alterar la textura o color del material. <br> Además de prevenir la ignición y propagación del fuego, reduce la emisión de <strong> humos y gases tóxicos </strong>hasta un 70%. Al ser <strong>100% biodegradable, no tóxico y pet-friendly</strong>, es la solución ecológica ideal para proteger madera, celulosa y derivados. <br> En el caso del uso en madera, también previene la presencia de <strong>hongos</strong>, <strong>bacterias</strong> e <strong>insectos</strong> (polillas y termitas).",
      uses: [
        "Maderas",
        "Cartón",
        "Paja",
        "Papel",
        "MDF",
        "OSB",
        "Aglomerados",
      ],
      packaging: [
        "Granel: bolsas de 25 kg.",
        "Bidón: 5 y 10 litros.",
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "El químico impregnante se presenta en polvo dentro de un envase con la cantidad justa para su dilución con agua regular hasta completar el envase. El formato en polvo de 25 kg proporciona máxima flexibilidad y rentabilidad para aplicaciones a gran escala. Relación de dilución: <strong>1 kilo de polvo a 10 litros de agua</strong>.",
    },
  },
  {
    id: "MINIT-textile",
    nameKey: "products.textile.name",
    descKey: "products.textile.desc",
    image: "/Bidones/textiles.png",
    categoryEn: "Textile Protection",
    categoryEs: "Protección Textil",
    technicalSheet: "/documentos/Textiles/fichaTecnicaTextil.pdf",
    certificateSheet: "/documentos/Textiles/certificadoTextil.pdf",
    safetySheet: "/documentos/Textiles/hojaSeguridadTextil.pdf",
    affidavitSheet: "/documentos/declaracion de aplicacion.pdf",
    buyOnline: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    buyTiendaNube: "https://minitignifugos.mitiendanube.com/productos/",
    buyMercadoLibre: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    detailsEn: {
      about: "<strong>MINIT Textile</strong> is a <strong>Class A </strong>fire retardant made from natural salts. It is a colorless, odorless, and non-toxic liquid featuring highly absorbent active penetrating agents, providing <strong>highly effective fire-inhibiting protection</strong>.<br> It prevents fire spread and <strong>reduces smoke and gas generation by up to 70%</strong>. It does not alter the toxicity of the smoke; rather, it decreases the overall amount of smoke by suppressing the fire. <br> The product is <strong>100% biodegradable, non-toxic, and pet-friendly</strong>, offering the safest, eco-friendly solution for protecting fabrics.",
      uses: [
        "Natural and synthetic fabrics",
        "Curtains and drapes",
        "Upholstery and furniture",
        "Theater and stage curtains",
        "Hotel and hospitality textiles",
        "Protective clothing and workwear",
      ],
      packaging: [
        "Containers: 5 and 10 liters",
        "Bulk: 25 kg",
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "The impregnating chemical comes in powder form in a container with the precise amount needed for dilution with regular water until the container is full. The 25 kg powder format offers maximum flexibility and cost-effectiveness for large-scale applications. Dilution ratio: <strong>1 kg of powder to 10 liters of water</strong>.",
    },
    detailsEs: {
      about: "<strong>MINIT Textil</strong> es un retardante de fuego <strong>Clase A</strong> elaborado a partir de sales naturales. Es un líquido incoloro, inodoro y no tóxico que cuenta con agentes activos, dispersantes y penetrantes completamente absorbentes, ofreciendo una <strong>protección inhibidora de fuego de alta efectividad</strong>.<br> Evita la propagación del fuego y <strong>reduce la generación de humo y gases hasta un 70%</strong>. No modifica la toxicidad del humo del material tratado, sino que disminuye su cantidad al reducir el fuego. <br> El producto es <strong>100% biodegradable, no tóxico y pet-friendly</strong>, ofreciendo la solución más segura y ecológica para la protección de telas.",
      uses: [
        "Telas naturales y sintéticas",
        "Cortinas y cortinados",
        "Tapicería y muebles",
        "Cortinas de teatro y escenario",
        "Textiles para hoteles y hospitalidad",
        "Ropa protectora y de trabajo",
      ],
      packaging: [
        "Envases: 5 y 10 litros",
        "Granel: 25 kg",
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "El químico impregnante se presenta en polvo dentro de un envase con la cantidad justa para su dilución con agua regular hasta completar el envase. El formato en polvo de 25 kg proporciona máxima flexibilidad y rentabilidad para aplicaciones a gran escala. Relación de dilución: <strong>1 kilo de polvo a 10 litros de agua</strong>.",
    },
  },
  {
    id: "MINIT-total",
    nameKey: "products.total.name",
    descKey: "products.total.desc",
    image: "/Bidones/total.png",
    categoryEn: "total Protection",
    categoryEs: "Protección TOTAL",
    technicalSheet: "/documentos/Total/fichaTecnicaTotal.pdf",
    certificateSheet: "/documentos/Total/certificadoTotal.pdf",
    safetySheet: "/documentos/Total/hojaSeguridadTotal.pdf",
    affidavitSheet: "/documentos/declaracion de aplicacion.pdf",
    buyOnline: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    buyTiendaNube: "https://minitignifugos.mitiendanube.com/productos/",
    buyMercadoLibre: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    detailsEn: {
      about: "<strong>MINIT Total</strong> is a <strong>Class A </strong>fire retardant made from natural salts. It is a colorless, odorless, and non-toxic liquid featuring highly absorbent active penetrating agents, providing <strong>highly effective fire-inhibiting protection</strong>.<br> It prevents fire spread and <strong>reduces smoke and gas generation by up to 70%</strong>. It does not alter the toxicity of the smoke; rather, it decreases the overall amount of smoke by suppressing the fire. <br> The product is <strong>100% biodegradable, non-toxic, and pet-friendly</strong>, offering the safest, eco-friendly solution for protecting for all types of materials.",
      uses: [
        "Wood, Straw",
        "Paper, Cardboard",
        "MDF, OSB, Particleboard",
        "Natural and Synthetic Textiles",
        "Carpets, Upholstery",
        "Workwear",
        "Foam Panels"
      ],
      packaging: [
        "Containers: 1, 5 and 10 liters",
        "Bulk: 25 kg powder",
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "The impregnating chemical comes in powder form in a container with the precise amount needed for dilution with regular water until the container is full. The 25 kg powder format offers maximum flexibility and cost-effectiveness for large-scale applications. Dilution ratio: <strong>1 kg of powder to 10 liters of water</strong>.",
    },
    detailsEs: {
      about: "<strong>MINIT Total</strong> es un retardante de fuego <strong>Clase A</strong> elaborado a partir de sales naturales. Es un líquido incoloro, inodoro y no tóxico que cuenta con agentes activos, dispersantes y penetrantes completamente absorbentes, ofreciendo una <strong>protección inhibidora de fuego de alta efectividad</strong>.<br> Evita la propagación del fuego y <strong>reduce la generación de humo y gases hasta un 70%</strong>. No modifica la toxicidad del humo del material tratado, sino que disminuye su cantidad al reducir el fuego. <br> El producto es <strong>100% biodegradable, no tóxico y pet-friendly</strong>, ofreciendo la solución más segura y ecológica para la protección de todo tipo de materiales.",
      uses: [
        "Maderas y Paja",
        "Papel Cartón",
        "MDF, OSB y Aglomerados",
        "Textiles naturales y sintéticos",
        "Alfombras y Tapizados",
        "Ropa de trabajo",
        "Paneles goma espuma"
      ],
      packaging: [
        "Envases: 1, 5 y 10 litros",
        "Granel: Bolsas de 25 kg en polvo",

      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "El químico impregnante se presenta en polvo dentro de un envase con la cantidad justa para su dilución con agua regular hasta completar el envase. El formato en polvo de 25 kgs proporciona máxima flexibilidad y rentabilidad para aplicaciones a gran escala. Relación de dilución: <strong>1 kilo de polvo a 10 litros de agua</strong>.",
    },
  },
  {
    id: "MINIT-lacas",
    nameKey: "products.lacas.name",
    descKey: "products.lacas.desc",
    image: "/Bidones/hidrolaca.png",
    categoryEn: "Protection with Lacquers",
    categoryEs: "Protección con Lacas",
    technicalSheet: "/documentos/Laca/fichaTecnicaLaca.pdf",
    certificateSheet: "/documentos/Laca/certificadoLaca.pdf",
    safetySheet: "/documentos/Laca/hojaSeguridadLaca.pdf",
    affidavitSheet: "/documentos/declaracion de aplicacion.pdf",
    buyOnline: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    buyTiendaNube: "https://minitignifugos.mitiendanube.com/productos/",
    buyMercadoLibre: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    detailsEn: {
      about: "<strong>MINIT Fire-Retardant Hydro-Lacquer</strong> is a highly effective, transparent, water-based fire retardant. It slows the rate of fire spread and produces low thermal conductivity, protecting the treated surface from the effects of fire. In addition to its excellent surface coating protection, its fire-retardant action significantly <strong>reduces smoke emissions</strong>.",
      uses: [
        "Wood surfaces",
        "Floors and Decks",
        "Columns and Roofs",
        "Furniture",
        "Sceneries and Stages"
      ],
      packaging: [
        "Containers: 1 and 5 liters"
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "Apply with a brush or roller to surfaces <strong>free of grease, rust, and dust</strong>. If using a spray gun, dilute the mixture with water to achieve the desired consistency.",
    },
    detailsEs: {
      about: "<strong>MINIT Hidro-Laca Ignífuga</strong> es un retardante de fuego transparente y de base acuosa muy efectivo. Demora la velocidad de propagación del fuego y produce una baja conductividad térmica protegiendo la superficie tratada de la acción del fuego. Además de su excelente protección de recubrimiento superficial, su acción ignífuga <strong>disminuye notablemente la emisión de humos</strong>.",
      uses: [
        "Maderas",
        "Pisos",
        "Columnas y Techos",
        "Muebles",
        "Escenografías y Escenarios"
      ],
      packaging: [
        "Envases: Botellas de 1 litro y Bidones de 5 litros"
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "Se aplica con pincel o rodillo sobre superficies <strong>libres de grasas, óxido y polvo</strong>. Si va a usar soplete, diluya la mezcla con agua hasta alcanzar la densidad deseada.",
    },
  },
  {
    id: "MINIT-Latex",
    nameKey: "products.latex.name",
    descKey: "products.latex.desc",
    image: "/Bidones/latex.png",
    categoryEn: "Protection of Latex",
    categoryEs: "Protección de Latex",
    technicalSheet: "/documentos/Latex/fichaTecnicaLatex.pdf",
    certificateSheet: "/documentos/Latex/certificadoLatex.pdf",
    safetySheet: "/documentos/Latex/hojaSeguridadLatex.pdf",
    affidavitSheet: "/documentos/declaracion de aplicacion.pdf",
    buyOnline: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    buyTiendaNube: "https://minitignifugos.mitiendanube.com/productos/",
    buyMercadoLibre: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    detailsEn: {
      about: "<strong>MINIT Latex</strong> is a water-based, fire-retardant paint. It is applied like any other paint and is a highly effective fire retardant. It slows the rate of fire spread and produces low thermal conductivity. In the presence of fire, it acts as a barrier with low intumescence and, thanks to its refractory nanoparticles, <strong>withstands temperatures up to 960°C</strong>. Furthermore, its fire-retardant properties reduce smoke emissions.",
      uses: [
        "Wood and Masonry",
        "Cement boards",
        "Walls, columns and roofs",
        "Durlock boards",
        "Stands and Sceneries"
      ],
      packaging: [
        "Containers: 1,4,10 and 20 liters"
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "Apply with a brush or roller to surfaces <strong>free of grease, rust, and dust</strong>. If using a spray gun, dilute the mixture with water to achieve the desired consistency.",
    },
    detailsEs: {
      about: "<strong>MINIT Latex</strong> es una pintura ignifuga de base acuosa. Se aplica como cualquier otra pintura, es un retardante ignífugo muy efectivo. Demora la velocidad de propagación del fuego y produce una baja conductividad térmica. En presencia de fuego, actúa como una barrera con baja intumescencia y gracias a sus nano-partículas refractarias, <strong>resiste temperaturas de hasta 960°C</strong>. Además, su acción ignífuga disminuye la emisión de humos.",
      uses: [
        "Maderas y Mampostería",
        "Paredes, columnas y techos",
        "Placas de Durlock",
        "Placas de Cemeticias",
        "Escenografías y stands"
      ],
      packaging: [
        "Envases: 1,4, 10 y 20 litros"
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "Se aplica con pincel o rodillo sobre superficies <strong>libres de grasas, óxido y polvo</strong>. Si va a usar soplete, diluya la mezcla con agua hasta alcanzar la densidad deseada.",
    },
  },
  {
    id: "MINIT-Intumescente",
    nameKey: "products.intumescente.name",
    descKey: "products.intumescente.desc",
    image: "/Bidones/intumescente.png",
    categoryEn: "Protection with Intumescent",
    categoryEs: "Protección con Intumescente",
    technicalSheet: "/documentos/Intumescente/fichaTecnicaIntumescente.pdf",
    certificateSheet: "/documentos/Intumescente/certificadoIntumescente.pdf",
    safetySheet: "/documentos/Intumescente/hojaSeguridadIntumescente.pdf",
    affidavitSheet: "/documentos/declaracion de aplicacion.pdf",
    buyOnline: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    buyTiendaNube: "https://minitignifugos.mitiendanube.com/productos/",
    buyMercadoLibre: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    detailsEn: {
      about: "<strong>MINIT Intumescent FR936 </strong> is a highly effective fire retardant and thermal insulator. It slows the rate of fire spread and produces low thermal conductivity. In the presence of fire, it acts as a high-intumescent thermal insulating barrier that, thanks to its refractory nanoparticles, <strong>withstands temperatures up to 960°C</strong>. Furthermore, its fire-retardant properties reduce smoke emission.",
      uses: [
        "Wood, iron and metals",
        "All types of metal sheets",
        "Floors, columns and roofs",
        "Furniture",
        "Sceneries and stages"
      ],
      packaging: [
        "Containers: 1,4,10 and 20 liters"
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "Apply with a brush or roller to surfaces <strong>free of grease, rust, and dust</strong>. If using a spray gun, dilute the mixture with water to achieve the desired consistency.",
    },
    detailsEs: {
      about: "<strong>MINIT Intumescente FR936 </strong> Es un retardante ignífugo y aislante térmico muy efectivo. Demora la velocidad de propagación del fuego y produce una baja conductividad térmica. En presencia de fuego, actúa como una barrera aislante térmica con alta intumescencia que, gracias a sus nano-partículas refractarias, <strong>resiste temperaturas de hasta 960°C</strong>. Además, su acción ignífuga disminuye la emisión de humos.",
      uses: [
        "Maderas, hierro y metales",
        "Todo tipo de chapas",
        "Pisos, columnas y techos",
        "Muebles",
        "Escenografías y escenarios"
      ],
      packaging: [
        "Envases: 1,4, 10 y 20 litros"
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "Se aplica con pincel o rodillo sobre superficies <strong>libres de grasas, óxido y polvo</strong>. Si va a usar soplete, diluya la mezcla con agua hasta alcanzar la densidad deseada.",
    },
  },
  {
    id: "MINIT-HidroEsmalte",
    nameKey: "products.hidroEsmalte.name",
    descKey: "products.hidroEsmalte.desc",
    image: "/Bidones/hidroEsmalte.png",
    categoryEn: "Water-based fire retardant paint",
    categoryEs: "Pintura ignífuga de base acuosa",
    technicalSheet: "/documentos/HidroEsmalte/fichaTecnicaHidroEsmalte.pdf",
    certificateSheet: "/documentos/HidroEsmalte/certificadoHidroEsmalte.pdf",
    safetySheet: "/documentos/HidroEsmalte/hojaSeguridadHidroEsmalte.pdf",
    affidavitSheet: "/documentos/declaracion de aplicacion.pdf",
    buyOnline: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    buyTiendaNube: "https://minitignifugos.mitiendanube.com/productos/",
    buyMercadoLibre: "https://www.mercadolibre.com.ar/pagina/minitignifugos#client=SEARCH&component_id=menu_home&component=menu_home&label=Inicio&tracking_id=4e609e7cdcf849750f9376d5069a6a19&global_position=1",
    detailsEn: {
      about: "<strong>MINIT Hidro Esmalte </strong> is a water-based fire retardant paint. It is applied like any other paint, and is a very effective fire retardant. It slows the rate of fire spread and produces low thermal conductivity. In the presence of fire, it acts as a barrier with low intumescence and thanks to its refractory nanoparticles, <strong> withstands temperatures of up to 960°C</strong>. Furthermore, its fire-retardant properties reduce smoke emission.",
      uses: [
        "Wood and Masonry",
        "Walls, columns and roofs",
        "Pladur and Cementitious boards",
        "Stages and stands"
      ],
      packaging: [
        "Containers: 1,4,10 and 20 liters"
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "Apply with a brush or roller to surfaces <strong>free of grease, rust, and dust</strong>. If using a spray gun, dilute the mixture with water to achieve the desired consistency.",
    },
    detailsEs: {
      about: "<strong>MINIT Hidro Esmalte </strong> es una pintura ignifuga de base acuosa. Se aplica como cualquier otra pintura, es un retardante ignífugo muy efectivo. Demora la velocidad de propagación del fuego y produce una baja conductividad térmica. En presencia de fuego, actúa como una barrera con baja intumescencia y gracias a sus nano-partículas refractarias, <strong> resiste temperaturas de hasta 960°C </strong>. Además, su acción ignífuga disminuye la emisión de humos.",
      uses: [
        "Maderas y Mampostería",
        "Paredes, columnas y techos",
        "Placas de Durlock",
        "Placas de Cemeticias",
        "Escenografías y stands"
      ],
      packaging: [
        "Envases: 1,4, 10 y 20 litros"
      ],
      certifications: [
        "IRAM",
        "NFPA",
        "ASTM",
        "ISO",
      ],
      chemicalPresentation: "Se aplica con pincel o rodillo sobre superficies <strong>libres de grasas, óxido y polvo</strong>. Si va a usar soplete, diluya la mezcla con agua hasta alcanzar la densidad deseada.",
    },
  }
];
