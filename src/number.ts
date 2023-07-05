/**
 * 주어진 수 사이의 무작위 숫자 생성
 * @param min 최소조건
 * @param max 최대조건
 * @param control 후처리 구분
 * - none : 후처리 없음(=float)
 * - floor : 소수점 버림
 * - ceil : 소수점 올림
 * @returns 무작위 숫자
 * @throws 최대조건 값보다 최소조건 값이 클 경우
 */
function between(min: number, max: number, control: 'none' | 'floor' | 'ceil' = 'floor') {
  if (min > max) {
    throw new RangeError(`생성 불가능한 범위입니다(최대조건보다 큰 최소조건)`)
  }
  const generated = Math.random() * (max - min)

  if (control === 'floor') {
    return Math.floor(generated) + min
  }

  if (control === 'ceil') {
    return Math.ceil(generated) + min
  }

  return generated + min
}

/**
 * 0~9 사이의 무작위 숫자 생성
 * @param except 제외할 수 배열
 * @returns 무작위로 생성된 숫자
 * @throws 생성 가능한 수가 없는 경우
 */
function digit(except: number[] = []) {
  if (except.length === 10 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].toString() === except.sort((a, b) => a - b).toString()) {
    throw new RangeError('생성 가능한 수가 없습니다')
  }

  const generated = between(0, 10)

  if (except.indexOf(generated) > -1) {
    return digit(except)
  }

  return generated
}

/**
 * integer 범위의 무작위 수 생성
 * @param min 최소조건
 * @param max 최대조건
 * @returns 무작위 수
 */
function integer(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return between(min, max)
}

/**
 * unsigned integer 범위의 무작위 수 생성
 * @param min 최소조건
 * @param max 최대조건
 * @returns 무작위 수
 *
 * @remarks
 * 최소조건(min)이 첫 번째 파라미터로 오는 게 합리적인지에 대한 의문이 들었다.
 * 특별히 unsigned 숫자값을 요청한다는 시점의 활용도를 생각해보면, 최대조건(max)에만 제한을 걸고 싶은 비율이 많을 것 같다.
 * '10부터 40000 사이의 무작위 숫자'라는 비교적 명확한 범위의 값을 원할 때 굳이굳이 unsignedInteger를 사용할까?
 * 그냥 integer(10, 40000)으로 호출하는 케이스가 더 많지 않겠나?
 * unsignedInteger를 원한다는 것 부터가 '양수'라는 최소조건을 내포하고 있다고 생각된다.
 * 다만, 이 '양수'라는 조건을 0으로 할지 1로 할지가 다소 고민스럽다.
 * - [점수] 데이터를 만들고 싶은 사람은 0이길 기대할 것 => 👤: unsignedInteger(100) 처럼 쓰고싶다
 * - [번호] 데이터를 만들고 싶은 사람은 1이길 기대할 것 => 👤: unsignedInteger(33) 처럼 쓰고싶다
 * '양수' 조건을 0으로 설정할 경우 [번호] 데이터를 만들고 싶은 사람은 0번으로 시작하는 목록을 보고 당황할 수 있고,
 * '양수' 조건을 1로 설정할 경우 [점수] 데이터를 만들고 싶은 사람은 문제를 전부 틀린 사람에 대한 케이스를 잡을 수 없다는 걸 (어쩌면 뒤늦게) 깨닫게 될 수 있다.
 * 그렇다고 파라미터의 순서를 뒤집어 max, min으로 설정하는 것은 integer()와 비슷한 형태지만 파라미터 역할은 완전히 반대가 되어서 더 혼란스럽기만 할 거라고 생각한다.
 */
function unsignedInteger(min = 0, max = Number.MAX_SAFE_INTEGER) {
  return between(Math.max(0, min), max)
}

/**
 * 무작위 float 수 생성
 * @param min 최소조건
 * @param max 최대조건
 * @returns 무작위 float 수
 */
function float(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return between(min, max, 'none')
}

/**
 * unsigned 범위의 무작위 float 수 생성
 * @param min 최소조건
 * @param max 최대조건
 * @returns 무작위 float 수
 */
function unsignedFloat(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return between(Math.max(0, min), max, 'none')
}

export { digit, integer, unsignedInteger, float, unsignedFloat }
