import { expect, type Page } from '@playwright/test';

import { APP_PATHS, TEST_IDS } from '@/shared/config';
import { APP_LOCALE } from '@/shared/enums';
import { localizedPath } from '@/shared/helpers/localized-path.helper';
import { MOCK_CREDENTIALS } from '@/tests/msw/mock-data.constants';

/**
 * Shared E2E helpers. Every selector goes through TEST_IDS so a renamed
 * test id fails typecheck instead of silently skipping assertions.
 */
export const APP_ROUTES = {
  root: APP_PATHS.root,
  welcome: localizedPath(APP_PATHS.welcome, APP_LOCALE.English),
  login: localizedPath(APP_PATHS.login, APP_LOCALE.English),
  arabicLogin: localizedPath(APP_PATHS.login, APP_LOCALE.Arabic),
  home: localizedPath(APP_PATHS.home, APP_LOCALE.English),
  settings: localizedPath(APP_PATHS.settings, APP_LOCALE.English),
  workbench: localizedPath(APP_PATHS.workbench, APP_LOCALE.English),
} as const;

/** Wait for the app shell: MSW + i18n + session bootstrap have all settled. */
export async function gotoApp(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await expect(page.getByTestId(TEST_IDS.appShell)).toBeVisible();
}

/**
 * Assert a routed screen is the presented one.
 *
 * Mid-transition, Ionic's router outlet holds the outgoing and incoming pages
 * in the DOM at once, so a bare getByTestId can match two elements and trip
 * Playwright's strict mode. Ionic marks pages it has not presented yet with
 * `ion-page-invisible`, so excluding that class asserts what we actually mean:
 * this screen is the one on top.
 */
export async function expectPresentedPage(page: Page, testId: string): Promise<void> {
  await expect(page.locator(`[data-testid="${testId}"]:not(.ion-page-invisible)`)).toBeVisible();
}

export async function fillIonInput(page: Page, testId: string, value: string): Promise<void> {
  await page.getByTestId(testId).locator('input').fill(value);
}

export async function login(
  page: Page,
  credentials: { email: string; password: string } = MOCK_CREDENTIALS,
): Promise<void> {
  await gotoApp(page, APP_ROUTES.login);
  await fillIonInput(page, TEST_IDS.loginEmailInput, credentials.email);
  await fillIonInput(page, TEST_IDS.loginPasswordInput, credentials.password);
  await page.getByTestId(TEST_IDS.loginSubmitButton).click();
}

/** Force the app offline through the browser context (Capacitor Network reads navigator). */
export async function setOffline(page: Page, offline: boolean): Promise<void> {
  await page.context().setOffline(offline);
  await page.evaluate((isOffline) => {
    globalThis.dispatchEvent(new Event(isOffline ? 'offline' : 'online'));
  }, offline);
}
