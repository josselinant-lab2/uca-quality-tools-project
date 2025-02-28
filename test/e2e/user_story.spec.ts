import { test, expect, type Page, type BrowserContext } from "@playwright/test";

const title = "Test Article";
const content = "This is a test article content.";
const author = "Test Author";

const newTitle = "Updated Article";
const newContent = "This is updated article content.";
const newAuthor = "Updated Author";

// Fonctions utilitaires
async function verifyPostPresence(page: Page, titre: string, contenu: string, auteur: string, browser: string | null) {
    const id = `(${browser})`;
    await expect(page.locator(`h2:has-text("${titre + id}")`)).toBeVisible();
    await expect(page.locator(`p:has-text("${contenu + id}")`)).toBeVisible();
    await expect(page.locator(`span:has-text("${auteur + id}")`)).toBeVisible();
}

async function fillPost(page: Page, titre: string, contenu: string, auteur: string, browser: string | null) {
    const id = `(${browser})`;
    await page.fill('input[name="title"]', titre + id);
    await page.fill('textarea[name="content"]', contenu + id);
    await page.fill('input[name="author"]', auteur + id);
    await page.click('button[type="submit"]');
}

async function getBrowserName(context: BrowserContext): Promise<string | null> {
    const browser = context.browser();
    return browser ? browser.browserType().name() : null;
}

// Test
test.describe("Post creation and modification test", () => {
    test("un article devrait être créé et modifé", async ({ page, context }) => {
        let postID: string;
        await page.goto("/posts");

        await test.step("Créer un article", async () => {
            const browser = await getBrowserName(context);

            // Go to create a new post
            await page.click('a[href="/posts/new"]');
            await expect(page).toHaveURL(/\/posts\/new/);

            // Fill post
            await fillPost(page, title, content, author, browser);

            // Check the redirection
            await expect(page).toHaveURL("/posts");

            // Verify the article is in the list
            await verifyPostPresence(page, title, content, author, browser);

            // Get the href attribute of the title link
            const href = await page.getAttribute(`a:has-text("${title}")`, "href");

            // Extract the post ID from the href
            if (!href) {
                throw new Error("Failed to get new post ID from href");
            }
            postID = href.split("/").pop() as string;
        });

        test.step("Modifier un article", async () => {
            const browser = await getBrowserName(context);

            // Verify the new article can be modified
            await expect(page.locator(`a[href="/posts/${postID}/edit"]`)).toBeVisible();
            await page.click(`a[href="/posts/${postID}/edit"]`);
            await expect(page).toHaveURL(/\/edit/);
            await expect(page.locator('text="Modifier l\'article"')).toBeVisible();

            // Verify the article is in the list
            await fillPost(page, newTitle, newContent, newAuthor, browser);

            // Confirm the modification and go back to main page
            await page.click(`a[href="/posts/${postID}/edit"]`);
            await page.goto("/posts");

            // Verify the modified article is in the list
            await verifyPostPresence(page, newTitle, newContent, newAuthor, browser);
        });
    });
});
