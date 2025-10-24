# CloudBank Technical Resources

This repository contains educational and technical materials for [CloudBank](https://cloudbank.org), which are published to https://cloudbank-project.github.io/cb-resources/

## How to Contribute

This website is built using [MyST Markdown](https://mystmd.org). If you notice problems, please open an [Issue](https://github.com/cloudbank-project/cb-resources/issues). If you'd like to make changes, please open a Pull Request:

```bash
gh repo clone cloudbank-project/cb-resources
cd cb-resources
git checkout -b new-changes
# Make your changes
git commit -a -m "Description of changes"
git push
# Open a pull request
```

When a Pull Request is merged, the website is automatically deployed using a [GitHub Action](https://github.com/cloudbank-project/cb-resources/actions/workflows/publish.yml)

### MyST Markdown Syntax

All source files are found within the `docs/` directory. Please see the [MyST documentation](https://mystmd.org/guide) for details on syntax and features.

### Preview Changes Locally

If you'd like to build this website and preview your changes locally, you can use the following commands:

First, install [pixi.sh](https://pixi.sh/latest/installation/) to manage the virtual environment and dependencies, then run:

```
pixi run serve
```

You might also want to run the following checks:

```
pixi run linkcheck
pixi run spellcheck
```
