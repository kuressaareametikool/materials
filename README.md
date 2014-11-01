### About

Markdown-based teaching materials repository with slideshow support.

### Installation

1. It's assumed you have NodeJS installed. Run

		npm install
 
2. Create some Markdown files to _public/slides/_ folder. For breaking the content into slides add two empty lines between the paragraphs.

3. Run

		node generate-index.js

	to automatically generate the index or create _public/slides/index.md_ manually.

4. Point the browser to the /public folder via the (local) web server.

### Content generation

You can also automatically generate the content. By running

	node generate-typoinspiration.js

the _public/slides/typo-inspiration.md_ page is generated containg eye candy from major typography blogs.