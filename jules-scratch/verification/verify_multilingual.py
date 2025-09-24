from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Test index.html
    page.goto("file:///app/index.html")
    languages = ["en", "hi", "mr", "pa", "kn", "ta", "te"]
    for lang in languages:
        page.select_option("#lang-switch", lang)
        page.screenshot(path=f"jules-scratch/verification/screenshot-index-{lang}.png")

    # Test index1.html
    page.goto("file:///app/index1.html")
    for lang in languages:
        page.select_option("#lang-switch", lang)
        page.screenshot(path=f"jules-scratch/verification/screenshot-index1-{lang}.png")

    # Test dashboard.html
    page.goto("file:///app/dashboard.html")
    for lang in languages:
        page.select_option("#lang-switch", lang)
        page.screenshot(path=f"jules-scratch/verification/screenshot-dashboard-{lang}.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)