/**
 * @模块 field.js
 * @描述 域和数的结构定义模板，用于代数数域扩张的数据结构
 */

/** 域的结构模板，包含基础域和最小首一多项式 */
field = { "base_field": {}, "min_monic_pol": [] }

/** 数的结构模板，包含所属域和坐标 */
number = { "field": {}, "coordinates": [] }