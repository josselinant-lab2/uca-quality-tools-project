import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || 3009;

export default defineConfig({
    testDir: "./test/e2e",

    /* Run tests in files in parallel */
    fullyParallel: true,

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,

    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,

    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,

    /* Reporter to use */
    reporter: [["html", { open: "never" }]],

    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: `http://localhost:${PORT}`,

        /* Collect trace when retrying the failed test. */
        trace: "on-first-retry"
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] }
        },

        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] }
        },

        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] }
        }
    ],

    /* Run your local dev server before starting the tests */
    webServer: {
        command: "npm run start",
        url: `http://127.0.0.1:${PORT}`,
        reuseExistingServer: !process.env.CI
    }
});
