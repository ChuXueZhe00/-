function SuiJi(min, max) {
    //生成一个min到max之间的随机整数
    return Math.floor(Math.random() * (max - min + 1)) + min
}

let td = document.querySelectorAll('td')
let grid = [], rd = [], cnt = 0,limit=getRandom(0,100);
function get() {
    //初始化随机数组
    for (let i = 0; i < 9; i++) {
        rd[i] = i+1;
    }
    //打乱随机数组
    for (let i = 1; i <= 9; i++) {
        let l = getRandom(0, 8), r = getRandom(0, 8);
        let t = rd[l]
        rd[l] = rd[r];
        rd[r] = t;
    }
    //初始化grid数组
    for (let i = 0; i < 9; i++) {
        grid[i] = [];
        for (let j = 0; j < 9; j++) {
            grid[i][j] = -1;
        }
    }
    //grid[0][0] = getRandom(1, 9);
    let board = [], row = [], column = [];
    //初始化board、row、column数组
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i][j] = [];
            for (let k = 0; k <= 9; k++) {
                board[i][j][k] = 0;
            }
        }
    }
    for (let i = 0; i < 9; i++) {
        row[i] = [], column[i] = [];
        for (let j = 0; j <= 9; j++) {
            row[i][j] = column[i][j] = 0;
        }
    }
    //初始化grid[0][0]的值为随机数
    row[0][grid[0][0]] = column[0][grid[0][0]] = board[0][0][grid[0][0]] = 1;
    //深度优先搜索
    dfs(0, 0, row, column, board, grid);
}

function getRandom(l, r) {
    //生成一个l到r之间的随机整数
    return parseInt(Math.random() * (r - l + 1) + l);
}

function dfs(x, y, row, column, board, grid) {
    //递归出口
    if (y == 9) {
        y = 0;
        x++;
    }
    if (x == 9) {
        return ++cnt>100;
    }
   
    //遍历随机数组
    for (let num of rd) {
        //判断当前数字是否可以填入
        if ((!row[x][num]) && (!column[y][num]) && (!board[parseInt(x / 3)][parseInt(y / 3)][num])) {
            //填入数字
            grid[x][y] = num;
            //更新row、column、board数组
            row[x][num] = column[y][num] = board[parseInt(x / 3)][parseInt(y / 3)][num] = 1;
            //递归调用
            if (dfs(x, y + 1, row, column, board, grid)) {
                return true;
            }
            //回溯
            grid[x][y] = -1;
            row[x][num] = column[y][num] = board[parseInt(x / 3)][parseInt(y / 3)][num] = 0;
        }
    }
    return false;
}
get();
console.log(grid);

//将二维数组变成一位数组
let newGrid = [81]
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        newGrid[i * 9 + j] = grid[i][j]
    }
}

//给盒子赋值
let cun = []
for (let i = 0; i < 81; i++) {
    td[i].innerHTML = Number(newGrid[i])
     cun[i] = Number(td[i].innerHTML)
}

//遮盖操作
let quChong = []
let ZuoBiao = []

//随机遮盖45个格子，可手动修改
for (let i = 0; i < 45; i++) {
    let b = document.createElement('input')
    let c = SuiJi(0, td.length - 1)
    //判断随机数是否重复
    if (quChong.includes(c) == false) {
        quChong.push(c)
        //console.log('c:' + c);
        ZuoBiao.push(c)//将遮盖住的td的坐标储存
        td[c].appendChild(b)
    } else {
        i--
    }
}

//将ZuoBiao数组从小到大排序
ZuoBiao.sort((a,b) => a - b)
 
//提交
let input = document.querySelectorAll('input')
let TiJiao = document.querySelector('.Ti')
TiJiao.addEventListener('click',function(){
    for (let i = 0; i < 45; i++) {
        //把input的值添加到相对应的td盒子里
        let t=input[i].value;
        //判断输入是否为数字
        if(t.length == 1&&!isNaN(t)&&Number(t)!=0){
            cun[ZuoBiao[i]] = Number(t)
        }else{
            alert('可能输入的不是数字')
            return;
        }
        
    }
    //判断答案是否正确
    if(check(cun)){
        alert('恭喜你，全部填对了！！')
    }else{
        alert('答案错误！！！')
    }
})

//刷新
let ShuaXin = document.querySelector('.Shua')
ShuaXin.addEventListener('click',function(){
    location.reload()
})