/**
 * @模块 cell_war_log.js
 * @描述 细胞战争游戏的全局状态变量，存储细胞血量、状态、用户数据等
 */

/** @type {number} 当前存活细胞总数 */
total_amount = 0;
/** @type {Array[]} 各细胞种类的血量列表 */
cell_health_list = [];
/** @type {object[]} 各细胞种类的属性状态 */
cell_status = [];
/** @type {object} 用户数据字典，键为QQ号 */
user_dict = {};
/** @type {object} 细胞名字到ID的映射字典 */
cell_dict = {};
/** @type {number} 闪避率 */
miss_chance = 8.79999999999999;
/** @type {number} 减伤比率 */
damage_decrease_ratio = 9.90000000000001;
/** @type {number} 减伤趋势(0-1) */
damage_decrease_trend = 0.55;
/** @type {number} 闪避趋势(0-1) */
miss_chance_trend = 0.48;
/** @type {number} 繁殖率 */
reproduce_rate = 7.299999999999989;
/** @type {number} 繁殖率趋势(0-1) */
reproduce_rate_trend = 0.6;
/** @type {number} 恢复率 */
restore_rate = 7.599999999999974;
/** @type {number} 恢复率趋势(0-1) */
restore_rate_trend = 0.4;
/** @type {number} 当前环境属性(天赋/弱点)索引 */
environment_talent = 2;