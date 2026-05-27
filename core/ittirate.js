/**
 * @模块 ittirate.js
 * @描述 外观数列（Look-and-Say序列）迭代模块，生成并输出数列的每一项
 */

/** 外观数列当前项 */
basic_string = "1";

/**
 * 生成外观数列的下一项并输出
 * @returns {void}
 */
go_string = () => {
console.log(basic_string);
new_string = "";
amount = 1;
for (let i = 0; i < basic_string.length; ++i)
if (i === basic_string.length - 1 || basic_string[i] != basic_string[i + 1]) { new_string += amount + basic_string[i]; amount = 1; }
else
amount += 1;
basic_string = new_string;
}

/** 定时器ID，用于控制迭代频率 */
ittirateID = setInterval(go_string, 1000);
clearInterval(ittirateID);