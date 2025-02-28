import { test, expect } from "@playwright/test";

test.describe("Page d'accueil", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("le titre devrait être présent", async ({ page }) => {
        // Check if the h1 element is visible
        await expect(page.locator("h1")).toBeVisible();
    });

    test("le contenu du titre devrait être fixe", async ({ page }) => {
        // Check if the h1 element contains the correct text
        await expect(page.locator("h1")).toHaveText("Bienvenue sur Super Blog");
    });

    test("un lien vers la liste d'articles devrait être disponible", async ({ page }) => {
        // Check if there is a link to the /posts route
        await expect(page.locator('a[href="/posts"]')).toBeVisible();
    });
});

test.describe("Page liste des articles", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/posts");
    });

    test("le titre devrait être présent", async ({ page }) => {
        // Check if the h1 element is visible
        await expect(page.locator("h1")).toBeVisible();
    });

    test('le contenu du titre devrait être "Liste des articles"', async ({ page }) => {
        // Check if the h1 element contains the correct text
        await expect(page.locator("h1")).toHaveText("Liste des articles");
    });

    test('le bouton "Créer un article" devrait être présent', async ({ page }) => {
        // Check if the button to create a new post is visible
        await expect(page.locator('a[href="/posts/new"]')).toBeVisible();
    });

    test('cliquer sur "Créer un article" devrait rediriger vers la page de création', async ({ page }) => {
        // Click on the "Créer un article" button
        await page.click('a[href="/posts/new"]');
        // Check if the URL is correct
        await expect(page).toHaveURL("/posts/new");
    });
});
