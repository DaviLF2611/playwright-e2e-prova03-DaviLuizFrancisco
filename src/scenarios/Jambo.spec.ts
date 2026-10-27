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
    await expect(page.getByRole('status')).toContainText('Exibindo');
  });

  test('deve abrir a categoria de HQ pelo menu', async ({ page }) => {
    await page.getByRole('link', { name: 'HQ', exact: true }).first().click();

    await expect(page).toHaveURL(/\/categoria\/quadrinhos\/?$/);
    await expect(page.getByRole('status')).toContainText('Exibindo');
  });

  test('deve acessar as informações de contato', async ({ page }) => {
    await page.goto('https://jamboeditora.com.br/contato/', {
      waitUntil: 'domcontentloaded'
    });

    await expect(page).toHaveURL(/\/contato\/?$/);
    await expect(
      page.getByRole('heading', {
        name: 'SAC – Atendimento ao Cliente',
        exact: true
      })
    ).toBeVisible();
  });
});
