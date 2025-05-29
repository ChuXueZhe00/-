// 定义三个空数组，分别表示行、列和宫
function check(array) {
    let row = [], column = [], ge = [];
    // 初始化行、列和宫的数组
    for (let i = 0; i < 9; i++) {
        row[i] = [], column[i] = [];
        for (let j = 0; j <= 9; j++) row[i][j] = column[i][j] = false;
    }
    // 初始化宫的数组
    for (let i = 0; i < 3; i++) {
        ge[i] = []
        for (let j = 0; j < 3; j++) {
            ge[i][j] = [];
            for (let k = 0; k <= 9; k++) ge[i][j][k] = false;
        }
    }
    // 遍历数组
    for (let i = 0; i < 81; i++) {
        let t = array[i];
        // 如果当前数字在行、列或宫中存在，返回false
        if (row[parseInt(i / 9)][t] || column[i % 9][t] || ge[parseInt(i / 27)][parseInt(i % 9 / 3)][t]) {
            return false;
        }
        // 将当前数字在行、列或宫中设置为true
        row[parseInt(i / 9)][t] = column[i % 9][t] = ge[parseInt(i / 27)][parseInt(i % 9 / 3)][t] = true;
    }
    // 如果遍历完数组，没有发现冲突，返回true
    return true;
}