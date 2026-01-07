# 21.1.0 (2026-01-07)

### New features

* iFrame printing

### New features

* Support for Angular 21.

### Bug fixes
* nullpointer defaultSelected

# 20.1.0 (2025-09-01)

### New features

* Can now use `ngx-print` without nonces for inline script.

### Maintenance

* Updated npm dependencies (multiple Dependabot updates).
* Removed unsafe inline script.

# 20.0.0 (2025-07-15)

### New features

* Support for Angular 20.
* Aligned major versions with Angular release versions (library major matches Angular major).

### Maintenance

* Implemented various feature requests and updated npm dependencies.

# 3.1.0 (2025-06-12)

### New features

* Now supports printing on any HTML element, not only button elements.
* Replaced `document.write` usage with DOM manipulation for rendering print content.

### Bug fixes

* Fixed issues related to printing from specific button elements.

# 3.0.0 (2025-05-21)

### New features

* Support for Angular 19.

# 2.0.0 (2024-12-04)

### New features

* Added support for Content-Security-Policy via nonce injection.
* Support for Angular 18.

### Contributors

* Contributions by EpicVoyage and Core121.

# 1.5.1 (2024-01-05)

### New features

* Added support for printing canvas contents.
* Added option to open the print view in a new tab.

### Bug fixes

* Fixed `printTitle` property issue.

### Maintenance

* Documentation updates.

# 1.5.0 (2023-12-03)

* Now supports Angular 17.
* Added printService.

# 1.4.0 (2023-12-03)

* Now supports Angular 16.
* Added functionality to handle select form fields.
* Added standalone support.
* Added `closeWindow` and `bodyClass` options and fixed tests.

# 1.3.1 (2023-01-04)

### Bug fixes

* Fixed build by allowing the package to run in partial Ivy mode due to npm not supporting full Ivy mode, deprecating
  v1.3.0.

# 1.3.0 (2022-12-20)

### New features

* Supports `previewOnly` tag, allowing for the print preview to show without the print dialog.

### Dependency Updates

* Angular Ivy support with Angular 15.

# 1.2.1 (2021-05-10)

### Bug fixes

* Working build for non‑beta releases.

# 1.1.0 (2018-12-04)

### New features

* Support styles (
  CSS) ([#5](https://github.com/selemxmn/ngx-print/issues/5)) ([71cefdf](https://github.com/selemxmn/ngx-print/commit/71cefdf)).
* Permit a dynamic title of printing window instead of the old static
  `Print tab` ([2098f3e](https://github.com/selemxmn/ngx-print/commit/2098f3e)).
