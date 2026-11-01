export interface LaptopPreset {
  model: string;
  config: string;
}

export const LAPTOP_CATALOG: LaptopPreset[] = [
  // HP EliteBook Series
  { model: "HP EliteBook 840 G3", config: "Core i5 6th Gen, 8GB RAM, 256GB SSD" },
  { model: "HP EliteBook 840 G4", config: "Core i5 7th Gen, 8GB RAM, 256GB SSD" },
  { model: "HP EliteBook 840 G5", config: "Core i5 8th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "HP EliteBook 840 G6", config: "Core i5 8th Gen, 16GB RAM, 256GB NVMe SSD" },
  { model: "HP EliteBook 840 G7", config: "Core i5 10th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "HP EliteBook 840 G8", config: "Core i5 11th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "HP EliteBook 840 G9", config: "Core i5 12th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "HP EliteBook 830 G5", config: "Core i5 8th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "HP EliteBook 830 G6", config: "Core i5 8th Gen, 16GB RAM, 256GB NVMe SSD" },
  { model: "HP EliteBook 830 G7", config: "Core i5 10th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "HP EliteBook 850 G5", config: "Core i7 8th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "HP EliteBook 850 G6", config: "Core i7 8th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "HP EliteBook 850 G7", config: "Core i7 10th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "HP EliteBook x360 1030 G2", config: "Core i5 7th Gen, 8GB RAM, 256GB SSD, Touch 360" },
  { model: "HP EliteBook x360 1030 G3", config: "Core i5 8th Gen, 8GB RAM, 256GB NVMe SSD, Touch 360" },
  { model: "HP EliteBook x360 1030 G4", config: "Core i7 8th Gen, 16GB RAM, 512GB NVMe SSD, Touch 360" },
  { model: "HP EliteBook x360 1040 G5", config: "Core i7 8th Gen, 16GB RAM, 512GB NVMe SSD, Touch 360" },
  { model: "HP EliteBook x360 1040 G7", config: "Core i7 10th Gen, 16GB RAM, 512GB NVMe SSD, Touch 360" },

  // HP ProBook Series
  { model: "HP ProBook 450 G3", config: "Core i5 6th Gen, 8GB RAM, 1TB HDD / 128GB SSD" },
  { model: "HP ProBook 450 G4", config: "Core i5 7th Gen, 8GB RAM, 256GB SSD" },
  { model: "HP ProBook 450 G5", config: "Core i5 8th Gen, 8GB RAM, 256GB SSD" },
  { model: "HP ProBook 450 G6", config: "Core i5 8th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "HP ProBook 450 G7", config: "Core i5 10th Gen, 8GB RAM, 512GB NVMe SSD" },
  { model: "HP ProBook 450 G8", config: "Core i5 11th Gen, 8GB RAM, 512GB NVMe SSD" },
  { model: "HP ProBook 450 G9", config: "Core i5 12th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "HP ProBook 440 G5", config: "Core i5 8th Gen, 8GB RAM, 256GB SSD" },
  { model: "HP ProBook 440 G6", config: "Core i5 8th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "HP ProBook 440 G7", config: "Core i5 10th Gen, 8GB RAM, 512GB NVMe SSD" },
  { model: "HP ProBook 440 G8", config: "Core i5 11th Gen, 8GB RAM, 512GB NVMe SSD" },

  // HP Pavilion & Victus & Omen
  { model: "HP Victus 15", config: "Core i5 12th Gen, 16GB RAM, 512GB NVMe SSD, RTX 3050 4GB" },
  { model: "HP Victus 16", config: "Ryzen 7 6800H, 16GB RAM, 512GB NVMe SSD, RTX 3060 6GB" },
  { model: "HP Pavilion 15", config: "Core i5 11th Gen, 8GB RAM, 512GB NVMe SSD, Iris Xe" },
  { model: "HP Pavilion Gaming 15", config: "Ryzen 5 4600H, 8GB RAM, 512GB SSD, GTX 1650 4GB" },
  { model: "HP Omen 16", config: "Core i7 13th Gen, 16GB RAM, 1TB NVMe SSD, RTX 4060 8GB" },
  { model: "HP Envy x360 13", config: "Ryzen 5 5500U, 8GB RAM, 512GB NVMe SSD, Touch 360" },
  { model: "HP Envy x360 15", config: "Core i7 11th Gen, 16GB RAM, 512GB NVMe SSD, Touch 360" },

  // Dell Latitude Series
  { model: "Dell Latitude 7480", config: "Core i5 6th Gen, 8GB RAM, 256GB SSD" },
  { model: "Dell Latitude 7490", config: "Core i5 8th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "Dell Latitude 7400", config: "Core i5 8th Gen, 16GB RAM, 256GB NVMe SSD" },
  { model: "Dell Latitude 7410", config: "Core i5 10th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Dell Latitude 7420", config: "Core i5 11th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Dell Latitude 5480", config: "Core i5 6th Gen, 8GB RAM, 256GB SSD" },
  { model: "Dell Latitude 5490", config: "Core i5 8th Gen, 8GB RAM, 256GB SSD" },
  { model: "Dell Latitude 5400", config: "Core i5 8th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "Dell Latitude 5410", config: "Core i5 10th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "Dell Latitude 5420", config: "Core i5 11th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Dell Latitude 5580", config: "Core i5 7th Gen, 8GB RAM, 256GB SSD" },
  { model: "Dell Latitude 5590", config: "Core i7 8th Gen, 16GB RAM, 512GB SSD" },
  { model: "Dell Latitude 7390 2-in-1", config: "Core i5 8th Gen, 8GB RAM, 256GB SSD, Touch 360" },
  { model: "Dell Latitude 7300", config: "Core i7 8th Gen, 16GB RAM, 512GB SSD" },

  // Dell XPS & Inspiron & G-Series
  { model: "Dell XPS 13 9360", config: "Core i5 7th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "Dell XPS 13 9370", config: "Core i7 8th Gen, 16GB RAM, 512GB NVMe SSD, 4K" },
  { model: "Dell XPS 13 9380", config: "Core i7 8th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Dell XPS 13 9310", config: "Core i7 11th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Dell XPS 15 9570", config: "Core i7 8th Gen, 16GB RAM, 512GB SSD, GTX 1050Ti 4GB" },
  { model: "Dell XPS 15 7590", config: "Core i7 9th Gen, 16GB RAM, 512GB SSD, GTX 1650 4GB" },
  { model: "Dell XPS 15 9500", config: "Core i7 10th Gen, 16GB RAM, 1TB SSD, GTX 1650Ti 4GB" },
  { model: "Dell Inspiron 15 3511", config: "Core i3 11th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "Dell Inspiron 15 3520", config: "Core i5 12th Gen, 8GB RAM, 512GB NVMe SSD" },
  { model: "Dell Inspiron 15 5502", config: "Core i5 11th Gen, 8GB RAM, 512GB NVMe SSD" },
  { model: "Dell G15 5511", config: "Core i5 11th Gen, 16GB RAM, 512GB SSD, RTX 3050 4GB" },
  { model: "Dell G15 5520", config: "Core i7 12th Gen, 16GB RAM, 512GB SSD, RTX 3060 6GB" },

  // Lenovo ThinkPad Series
  { model: "Lenovo ThinkPad T460", config: "Core i5 6th Gen, 8GB RAM, 256GB SSD" },
  { model: "Lenovo ThinkPad T470", config: "Core i5 6th/7th Gen, 8GB RAM, 256GB SSD" },
  { model: "Lenovo ThinkPad T470s", config: "Core i5 7th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "Lenovo ThinkPad T480", config: "Core i5 8th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "Lenovo ThinkPad T480s", config: "Core i5 8th Gen, 16GB RAM, 256GB NVMe SSD" },
  { model: "Lenovo ThinkPad T490", config: "Core i5 8th Gen, 16GB RAM, 256GB NVMe SSD" },
  { model: "Lenovo ThinkPad T490s", config: "Core i7 8th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Lenovo ThinkPad T14 Gen 1", config: "Core i5 10th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Lenovo ThinkPad T14 Gen 2", config: "Core i5 11th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Lenovo ThinkPad T14 Gen 3", config: "Core i5 12th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Lenovo ThinkPad X260", config: "Core i5 6th Gen, 8GB RAM, 256GB SSD" },
  { model: "Lenovo ThinkPad X270", config: "Core i5 7th Gen, 8GB RAM, 256GB SSD" },
  { model: "Lenovo ThinkPad X280", config: "Core i5 8th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "Lenovo ThinkPad X390", config: "Core i5 8th Gen, 16GB RAM, 256GB NVMe SSD" },
  { model: "Lenovo ThinkPad X13 Gen 1", config: "Core i5 10th Gen, 16GB RAM, 256GB NVMe SSD" },
  { model: "Lenovo ThinkPad X1 Carbon Gen 5", config: "Core i7 7th Gen, 16GB RAM, 512GB SSD" },
  { model: "Lenovo ThinkPad X1 Carbon Gen 6", config: "Core i7 8th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Lenovo ThinkPad X1 Carbon Gen 7", config: "Core i7 8th/10th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Lenovo ThinkPad X1 Carbon Gen 8", config: "Core i7 10th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Lenovo ThinkPad X1 Carbon Gen 9", config: "Core i7 11th Gen, 16GB RAM, 512GB NVMe SSD" },
  { model: "Lenovo ThinkPad X1 Yoga Gen 3", config: "Core i7 8th Gen, 16GB RAM, 512GB SSD, Touch 360" },
  { model: "Lenovo ThinkPad X1 Yoga Gen 4", config: "Core i7 8th Gen, 16GB RAM, 512GB SSD, Touch 360" },
  { model: "Lenovo ThinkPad L480", config: "Core i5 8th Gen, 8GB RAM, 256GB SSD" },
  { model: "Lenovo ThinkPad L380 Yoga", config: "Core i5 8th Gen, 8GB RAM, 256GB SSD, Touch 360" },

  // Lenovo IdeaPad & Legion
  { model: "Lenovo IdeaPad Slim 3", config: "Core i3 11th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "Lenovo IdeaPad Slim 5", config: "Ryzen 5 5500U, 16GB RAM, 512GB NVMe SSD" },
  { model: "Lenovo IdeaPad Gaming 3", config: "Ryzen 5 5600H, 16GB RAM, 512GB SSD, RTX 3050 4GB" },
  { model: "Lenovo Legion 5", config: "Ryzen 7 5800H, 16GB RAM, 512GB SSD, RTX 3060 6GB" },
  { model: "Lenovo Legion Pro 5", config: "Core i7 13th Gen, 16GB RAM, 1TB NVMe SSD, RTX 4060 8GB" },

  // Apple MacBooks
  { model: "MacBook Air 13 (2017)", config: "Core i5 1.8GHz, 8GB RAM, 128GB/256GB SSD" },
  { model: "MacBook Air Retina (2018)", config: "Core i5 8th Gen, 8GB RAM, 128GB/256GB SSD" },
  { model: "MacBook Air Retina (2019)", config: "Core i5 8th Gen, 8GB RAM, 128GB/256GB SSD" },
  { model: "MacBook Air Retina (2020)", config: "Core i3/i5 10th Gen, 8GB RAM, 256GB SSD" },
  { model: "MacBook Air M1 (2020)", config: "Apple M1 8-Core, 8GB RAM, 256GB SSD" },
  { model: "MacBook Air M2 (2022)", config: "Apple M2 8-Core, 8GB RAM, 256GB SSD, Liquid Retina" },
  { model: "MacBook Air M3 (2024)", config: "Apple M3 8-Core, 8GB RAM, 256GB SSD" },
  { model: "MacBook Pro 13 (2017)", config: "Core i5 7th Gen, 8GB RAM, 256GB SSD, Non-Touch Bar" },
  { model: "MacBook Pro 13 (2018)", config: "Core i5 Quad-Core, 8GB RAM, 256GB SSD, Touch Bar" },
  { model: "MacBook Pro 13 (2019)", config: "Core i5 Quad-Core, 8GB RAM, 256GB SSD, Touch Bar" },
  { model: "MacBook Pro 13 (2020)", config: "Core i5 10th Gen, 16GB RAM, 512GB SSD, Touch Bar" },
  { model: "MacBook Pro 13 M1 (2020)", config: "Apple M1 8-Core, 8GB RAM, 256GB SSD" },
  { model: "MacBook Pro 13 M2 (2022)", config: "Apple M2 8-Core, 8GB RAM, 256GB SSD" },
  { model: "MacBook Pro 14 M1 Pro", config: "Apple M1 Pro 8-Core, 16GB RAM, 512GB SSD" },
  { model: "MacBook Pro 14 M2 Pro", config: "Apple M2 Pro 10-Core, 16GB RAM, 512GB SSD" },
  { model: "MacBook Pro 14 M3", config: "Apple M3 8-Core, 8GB RAM, 512GB SSD" },
  { model: "MacBook Pro 16 M1 Pro", config: "Apple M1 Pro 10-Core, 16GB RAM, 512GB SSD" },

  // Asus ZenBook, VivoBook & ROG
  { model: "Asus ZenBook 14 UX425", config: "Core i5 11th Gen, 8GB RAM, 512GB NVMe SSD" },
  { model: "Asus ZenBook 13 OLED", config: "Core i5 11th Gen, 8GB RAM, 512GB NVMe SSD, OLED" },
  { model: "Asus VivoBook 15", config: "Core i3 11th Gen, 8GB RAM, 256GB NVMe SSD" },
  { model: "Asus VivoBook Pro 15 OLED", config: "Ryzen 7 5800H, 16GB RAM, 512GB SSD, RTX 3050 4GB" },
  { model: "Asus TUF Gaming F15", config: "Core i5 11th Gen, 16GB RAM, 512GB SSD, RTX 3050 4GB" },
  { model: "Asus TUF Gaming A15", config: "Ryzen 7 6800H, 16GB RAM, 512GB SSD, RTX 3060 6GB" },
  { model: "Asus ROG Strix G15", config: "Ryzen 7 6800H, 16GB RAM, 512GB SSD, RTX 3060 6GB" },
  { model: "Asus ROG Strix G16", config: "Core i7 13th Gen, 16GB RAM, 1TB NVMe SSD, RTX 4060 8GB" },
  { model: "Asus ROG Zephyrus G14", config: "Ryzen 7 5800HS, 16GB RAM, 512GB SSD, RTX 3060 6GB" },

  // Acer & MSI
  { model: "Acer Aspire 5", config: "Core i5 11th Gen, 8GB RAM, 512GB NVMe SSD" },
  { model: "Acer Nitro 5", config: "Core i5 12th Gen, 16GB RAM, 512GB SSD, RTX 3050 4GB" },
  { model: "Acer Swift 3", config: "Ryzen 5 5500U, 8GB RAM, 512GB NVMe SSD" },
  { model: "MSI GF63 Thin", config: "Core i5 11th Gen, 8GB RAM, 512GB SSD, GTX 1650 / RTX 3050" },
  { model: "MSI Katana GF66", config: "Core i7 12th Gen, 16GB RAM, 512GB SSD, RTX 3060 6GB" },
  { model: "MSI Modern 14", config: "Core i5 11th Gen, 8GB RAM, 512GB NVMe SSD" }
];

export const searchLaptopModels = (input: string): string[] => {
  if (!input || input.trim().length < 1) return [];
  const q = input.toLowerCase().trim();
  const matched = LAPTOP_CATALOG.filter(item => 
    item.model.toLowerCase().includes(q)
  ).map(item => item.model);
  return matched.slice(0, 8);
};

export const getLaptopConfig = (modelName: string): string => {
  const q = modelName.toLowerCase().trim();
  const direct = LAPTOP_CATALOG.find(item => item.model.toLowerCase() === q);
  if (direct) return direct.config;
  const partial = LAPTOP_CATALOG.find(item => item.model.toLowerCase().includes(q) || q.includes(item.model.toLowerCase()));
  if (partial) return partial.config;
  return "Core i5, 8GB RAM, 256GB SSD";
};
