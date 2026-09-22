# NT Government Design System for web

Welcome to the Northern Territory Government Design System for web repository! If you're utilising assets from this repository, please notify us by sending an email to [websupport@nt.gov.au](mailto:websupport@nt.gov.au) so we can include you in our change management communications list.

## WORK IN PROGRESS

### This is an alpha version and is not production ready

## Who is this for?

This design system is intended for anyone within the Northern Territory Government or for Northern Territory Government contractors developing projects for the government. It serves as a comprehensive collection of UI building blocks, providing a consistent approach for UI and UX designers as well as engineers.

## Getting Started

To quickly get started with the NT Government Design System for web, follow these steps:

### 1. Clone the Repository:

Clone the GIT repository from [https://github.com/ntgovernment](https://github.com/ntgovernment/ntg-web-design-system.git) to your local machine.

#### Key directories:

- **docs:** Documentation of available features/components hosted at nt.gov.au.
- **scss:** Uncompiled SCSS stylesheets used to build themes.
- **ntgbase:** Assets in this folder for NTGov core theme.
- **partials:** NTGov design elements for blending NTGov theme (framework) with Bootstrap (foundation) or one of your own projects.
- **components:** Assets in this folder are for reusable UI components.
- **variables:** Utilising the Bootstrap Utility API, variables for calling NTGov colors based on the NTGov style guide.
- **preflight:** SASS and JS files before minification.
- **dist:** Distribution folder with SASS and minification applied for optimisation.

### 2. Install Dependencies:

Install the following dependencies via NPM (Node Package Manager):

```bash
npm install grunt-contrib --save-dev
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-connect --save-dev
npm install grunt-contrib-cssmin --save-dev
npm install grunt-contrib-sass --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-contrib-watch --save-dev
npm install grunt-css --save-dev
```

### 3. Run Locally:

Once installed, access the localhost environment with 'grunt run'.

## Usage

To integrate the NT Government Design System for web into your projects, follow the guidelines below:

### Import Stylesheets:

Import stylesheets from the scss directory into your project to leverage the design system's visual elements.

### Utilise Components:

Use components from the components folder for efficient development, promoting consistency and reusability.

### Examples

Explore the assets folder for boilerplate code snippets and examples that demonstrate how to use common components that feature within the design system without a CMS.

## Development

We welcome contributions! If you want to participate in the development of the NTGov Design System, follow these guidelines:

### Submit Issues

Submit issues for bug reports, feature requests, or any other feedback.

### Fork and Pull Requests

Fork the repository, make changes, and submit pull requests to contribute to the improvement of the design system.

## Versioning

For the sake of transparency in our release cycle and in adherence to the principles of backward compatibility, the NT Government Design System is meticulously governed by the Semantic Versioning guidelines.

The versioning system is delineated as MAJOR.MINOR.PATCH, with the following delineations:

- **MAJOR version** designates substantial, incompatible global changes.
- **MINOR version** is reserved for significant backward-compatible updates and the introduction of new components.
- **PATCH version** is allocated to minor backward-compatible updates, the inclusion of new component variations, and bug fixes.

This systematic approach to versioning is intended to furnish a structured and predictable framework for the evolution of our design system, prioritising precision and coherence in its progression.

## Changelog

Stay informed about major changes and updates by checking the changelog.

## License

The NT Government Design System for web is licensed under the MIT License. Review the license terms to understand how you can use, modify, and distribute the design system.

## Support

For support, refer to the documentation or reach out to our community forums. If you encounter issues, you can also contact us at [websupport@nt.gov.au](mailto:websupport@nt.gov.au).

## Acknowledgments

We extend our gratitude to the creators and contributors of the projects and libraries that have inspired or supported the NT Government Design System for web.

## Roadmap

Stay tuned for upcoming enhancements and features by checking our roadmap.
