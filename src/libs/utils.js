export function slugify(string) {
    return string
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[-]+/g, "-")
      .replace(/[^\w-]+/g, "");
  }