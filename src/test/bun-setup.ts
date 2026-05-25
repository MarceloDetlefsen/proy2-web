import '@testing-library/jest-dom/vitest'
import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost',
})

const { window } = dom

globalThis.window = window as unknown as Window & typeof globalThis
globalThis.document = window.document
globalThis.navigator = window.navigator
globalThis.HTMLElement = window.HTMLElement
globalThis.Node = window.Node
globalThis.Event = window.Event
globalThis.CustomEvent = window.CustomEvent
globalThis.getComputedStyle = window.getComputedStyle.bind(window)
globalThis.MutationObserver = window.MutationObserver
globalThis.requestAnimationFrame = window.requestAnimationFrame?.bind(window) ?? ((callback: FrameRequestCallback) => setTimeout(() => callback(Date.now()), 0) as unknown as number)
globalThis.cancelAnimationFrame = window.cancelAnimationFrame?.bind(window) ?? ((handle: number) => clearTimeout(handle))
