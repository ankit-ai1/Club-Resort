export type SplitType = "chars" | "words" | "lines";

export interface SplitResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  revert: () => void;
}

/**
 * A minimal, dependency-free stand-in for GSAP's paid SplitText plugin.
 * Walks the element's rendered DOM (so it preserves any nested styled
 * spans, e.g. a gradient-colored word), wraps runs of text in
 * char/word spans, and — for "lines" — measures offsetTop to group
 * words into their actual rendered line, then masks each line.
 */
export function splitText(el: HTMLElement, types: SplitType[] = ["chars"]): SplitResult {
  const originalHTML = el.innerHTML;
  const chars: HTMLElement[] = [];
  const words: HTMLElement[] = [];
  const lines: HTMLElement[] = [];

  const wantsChars = types.includes("chars");
  const wantsLines = types.includes("lines");

  function wrapText(text: string): DocumentFragment {
    const frag = document.createDocumentFragment();
    const tokens = text.split(/(\s+)/);
    tokens.forEach((token) => {
      if (!token) return;
      if (/^\s+$/.test(token)) {
        frag.appendChild(document.createTextNode(token));
        return;
      }
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      if (wantsChars) {
        token.split("").forEach((ch) => {
          const charOuter = document.createElement("span");
          charOuter.style.display = "inline-block";
          charOuter.style.overflow = "hidden";
          charOuter.style.verticalAlign = "top";
          const charInner = document.createElement("span");
          charInner.style.display = "inline-block";
          charInner.style.willChange = "transform";
          charInner.textContent = ch;
          charOuter.appendChild(charInner);
          wordSpan.appendChild(charOuter);
          chars.push(charInner);
        });
      } else {
        wordSpan.style.willChange = "transform";
        wordSpan.textContent = token;
      }
      words.push(wordSpan);
      frag.appendChild(wordSpan);
    });
    return frag;
  }

  function walk(node: Node) {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = wrapText(child.textContent || "");
        child.parentNode?.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        // data-no-split escape hatch — e.g. gradient-clipped text, whose
        // background-clip:text rendering breaks once split across inline-block spans.
        if ((child as HTMLElement).hasAttribute("data-no-split")) return;
        walk(child);
      }
    });
  }

  walk(el);

  if (wantsLines && words.length) {
    const buckets: { top: number; words: HTMLElement[] }[] = [];
    words.forEach((w) => {
      const top = w.offsetTop;
      let bucket = buckets.find((b) => Math.abs(b.top - top) < 2);
      if (!bucket) {
        bucket = { top, words: [] };
        buckets.push(bucket);
      }
      bucket.words.push(w);
    });
    buckets.sort((a, b) => a.top - b.top);
    buckets.forEach((bucket) => {
      const first = bucket.words[0];
      const lineOuter = document.createElement("span");
      lineOuter.style.display = "block";
      lineOuter.style.overflow = "hidden";
      const lineInner = document.createElement("span");
      lineInner.style.display = "block";
      first.parentNode?.insertBefore(lineOuter, first);
      lineOuter.appendChild(lineInner);
      bucket.words.forEach((w) => lineInner.appendChild(w));
      lines.push(lineInner);
    });
  }

  return {
    chars,
    words,
    lines,
    revert: () => {
      el.innerHTML = originalHTML;
    },
  };
}
