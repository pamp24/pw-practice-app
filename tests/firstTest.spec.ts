import { expect, test } from '@playwright/test'
import { filter } from 'rxjs/operators';



test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('the first test', async ({ page }) => {
    const basicForm =  page.locator('nb-card').filter({hasText: 'Basic form'})
    const emailField = basicForm.getByRole('textbox', {name:"Email"})

    await emailField.fill('test@gmail.com')
    await basicForm.getByRole('textbox', {name:"Password"}).fill('123456')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button', {name:"Submit"}).click()


    await expect(emailField).toHaveValue('test@gmail.com')
})   

test('extracting values', async ({ page }) => {
    //sigle test value
    const basicForm =  page.locator('nb-card').filter({hasText: 'Basic form'})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //multiple test values
    const radioButtonLabels = await page.locator("nb-radio").allTextContents()
    expect(radioButtonLabels).toContain("Option 1")
})

test('asserstions', async ({ page }) => {

    //General assertions
    const basicFormButton =  page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button')

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')


    //Locator assertions
    await expect(basicFormButton).toHaveText('Submit')

    //Soft assertions
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})

