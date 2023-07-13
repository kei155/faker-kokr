import { expect } from 'chai'
import * as faker from '../dist/index'
import { describe, it } from 'mocha'

describe('number', () => {
  it('무작위 digit 생성', () => {
    expect(faker.number.digit()).to.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
  it('해결할 수 없는 무작위 digit 생성', () => {
    expect(() => faker.number.digit([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).to.throw(RangeError)
  })

  it('조건범위 4 ~ 4 integer 생성', () => {
    expect(faker.number.integer(4, 4)).to.equal(4)
  })

  it('조건범위 -10 ~ 10 integer 생성', () => {
    expect(faker.number.integer(-10, 10)).to.gte(-10).lte(10)
  })

  it('조건범위 -10 ~ 10 unsigned integer 생성', () => {
    expect(faker.number.unsignedInteger(-10, 10)).to.gte(-10).lte(10)
  })
})

describe('text', () => {
  it('무작위 단어 생성', () => {
    expect(faker.text.word()).to.not.match(/\s/)
    expect(faker.text.word()).to.be.a('string')
  })

  it('무작위 단어배열 생성', () => {
    expect(faker.text.words(3)).to.be.length(3)
    expect(faker.text.words(15)).to.be.length(15)
  })

  it('무작위 문장 배열 생성', () => {
    expect(faker.text.paragraphs(3)).to.be.length(3)
    expect(faker.text.paragraphs(15)).to.be.length(15)
  })
})
