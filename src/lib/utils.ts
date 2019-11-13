/**
 * [getType description]
 *
 * @param   {any}     param  要判断的数据
 *
 * @return  {string}  类型字符串
 */
export function getType(param:any): string {

  return Object.prototype.toString.call(param).toLowerCase().match(/\s(\S+?)\]/)[1];
  
}

export function toArray<T>(arrayLike: any): T[] {
  return [].slice.call(arrayLike);
}
