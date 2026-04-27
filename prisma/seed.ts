import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.menuItemTranslation.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.categoryTranslation.deleteMany();
  await prisma.category.deleteMany();

  const categoriesData = [
    {
      sortOrder: 1,
      translations: [
        { lang: 'en', name: 'Starters' },
        { lang: 'pt', name: 'Entradas' },
      ],
      items: [
        {
          price: 8.5,
          sortOrder: 1,
          translations: [
            { lang: 'en', name: 'Bruschetta', description: 'Toasted bread with tomato and basil' },
            { lang: 'pt', name: 'Bruschetta', description: 'Pão tostado com tomate e manjericão' },
          ],
        },
        {
          price: 12.0,
          sortOrder: 2,
          translations: [
            { lang: 'en', name: 'Calamares', description: 'Fried squid with lemon aioli' },
            { lang: 'pt', name: 'Lulas Fritas', description: 'Lulas fritas com aioli de limão' },
          ],
        },
      ],
    },
    {
      sortOrder: 2,
      translations: [
        { lang: 'en', name: 'Main Courses' },
        { lang: 'pt', name: 'Pratos Principais' },
      ],
      items: [
        {
          price: 22.0,
          sortOrder: 1,
          translations: [
            { lang: 'en', name: 'Grilled Salmon', description: 'Fresh salmon with steamed vegetables' },
            { lang: 'pt', name: 'Salmão Grelhado', description: 'Salmão fresco com vegetais no vapor' },
          ],
        },
        {
          price: 18.5,
          sortOrder: 2,
          translations: [
            { lang: 'en', name: 'Beef Steak', description: 'Premium ribeye steak with fries' },
            { lang: 'pt', name: 'Bife de Vaca', description: 'Bife de ribeye premium com batatas fritas' },
          ],
        },
      ],
    },
    {
      sortOrder: 3,
      translations: [
        { lang: 'en', name: 'Desserts' },
        { lang: 'pt', name: 'Sobremesas' },
      ],
      items: [
        {
          price: 6.5,
          sortOrder: 1,
          translations: [
            { lang: 'en', name: 'Tiramisu', description: 'Classic Italian coffee dessert' },
            { lang: 'pt', name: 'Tiramisu', description: 'Clássica sobremesa italiana de café' },
          ],
        },
      ],
    },
  ];

  for (const cat of categoriesData) {
    const category = await prisma.category.create({
      data: {
        sortOrder: cat.sortOrder,
        translations: {
          create: cat.translations,
        },
        menuItems: {
          create: cat.items.map((item) => ({
            price: item.price,
            sortOrder: item.sortOrder,
            translations: {
              create: item.translations,
            },
          })),
        },
      },
    });
    console.log(`Created category: ${cat.translations[0].name}`);
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
