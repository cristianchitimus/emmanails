import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getHomepageContent, saveHomepageContent } from "@/lib/homepage-content";
import {
  getHomepageImageValidationErrors,
  normalizeHomepageContent,
} from "@/lib/homepage-content-config";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await getHomepageContent();
  return NextResponse.json(content);
}

async function updateHomepage(req: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const contentInput =
    typeof body === "object" && body !== null && "content" in body
      ? (body as { content: unknown }).content
      : body;

  const normalizedContent = normalizeHomepageContent(contentInput);
  const imageErrors = getHomepageImageValidationErrors(normalizedContent);

  if (imageErrors.length > 0) {
    return NextResponse.json({ error: imageErrors.join(" ") }, { status: 400 });
  }

  const content = await saveHomepageContent(normalizedContent);
  revalidatePath("/");

  return NextResponse.json({ success: true, content });
}

export async function POST(req: Request) {
  return updateHomepage(req);
}

export async function PUT(req: Request) {
  return updateHomepage(req);
}
