/**
 * 工具库
 */
/**
 * 获取数据类型
 *
 * @export
 * @param {*} sender 要判断的数据
 * @returns {string}
 */
export declare function getType(sender: any): string;
/**
 * 获取每个匹配项以及子组，返回的是一个二维数组
 *
 * @export
 * @param {string} content
 * @param {RegExp} reg
 * @returns {string[][]}
 */
export declare function getMatchList(content: string, reg: RegExp): string[][];
