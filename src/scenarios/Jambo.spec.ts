import { expect, test } from '@playwright/test';

test.describe('Jambô Editora E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://jamboeditora.com.br/', {
      waitUntil: 'domcontentloaded'
    });
  });

  test('deve carregar a home com produtos selecionados', async ({ page }) => {
    await expect(page).toHaveURL(/jamboeditora\.com\.br/);
    await expect(page).toHaveTitle(/Jambô Editora/i);
    await expect(page.getByText('Produtos selecionados')).toBeVisible();
  });

  test('deve abrir a categoria de RPG pelo menu', async ({ page }) => {
    await page.getByRole('link', { name: 'RPG', exact: true }).first().click();

    await expect(page).toHaveURL(/\/categoria\/rpg\/?$/);
    await expect(page.getByRole('heading', { name: 'RPG' })).toBeVisible();
    await expect(page.getByText('Exibindo').first()).toBeVisible();
  });

  test('deve abrir a categoria de HQ pelo menu', async ({ page }) => {
    await page.getByRole('link', { name: 'HQ', exact: true }).first().click();

    await expect(page).toHaveURL(/\/categoria\/quadrinhos\/?$/);
    await expect(
      page.getByRole('heading', { name: 'Quadrinhos' }),
    ).toBeVisible();
    await expect(page.getByText('Exibindo').first()).toBeVisible();
  });

  test('deve acessar as informações de contato', async ({ page }) => {
    await page.getByRole('link', { name: 'Contato', exact: true }).click();

    await expect(page).toHaveURL(/\/contato\/?$/);
    await expect(page.getByRole('heading', { name: 'Contato' })).toBeVisible();
    await expect(page.getByText('SAC – Atendimento ao Cliente')).toBeVisible();
  });
});
