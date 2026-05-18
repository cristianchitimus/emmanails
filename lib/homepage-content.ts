import { prisma } from "@/lib/db";
import {
  HOMEPAGE_CONTENT_KEY,
  type HomepageContent,
  normalizeHomepageContent,
  parseHomepageContent,
} from "@/lib/homepage-content-config";

export async function getHomepageContent(): Promise<HomepageContent> {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: HOMEPAGE_CONTENT_KEY },
  });

  return parseHomepageContent(setting?.value);
}

export async function saveHomepageContent(input: unknown): Promise<HomepageContent> {
  const content = normalizeHomepageContent(input);

  await prisma.siteSetting.upsert({
    where: { key: HOMEPAGE_CONTENT_KEY },
    update: { value: JSON.stringify(content) },
    create: { key: HOMEPAGE_CONTENT_KEY, value: JSON.stringify(content) },
  });

  return content;
}
