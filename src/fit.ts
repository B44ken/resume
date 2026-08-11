import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

type Range = { min: number, max: number, step: number }

export type Fit = { fontSize: number, lineHeight: number }

// the printed sheet is us letter, and css uses 96px per inch
export const PAGE_WIDTH = 8.5 * 96
export const PAGE_HEIGHT = 11 * 96

// the ranges the resume is allowed to move within: font size wins first (the
// largest one that still fits a page), then line height is maximised for it
export const FONT_SIZE: Range = { min: 10, max: 16, step: 0.25 }
export const LINE_HEIGHT: Range = { min: 1.15, max: 1.5, step: 0.01 }

const stepCount = (range: Range) => Math.max(0, Math.ceil((range.max - range.min) / range.step))

const valueAt = (range: Range, step: number) => Math.min(range.max, range.min + step * range.step)

const stepUp = (range: Range, value: number) => Math.min(range.max, value + range.step)

// largest value in the range that still fits, falling back to the minimum;
// taller text never fits better, so the predicate can be searched
const largestFitting = (range: Range, fits: (value: number) => boolean) => {
  let low = 0
  let high = stepCount(range)

  while (low < high) {
    const mid = Math.ceil((low + high) / 2)
    if (fits(valueAt(range, mid))) low = mid
    else high = mid - 1
  }

  return valueAt(range, low)
}

const fit = (sheet: HTMLElement, previous: Fit | null): Fit => {
  // the editing chrome does not print, so it must not count towards the page
  const chrome = Array.from(sheet.querySelectorAll<HTMLElement>('[data-chrome]'))
  chrome.forEach(element => { element.style.display = 'none' })

  // measuring at the printed width keeps the result the same no matter how
  // wide the window is; nothing is painted before the width is restored
  const width = sheet.style.width
  sheet.style.width = `${PAGE_WIDTH}px`

  const apply = ({ fontSize, lineHeight }: Fit) => {
    sheet.style.fontSize = `${fontSize}px`
    sheet.style.lineHeight = `${lineHeight}`
    return sheet.getBoundingClientRect().height <= PAGE_HEIGHT
  }

  // most edits do not change what fits, so the previous result is verified
  // first: it is still the answer when growing either value overflows
  const settled = ({ fontSize, lineHeight }: Fit) => {
    if (!apply({ fontSize, lineHeight }))
      return fontSize <= FONT_SIZE.min && lineHeight <= LINE_HEIGHT.min

    return (fontSize >= FONT_SIZE.max || !apply({ fontSize: stepUp(FONT_SIZE, fontSize), lineHeight: LINE_HEIGHT.min }))
      && (lineHeight >= LINE_HEIGHT.max || !apply({ fontSize, lineHeight: stepUp(LINE_HEIGHT, lineHeight) }))
  }

  const search = (): Fit => {
    const fontSize = largestFitting(FONT_SIZE, size => apply({ fontSize: size, lineHeight: LINE_HEIGHT.min }))
    return { fontSize, lineHeight: largestFitting(LINE_HEIGHT, height => apply({ fontSize, lineHeight: height })) }
  }

  const result = previous && settled(previous) ? previous : search()
  apply(result)

  sheet.style.width = width
  chrome.forEach(element => { element.style.removeProperty('display') })

  return result
}

// keeps the resume as large as it can be while staying on a single page
export const useAutoFit = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  const current = useRef<Fit | null>(null)
  const width = useRef(0)

  const refit = useCallback(() => {
    if (ref.current) current.current = fit(ref.current, current.current)
  }, [])

  // any edit can change how much content there is, so refit after every render
  useLayoutEffect(refit)

  useEffect(() => {
    const sheet = ref.current
    if (!sheet) return

    // how wide the sheet is decides how the text wraps, and that can still
    // change after the first paint (stylesheets, window resize)
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect.width === width.current) continue
        width.current = entry.contentRect.width
        refit()
      }
    })
    observer.observe(sheet)

    // fonts change the metrics once they finish loading
    void document.fonts.ready.then(refit)

    return () => observer.disconnect()
  }, [refit])

  return ref
}
