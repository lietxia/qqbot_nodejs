/**
 * @模块 calculator_function.js
 * @描述 计算器核心功能模块，将表达式字符串解析为运算树并递归求值
 */

/* ==== 表达式解析与运算树构建 ==== */

/**
 * 将表达式字符串构建为运算树
 * @param {string} order_string - 数学表达式字符串
 * @returns {Object} 运算树对象，含root/left/right/next字段
 */
function build_cal_tree(order_string) {
if (!match_enclosure(order_string))
return { "root": "NaN" };
if (!valid_operator(order_string))
return { "root": "NaN" };
order_string = change_i_to_alg(order_string);
console.log(order_string);
let cal_tree = [[{ "root": "" }]];
let stack_place = 0;
let enclosure_place = 0;
for (let i = 0; i < order_string.length; ++i)
switch (order_string[i]) {
case "+":
while (cal_tree[enclosure_place].length > 1)
cal_tree[enclosure_place][cal_tree[enclosure_place].length - 2]["right"] = JSON.parse(JSON.stringify(cal_tree[enclosure_place].pop()));
cal_tree[enclosure_place][0]["left"] = JSON.parse(JSON.stringify(cal_tree[enclosure_place][0]));
delete cal_tree[enclosure_place][0]["next"];
cal_tree[enclosure_place][0]["root"] = order_string[i];
stack_place = 1;
cal_tree[enclosure_place][stack_place] = { "root": "" };
break;
case "-":
if (cal_tree[enclosure_place].length === 1 && cal_tree[enclosure_place][0]["root"] === "")
cal_tree[enclosure_place][0]["root"] += order_string[i]
else {
while (cal_tree[enclosure_place].length > 1)
cal_tree[enclosure_place][cal_tree[enclosure_place].length - 2]["right"] = JSON.parse(JSON.stringify(cal_tree[enclosure_place].pop()));
cal_tree[enclosure_place][0]["left"] = JSON.parse(JSON.stringify(cal_tree[enclosure_place][0]));
delete cal_tree[enclosure_place][0]["next"];
cal_tree[enclosure_place][0]["root"] = order_string[i];
stack_place = 1;
cal_tree[enclosure_place][stack_place] = { "root": "" };
}
break;
case "*":
case "/":
while ((stack_place > 0) && (cal_tree[enclosure_place][stack_place - 1]["root"] === "*" || cal_tree[enclosure_place][stack_place - 1]["root"] === "/" || cal_tree[enclosure_place][stack_place - 1]["root"] === "^")) {
cal_tree[enclosure_place][stack_place - 1]["right"] = JSON.parse(JSON.stringify(cal_tree[enclosure_place][stack_place]));
stack_place -= 1;
}
cal_tree[enclosure_place][stack_place]["left"] = JSON.parse(JSON.stringify(cal_tree[enclosure_place][stack_place]));
delete cal_tree[enclosure_place][stack_place]["next"];
cal_tree[enclosure_place][stack_place]["root"] = order_string[i];
stack_place += 1;
cal_tree[enclosure_place][stack_place] = { "root": "" };
break;
case "÷":
while ((stack_place > 0) && (cal_tree[enclosure_place][stack_place - 1]["root"] === "*" || cal_tree[enclosure_place][stack_place - 1]["root"] === "/" || cal_tree[enclosure_place][stack_place - 1]["root"] === "^")) {
cal_tree[enclosure_place][stack_place - 1]["right"] = JSON.parse(JSON.stringify(cal_tree[enclosure_place][stack_place]));
stack_place -= 1;
}
cal_tree[enclosure_place][stack_place]["left"] = JSON.parse(JSON.stringify(cal_tree[enclosure_place][stack_place]));
delete cal_tree[enclosure_place][stack_place]["next"];
cal_tree[enclosure_place][stack_place]["root"] = "/";
stack_place += 1;
cal_tree[enclosure_place][stack_place] = { "root": "" };
break;
case "∧":
case "＾":
case "^":
while ((stack_place > 0) && (cal_tree[enclosure_place][stack_place - 1]["root"] === "^")) {
cal_tree[enclosure_place][stack_place - 1]["right"] = JSON.parse(JSON.stringify(cal_tree[enclosure_place][stack_place]));
stack_place -= 1;
}
cal_tree[enclosure_place][stack_place]["left"] = JSON.parse(JSON.stringify(cal_tree[enclosure_place][stack_place]));
delete cal_tree[enclosure_place][stack_place]["next"];
cal_tree[enclosure_place][stack_place]["root"] = "^";
stack_place += 1;
cal_tree[enclosure_place][stack_place] = { "root": "" };
break;
case "!":
case "！":
cal_tree[enclosure_place][stack_place] = { "root": "!", "next": JSON.parse(JSON.stringify(cal_tree[enclosure_place][stack_place])) };
break;
case "(":
if (cal_tree[enclosure_place][stack_place]["root"] !== "")
return { "root": "NaN" };
cal_tree[++enclosure_place] = [{ "root": "" }];
stack_place = 0;
break;
case ")":
while (cal_tree[enclosure_place].length > 1)
cal_tree[enclosure_place][cal_tree[enclosure_place].length - 2]["right"] = JSON.parse(JSON.stringify(cal_tree[enclosure_place].pop()));
stack_place = cal_tree[enclosure_place - 1].length - 1;
cal_tree[enclosure_place - 1][stack_place] = JSON.parse(JSON.stringify(cal_tree[enclosure_place][0]));
enclosure_place -= 1;
cal_tree.pop();
break;
default: cal_tree[enclosure_place][stack_place]["root"] += order_string[i];
}
while (cal_tree[0].length > 1)
cal_tree[0][cal_tree[0].length - 2]["right"] = JSON.parse(JSON.stringify(cal_tree[0].pop()));
return cal_tree[0][0];
}

/* ==== 表达式预处理 ==== */

/**
 * 将表达式中的i替换为(-1)^(1/2)，并处理隐式乘法和负号
 * @param {string} order_string - 原始表达式字符串
 * @returns {string} 处理后的表达式字符串
 */
function change_i_to_alg(order_string) {
let new_string = order_string.replace(/i/g, "(-1)^(1/2)");
for (let i = 0; i < new_string.length; ++i) {
if (i > 0 && new_string[i] === "(" && new_string[i - 1] === "(") {
new_string = new_string.slice(0, i) + "0+" + new_string.slice(i);
i += 2;
continue;
}
if (i > 0 && new_string[i] === "(" && new_string[i - 1] !== "+" && new_string[i - 1] !== "-" && new_string[i - 1] !== "*" && new_string[i - 1] !== "/" && new_string[i - 1] !== "^")
new_string = new_string.slice(0, i) + "*" + new_string.slice(i++);
if (i > 0 && new_string[i] === "-" && (new_string[i - 1] === "+" || new_string[i - 1] === "-" || new_string[i - 1] === "*" || new_string[i - 1] === "/" || new_string[i - 1] === "^" || new_string[i - 1] === "("))
new_string = new_string.slice(0, i) + "0" + new_string.slice(i++);
if (i === 0 && new_string[i] === "-")
new_string = "0" + new_string.slice(i++);
}
return new_string;
}

/**
 * 验证运算符使用是否合法
 * @param {string} order_string - 表达式字符串
 * @returns {boolean} 运算符是否合法
 */
function valid_operator(order_string) {
if (order_string.includes("()"))
return false;
if (order_string[0] === "+" || order_string[0] === "*" || order_string[0] === "/" || order_string[0] === "^" || order_string[0] === "!" || order_string[order_string.length - 1] === "+" || order_string[order_string.length - 1] === "-" || order_string[order_string.length - 1] === "*" || order_string[order_string.length - 1] === "/" || order_string[order_string.length - 1] === "^")
return false;
for (let i = 0; i < order_string.length - 1; ++i) {
if (order_string[i] === "+" || order_string[i] === "-" || order_string[i] === "*" || order_string[i] === "/" || order_string[i] === "^")
if (order_string[i + 1] === "+" || order_string[i + 1] === "-" || order_string[i + 1] === "*" || order_string[i + 1] === "/" || order_string[i + 1] === "^" || order_string[i + 1] === "!")
return false;
else
++i;
if (order_string[i] === "!" && order_string[i + 1] !== "+" && order_string[i + 1] !== "-" && order_string[i + 1] !== "*" && order_string[i + 1] !== "/" && order_string[i + 1] !== "!" && order_string[i + 1] !== ")")
return false;
}
return true;
}

/**
 * 检查括号是否匹配
 * @param {string} order_string - 表达式字符串
 * @returns {boolean} 括号是否匹配
 */
function match_enclosure(order_string) {
let enclosure_amount = 0;
for (let i = 0; i < order_string.length; ++i)
switch (order_string[i]) {
case "(": ++enclosure_amount; break;
case ")": --enclosure_amount; if (enclosure_amount < 0) return false; break;
}
if (enclosure_amount > 0)
return false;
return true;
}

/* ==== 运算树求值 ==== */

/**
 * 递归计算运算树
 * @param {Object} cal_tree - 运算树对象
 * @returns {Object} 代数数结果对象
 */
function calculate_tree(cal_tree) {
if (Date.now() - calculator_start_time > Max_cal_time)
return { "base": {}, "coefficient": ["NaN", "NaN"] };
switch (cal_tree["root"]) {
case "+": return algebraic_add(calculate_tree(cal_tree["left"]), calculate_tree(cal_tree["right"]));
case "-": return algebraic_minus(calculate_tree(cal_tree["left"]), calculate_tree(cal_tree["right"]));
case "*": return algebraic_multiply(calculate_tree(cal_tree["left"]), calculate_tree(cal_tree["right"]));
case "/": return algebraic_divide(calculate_tree(cal_tree["left"]), calculate_tree(cal_tree["right"]));
case "^": return algebraic_power(calculate_tree(cal_tree["left"]), calculate_tree(cal_tree["right"]));
case "!": return algebraic_factorial(calculate_tree(cal_tree["next"]));
default: return algebraic_define(cal_tree["root"]);
}
}

/*function fibonaci(int_a)
{
let n=parse_if_number(int_a);
calculator_start_time=Date.now();
let fib=[1n,1n];
for(let i=2;i<n;++i)
fib[i]=fib[i-1]+fib[i-2];
return fib[n-1].toString();
let n_1=algebraic_minus(algebraic_define(int_a),algebraic_define("1"));
return algebraic_show(algebraic_divide(algebraic_minus(algebraic_multiply(algebraic_power(fb_root_1,n_1),algebraic_minus(algebraic_define("1"),fb_root_2)),algebraic_multiply(algebraic_power(fb_root_2,n_1),algebraic_minus(algebraic_define("1"),fb_root_1))),algebraic_minus(fb_root_1,fb_root_2)));
}*/