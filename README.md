# Mine Little Pony mod site

To run this site on your local machine, install [Jekyll](https://jekyllrb.com), go to the site directory and enter command `bundle exec jekyll serve`

## Data files
Most of the data are stored in `yml` files which are placed in `_data` directory of the repository.
List of data files:
- `menu` - list of links in menu on top of pages 
- `cards` - list of cards which are placed on the main page of the site
- `faq` - list of questions and answers on FAQ page
- `old_files` - list of files which are placed on Archive page
- `pixels` - pixels data for skinning guide

## Data structure
### Menu
```yaml
- path: "relative/path/to/page"
  title: "Name in menu"
```

### Cards
All cards are placed on the main page of the site
There are two types of cards: `features` and `links`. `features` cards show the mod's features, `links` cards are placed at the bottom of the main page
```yaml
features:
    - title: "Name of a card"
      description: "Card text"
      color: "#1fb6f2"      # color of icon background
      header: "headerimage" # filename without extension of picture placed in /assets/home/*.png
      icon: "iconimage"     # filename without extension of picture placed in /assets/home/*.png

links:
    - header: "headerimage"
      hidden: true   # use it to hide the card
      download: true # use it to make a downloadable link
      url: "url"
      color: "#1fb6f2"  # color of card's button
      label: "Click me" # label of the button
      description: "Card text"
```

### FAQ
```yaml
# Markdown syntax supported
- question: "Question"
  answer: "Answer"
```

### Archive
```yaml
- version: "Version"
  assets:
    - name: "Name of the asset"
      description: "Asset description"
      files:
        - type: "litemod"
          filename: "filename.litemod" # name of a file placed in /assets/files/mod/
```

### Pixels
```yaml
- name: "Trigger pixel name"
  description: "Pixel description"
  pixels:
    - color: "#f9b131" # acceptable color; may be empty if color is not required
      description: "Description of the color"
```

## First development history
To see history of development of Jekyll remake before pushing it to official repository, go [here](https://github.com/niteru/MineLPSite)