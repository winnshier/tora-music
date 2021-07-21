export default {
  // 转换播放量单位
  getPlayCount(value: number):string | number {
    let result: string | number = 0
    if (value < 100000) {
      result = value
    } else if (value < 100000000) {
      result = parseInt(String(value / 10000)) + '万'
    } else if (value >= 100000000) {
      result = parseInt(String(value / 100000000)) + '亿'
    }
    return result
  }
}