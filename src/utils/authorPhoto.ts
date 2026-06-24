import fs from 'node:fs';
import { SITE } from '../consts';

// Whether the author headshot actually exists in public/. The hero, About
// page, and Person schema all gate on this so the build (and the live site)
// degrade cleanly to no-photo if the file hasn't been added yet.
export const authorPhotoExists = fs.existsSync(
  new URL(`../../public${SITE.authorPhoto}`, import.meta.url)
);

/** Absolute URL to the headshot, for use in structured data. */
export const authorPhotoUrl = new URL(SITE.authorPhoto, SITE.url).href;
