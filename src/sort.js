export function insertionSort(array, fieldName) {
    let { length } = array, items = [];
    let i, j, current;
    while (length--) {
      items[length] = array[length];
    }
  
    for (i = 1; i < length; i++) {
      current = items[i];
      j = i;
      while (j > 0 && getItem(items[j - 1], fieldName) > getItem(current, fieldName)) {
        items[j] = items[j - 1];
        j--;
      }
      items[j] = current;
    }
    return items;
  }
  
  function getItem(item, fieldName) {
    if (fieldName) {
      item = item[fieldName]
    }
    return item;
  }