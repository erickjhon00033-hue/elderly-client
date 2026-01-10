export const products = [
  // 🟢 Collares
  {
    id: 1,
    name: "Collar Luna",
    category: "collares",
    price: 2500,
    material: "Plata",
    stock: 5,
    image: "/assets/collar-luna.jpg",
    gallery: [
      "/assets/collar-luna.jpg",
      "/assets/collar-luna2.jpg",
      "/assets/collar-luna3.jpg"
    ],
    description: "Un delicado collar inspirado en la luna y las estrellas.",
    features: ["Diseño artesanal", "Acabado elegante", "Edición limitada"],
    materials: ["Plata 925", "Cristales Swarovski"],
    reviews: [
      "Hermoso diseño, delicado y elegante.",
      "La calidad de la plata es excelente."
    ],
    bestseller: true,
    newArrival: false
  },
  {
    id: 2,
    name: "Collar Sol",
    category: "collares",
    price: 3200,
    material: "Oro",
    stock: 3,
    image: "/assets/collar-sol.jpg",
    gallery: ["/assets/collar-sol.jpg"],
    description: "Collar radiante inspirado en el sol.",
    features: ["Brillo intenso", "Diseño único"],
    materials: ["Oro amarillo", "Esmalte artístico"],
    reviews: [
      "Brilla muchísimo, ideal para ocasiones especiales.",
      "Un diseño único, vale la pena."
    ],
    bestseller: false,
    newArrival: true
  },

  // 🟢 Pulseras
  {
    id: 3,
    name: "Pulsera Estrella",
    category: "pulseras",
    price: 1800,
    material: "Cuero",
    stock: 10,
    image: "/assets/pulsera-estrella.jpg",
    gallery: ["/assets/pulsera-estrella.jpg"],
    description: "Pulsera ligera inspirada en las estrellas.",
    features: ["Cómoda", "Resistente", "Estilo juvenil"],
    materials: ["Cuero genuino", "Acero inoxidable"],
    reviews: [
      "Cómoda y resistente, perfecta para uso diario.",
      "El diseño es moderno y juvenil."
    ],
    bestseller: true,
    newArrival: false
  },
  {
    id: 4,
    name: "Pulsera Aurora",
    category: "pulseras",
    price: 2200,
    material: "Acero inoxidable",
    stock: 7,
    image: "/assets/pulsera-aurora.jpg",
    gallery: ["/assets/pulsera-aurora.jpg"],
    description: "Pulsera elegante inspirada en la aurora boreal.",
    features: ["Duradera", "Estilo sofisticado"],
    materials: ["Acero inoxidable", "Cristales de colores"],
    reviews: [
      "Muy elegante, combina con todo.",
      "La terminación es impecable."
    ],
    bestseller: false,
    newArrival: true
  }
];