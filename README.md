# adamvelazquez.art

Portfolio site for Adam Velazquez — hand-written static HTML, CSS, and ES
modules, deployed on GitHub Pages.

## Running locally

ES modules need a real server; opening `index.html` from the filesystem will
not work.

```sh
python -m http.server 8000
# http://localhost:8000
```

## Deploying

```sh
git push origin main
```

GitHub Pages serves `main` from the repo root. There is no build step.

## Working on it

See [CLAUDE.md](CLAUDE.md) for conventions and [docs/ROADMAP.md](docs/ROADMAP.md)
for what is done and what is next.
