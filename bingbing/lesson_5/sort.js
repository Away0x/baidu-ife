const sortType = (type, a, b) => type ? a > b : a < b

// 冒泡排序 : type(true: 正序, false: 倒序) ; sortFn(排序时的回调)
// sortEndFn(排序结束时的回调)
// 原理: 比较相邻元素，如比较结果不满足要求，则调换位置
const bubbleSort = (list, type=true, sortFn, sortEndFn) => {
  const len = list.length

  if (len === 1) return list
  console.time('冒泡排序耗时')
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      const a = list[j], b = list[j + 1]

      if ( sortType(type, a, b) ) { // 比较结果不满足要求，相邻元素调换位置
        ;[list[j], list[j + 1]] = [b, a]
        sortFn && sortFn(list, a, b)
      }
    }
  }
  sortEndFn && sortEndFn(list)
  console.timeEnd('冒泡排序耗时')
  return list
}


// 快速排序
const quickSort = (arr, type=true, sortFn, sortEndFn) => {
  if (arr.length === 1) { // 递归停止条件
    sortEndFn && sortEndFn(arr)
    return arr
  }
  // 选取基准值
  const
    pivotIndex = Math.ceil(arr.length / 2),
    pivot      = arr.splice(pivotIndex, 1)[0] // 基准值
  let left = [], right = []

  // 如果大于基准值，移到数组right中；小于基准的值，移到数组left中
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    sortFn && sortFn(arr, pivot, item)
    sortType(type, item, pivot) ? right.push(item) : left.push(item)
  }

  return quickSort(left, type).concat([pivot], quickSort(right, type))
}

// 堆排序

// 希尔排序

// 归并排序

// 基数排序

// 选择排序
const selectionSort = (list, type=true, sortFn, sortEndFn) => {
  const len = list.length
  let targetIndex, temp

  if (len === 1) return list
  console.time('选择排序耗时')
  for (let i = 0; i < len - 1; i++) {
    targetIndex = i
    for (let j = i + 1; j < len; j++) {
      //寻找最小/最大的数，将其索引保存
      if ( sortType(type, list[targetIndex], list[j]) ) targetIndex = j
    }
    const a = list[targetIndex], b = list[i]

    ;[list[i], list[targetIndex]] = [a, b]
    sortFn && sortFn(list, a, b)
  }
  sortEndFn && sortEndFn(list)
  console.timeEnd('选择排序耗时')
  return list;
}
// 插入排序
