// 插入排序
const insert_sort = list => {
  const count = list.length

}
// 冒泡排序 : type(true: p, false: r) ; sortFn(排序时的回调)
const bubbleSort = (arr, type=true, sortFn) => {
  const
    list = copyArray(arr),
    len = list.length,
    sortType = (a, b) => type ? a > b : a < b

  if (len === 1) return list

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      const
        a = list[j],
        b = list[j + 1]

      if ( sortType(a, b) ) {
        [list[j], list[j + 1]] = [b, a]
        sortFn && sortFn(a, b)
      }
    }
  }
  return list
}

// 选择排序

// 快速排序
// const quickSort = (arr) => {
//   const
//     list = copyArray(arr),
// }
// function quickSort(arr) {
//     if (arr.length <= 1) return arr // 递归停止条件
//     // 选取基准值
//     var pivotIndex = Math.ceil(arr.length / 2)
//     var pivot = arr.splice(pivotIndex, 1)[0] // 基准值
//     var left = [], right = []
//     // 如果大于基准值，移到数组right中；小于基准的值，移到数组left中
//     for (var i = 0; i < arr.length; i++)
//         (arr[i] > pivot) ? right.push(arr[i]) : left.push(arr[i])
//     return quickSort(left).concat([pivot], quickSort(right))
// }
// 堆排序

// 希尔排序

// 归并排序

// 基数排序


function swapDiv(elm) {
    var previous = findPrevious(elm);
    if (previous) {
        elm.parentNode.insertBefore(elm, previous);
    }
}
