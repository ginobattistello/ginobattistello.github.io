# Academic homepage

A simple, dependency-free academic website (HTML + CSS), ready for GitHub Pages.

## Files
- `index.html` — all the content (edit the placeholder text)
- `style.css` — the design (colours are at the top, under `:root`)
- `assets/photo.jpg` — your portrait (optional; hidden if missing)
- `assets/cv.pdf` — your full CV as a PDF

## Publish on GitHub Pages

1. Create a free account at https://github.com if you don't have one.
2. Create a **new public repository** named exactly `USERNAME.github.io`
   (replace `USERNAME` with your GitHub username). Don't add a README.
3. In this folder, run:

   ```bash
   git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   choose `main` and `/ (root)`, then Save.
5. After a minute or two the site is live at `https://USERNAME.github.io`.

## Updating the site

```bash
# edit index.html, then:
git add .
git commit -m "Add new paper"
git push
```
GitHub rebuilds the site automatically after each push.

## Preview locally
Just open `index.html` in your browser, or run `python3 -m http.server` in this folder
and visit http://localhost:8000.

## Optional: custom domain
Buy a domain, add a file named `CNAME` containing it (e.g. `www.yourname.com`),
and set it under **Settings → Pages → Custom domain**.
