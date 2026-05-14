import { test } from "node:test"
import assert from "node:assert/strict"

import { slugify, toRoman } from "./types"

test("toRoman 0-indexed positions 0..9 produce I..X", () => {
  assert.equal(toRoman(0), "I")
  assert.equal(toRoman(1), "II")
  assert.equal(toRoman(2), "III")
  assert.equal(toRoman(3), "IV")
  assert.equal(toRoman(4), "V")
  assert.equal(toRoman(5), "VI")
  assert.equal(toRoman(6), "VII")
  assert.equal(toRoman(7), "VIII")
  assert.equal(toRoman(8), "IX")
  assert.equal(toRoman(9), "X")
})

test("toRoman with negative position returns empty string", () => {
  assert.equal(toRoman(-1), "")
})

test("slugify lowercases and hyphenates", () => {
  assert.equal(slugify("Victoria Falls"), "victoria-falls")
  assert.equal(slugify("Okavango Delta"), "okavango-delta")
  assert.equal(slugify("Cape Town"), "cape-town")
})

test("slugify strips non-alphanumeric and trims dashes", () => {
  assert.equal(slugify("  Chobe!  "), "chobe")
  assert.equal(slugify("Mosi-oa-Tunya"), "mosi-oa-tunya")
})

test("slugify returns 'chapter' fallback for empty input", () => {
  assert.equal(slugify(""), "chapter")
  assert.equal(slugify("!!!"), "chapter")
})
