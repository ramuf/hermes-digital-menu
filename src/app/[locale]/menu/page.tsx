import { getMenuWithTranslations } from '@/lib/menu-service';
import { CategoryNav } from '@/components/menu/CategoryNav';
import { MenuItem } from '@/components/menu/MenuItem';
import MenuClientPage from './MenuClientPage';

export default async function MenuPage({ params: { locale } }: { params: { locale: string } }) {
  const { categories } = await getMenuWithTranslations(locale);

  return (
    <MenuClientPage categories={categories} />
  );
}
