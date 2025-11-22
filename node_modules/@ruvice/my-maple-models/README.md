# 📦 Publishing Guide

This document explains the simple workflow for releasing new versions of this npm package.

---

## 🚀 Releasing a New Version

Follow these steps whenever you want to publish an update to npm.

---

## ✅ 1. Build the package

If the project uses TypeScript or outputs compiled files to `dist/`, you must build before publishing:

```bash
npm run build

npm version patch    # 1.0.0 → 1.0.1
npm version minor    # 1.0.0 → 1.1.0
npm version major    # 1.0.0 → 2.0.0

npm publish --access public
npm publish
