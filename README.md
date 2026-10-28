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
  education.yml        degrees, training, awards and languages (Curriculum page)
  hobbies.yml          hobbies (Curriculum page only)
  software.yml         software & tools (Research page; hidden until entries are added)
  team.yml             team responsibilities (Research page; hidden until entries are added)
  skills.yml           expertise, methods and tools (final section of the printable CV)
                       (all of these also feed the printable CV at /cv-print/)

index.md               home page bio (Markdown)
research.html  publications.html  talks.html  teaching.html
outreach.html  cv.html (Curriculum)  contact.html  cv-print.html (printable CV, not in the menu)
                       one file per page: a title + which data to show

_layouts/              page skeletons (default, page, home)
_includes/             reusable building blocks (header, footer, entries list, publication)
assets/css/site.css    the design — colours and fonts are at the top
assets/js/navigation.js mobile navigation toggle (all links remain available without JavaScript)
assets/cv.pdf          the CV behind the "CV (PDF)" links
exports/cv-editable.pptx editable A4 portrait PowerPoint CV (local export)
scripts/export_cv_pptx.py generates the PowerPoint from the same YAML content
```

## Everyday edits

**Add a publication, talk, course…**: open the matching file in `_data/`, copy an existing entry
(the block starting with `-`), paste it at the top and change the text. Keep the indentation (spaces, not tabs).
If a value contains a colon followed by a space, wrap it in quotes: `title: "Creativity: a review"`.

**Add a venue to an existing talk**: add a `- type: Poster` block under its `venues:`.

**Update the CV PDF**: the PDF is built from the same `_data/` files as the site, so after adding a paper or talk:
1. Push your changes, wait for the site to rebuild, and open `https://ginobattistello.github.io/cv-print/` in Chrome.
2. Print → **Save as PDF**, paper **A4**, margins **Default**, **Headers and footers** off, **Background graphics** on.
3. Save it as `assets/cv.pdf` (replacing the old one), then commit and push again.

The printable page's look is in `assets/css/cv-print.css`; its layout is `cv-print.html`.

**Edit the CV in PowerPoint**: open `exports/cv-editable.pptx`. Each slide is an A4
portrait page. Text, coloured labels and skills tables are editable. Each dated
entry is grouped so you can move it as one block; click into a group to edit its
text or ungroup it to reposition individual parts. PowerPoint edits are independent
of the website's YAML content.

To generate a fresh PowerPoint after updating the site content:

```bash
python3 -m venv .venv-cv
.venv-cv/bin/python -m pip install -r scripts/requirements-cv.txt
.venv-cv/bin/python scripts/export_cv_pptx.py --output exports/cv-new.pptx
```

The exporter preserves existing files. Use a new output name for a fresh copy, or
pass `--overwrite` to deliberately replace it. `exports/` and `scripts/` are excluded
from the built website; the public CV download remains the PDF.

**Add a portrait or banner**: put your own photographs in `assets/img/`, then update
`_data/profile.yml`:

```yaml
photo: /assets/img/portrait.jpg
photo_position: "75% 30%"
photo_zoom: 260%
banner: /assets/img/banner.jpg
banner_alt: A description of what the photograph shows
banner_caption: Optional location or photo credit
banner_position: "50% 35%"
```

The portrait uses a circular frame. `photo_position` is the face's horizontal and
vertical position in the source photograph; `photo_zoom` controls the image width
inside the frame (`100%` for a close-up, larger values for a wider photograph).
The banner appears above the home-page bio; `banner_position` controls its crop.
Leave `photo` or `banner` empty to hide that image. Set `birth_year` and `nationality` in the same file
to show them on the home page and printable CV; empty fields stay hidden.
Set `pronouns` in the same file to display them beside your name on Home and on Contact.
The Contact page also uses the profile's name, location and professional email.

**Labels and CV dividers**: dated entries accept an optional `tag`, such as `Volunteer`,
`Organiser`, `Grants` or `Awards`, displayed before the title on both the site and CV.
Research experience entries also have a `stage` (`PhD`, `Graduate`, `Undergraduate`);
the printable CV adds a small divider whenever that stage changes.

**Software and team roles**: edit the lists in `_data/software.yml` and `_data/team.yml`.
Entries use the same fields as other dated lists; `date` is optional for software.
These sections appear on the Research page and printable CV. Replace a list with `[]`
to hide its section.

**CV expertise table**: edit `_data/skills.yml`. Each domain contains categories and
lines of details. Use `label` for a bold prefix and `level: tools` for supporting
software or tool names in smaller grey text. The table starts on a new final page
of the printable CV. Replace the list with `[]` to hide it.

**Page layouts**: Research, Curriculum and Service & Outreach use two columns on
wide screens and stack into one column on smaller screens. `wide: true` in a page's
front matter enables the wider content area. Outreach groups have stable `id` values
used to place them in the requested columns. Entries can include a `certificates`
list; each certificate receives a label on the website and printable CV.

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
