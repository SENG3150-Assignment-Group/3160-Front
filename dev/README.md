# Developer README

This is the file that contains information for developers and maintainers on this project. Links to further resources are provided at the end of this document.

# Contributing

-   To contribute to this project, all work must be completed on your own branch and then merged into the main branch. And with the exception of 'kitchen-sinks' every branch should be associated with an VALIDATED issue (see validating issues).

    -   Your branch should be named: your-last-name/feature-name in lower-kebab-case i.e. dash separation lowercase.

        -   tuppurainen/flight-search-page-styling
        -   davis/destination-page-layout
        -   graham/backend-api-link-bookings

    -   If you have a branch that you specifically DON'T want merged, use a 'kitchen-sink' this will never be merged and is just a way to quickly test or share your work on a branch without having to worry about local stashing

        -   tuppurainen/kitchen-sink
        -   tuppurainen/kitchen-sink-flight-search

## Commit Messages

-   Use docs: fix: feat: style: test: followed by a short description of the change. Use directed terms such as _Add new component_ rather than _Adds_ or _Will Add_ or _Fix styling for Flight Search module_, _Update developer README_ etc.

## Avoiding Merge Conflicts

-   Be sure to merge-in from main often (and as you start working on your branch every time) to ensure there aren't conflicts

-   Be sure to ONLY modify files relevant to your issue, if you find you need to modify others then create a new issue and branch

-   All branches are ONLY to be 'one-layer' deep, meaning that you should only ever be branching off main, please don't cascade branches off branches

-   Do not under any circumstances commit to the main branch directly unless you've asked Bryce Tuppurainen first who is responsible for the maintenance of the front-end repository for this project.

## Validating Issues

-   Before creating a new branch, you should start by creating a new issue describing what needs to be done (use the issue template).

-   ONLY AFTER the issue has been labelled as valid by another team member, you can create a new branch.

-   Valid issues should have a full list of the files requiring modification, a clear deliverable, and a clear description of the work that needs to be done.

# Coding Conventions

-   Use the MDN (Mozilla Developer Network) Documentation regarding JavaScript coding conventions and styling, however, we will be frequently using the shorthand ES8 syntax which allows for inline functions to be written and passed around as first-class objects.

-   Avoid using .then() style promises, instead use the async/await syntax.

-   Generally use the boiler-plated code rather than developing new modules, it has intentionally been organised in such a way that it is easily extensible with further functionality without compromising the readability of the code.

-   I (Bryce) suggest using VS Code with the following extensions in order to develop this project:

    -   Code Spell Checker
    -   GitLens
    -   IntelliCode
    -   Jest
    -   Prettier
    -   React Native Tools
    -   Simple React Snippets
    -   To do Tree
    -   vscode-pdf
    -   Better Comments

-   Use TODO(): in order to leave notes for your team mates or yourself for work that needs to be completed FIX: and HACK: are also suitable, although preferentially try to use TODO as opposed to the other comment styles unless it is necessary for understanding

-   Everything we're working on is intentionally quite modularised. To add new pages add a new subfolder in src/ with the name of the module that you're going to be adding and include one js and one css file in this folder. If there are any globally useful functions move them into the src/common/ subfolder

-   Almost exclusively use `let`, there's very few reasons to use `var`: https://stackoverflow.com/questions/762011/what-is-the-difference-between-let-and-var

<!-- TODO(BryceTuppurainen): Add front-end coding conventions here -->
