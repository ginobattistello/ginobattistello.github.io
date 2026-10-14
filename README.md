# Gino Battistello · academic website

A multi-page academic site built with **Jekyll**, which GitHub Pages runs for you automatically:
you edit text files, push, and the site rebuilds itself. No HTML knowledge is needed for everyday updates.

## How it is organised

```
_data/                 ← YOUR CONTENT (plain YAML lists — edit these most of the time)
  profile.yml          name, role, affiliation, email, links (Scholar, ORCID, GitHub…), photo
  navigation.yml       the menu: one line per page, in order
  highlights.yml       "Highlights" on the home page
  experience.yml       Research page
  publications.yml     articles + dissertations
  presentations.yml    Talks & Posters (one entry per abstract, with all its venues)
  teaching.yml         teaching + student supervision
  outreach.yml         service & outreach, in groups
  education.yml        degrees, summer schools, awards, languages (CV page)

index.md               home page bio (Markdown)
research.html  publications.html  talks.html  teaching.html  outreach.html  cv.html
                       one file per page: a title + which data to show

_layouts/              page skeletons (default, page, home)
_includes/             reusable building blocks (header, footer, entries list, publication)
assets/css/style.css   the design — colours and fonts are at the top
assets/cv.pdf          the CV behind the "CV (PDF)" links
```

## Everyday edits

**Add a publication, talk, course…**: open the matching file in `_data/`, copy an existing entry
(the block starting with `-`), paste it at the top and change the text. Keep the indentation (spaces, not tabs).
If a value contains a colon followed by a space, wrap it in quotes: `title: "Creativity: a review"`.

**Add a venue to an existing talk**: add a `- type: Poster` block under its `venues:`.

**Update the CV PDF**: replace `assets/cv.pdf` with a new file of the same name.

**Add a photo**: put it at `assets/img/photo.jpg` and set `photo: /assets/img/photo.jpg` in `_data/profile.yml`.

## Add a new page

1. Create a file at the top of the folder, e.g. `software.html`:

   ```html
   ---
   layout: page
   title: Software
   permalink: /software/
   lead: Optional one-line introduction under the title.
   ---
   <section class="block">
     <h2>Tools</h2>
     {% assign entries = site.data.software %}
     {% include entries.html %}
   </section>
   ```
   (You can also write a page in plain Markdown: name it `software.md` and just write text under the `---` block.)
2. If it lists entries, create `_data/software.yml` with the same fields as `experience.yml`
   (`date`, `title`, `subtitle`, `people`, `place`, `notes`, `url`, all optional except date and title).
3. Add it to the menu in `_data/navigation.yml`:
   ```yaml
   - title: Software
     url: /software/
   ```

To remove a page: delete its file and its two lines in `navigation.yml`.

## Publish on GitHub Pages (first time)

1. On GitHub, create a **public** repository named exactly `ginobattistello.github.io`. Leave it empty, with no README.
2. In this folder:
   ```bash
   git config user.name "Gino Battistello"
   git config user.email "you@example.com"
   git remote add origin https://github.com/ginobattistello/ginobattistello.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`** → Save.
4. A minute later the site is live at **https://ginobattistello.github.io**.

If you use a different repository name, set `baseurl: "/REPO-NAME"` in `_config.yml`.

## Updating

```bash
git add .
git commit -m "Add SfNC 2027 poster"
git push
```
The **Actions** tab on GitHub shows the rebuild. If an edit breaks the build (usually a YAML indentation
mistake), the error message there names the file and line.

## Preview on your computer (optional)

Needs Ruby. Once: `gem install bundler && bundle install`. Then: `bundle exec jekyll serve`
and open http://localhost:4000. Editing a file refreshes the page; changes to `_config.yml` need a restart.
