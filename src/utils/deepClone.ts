/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
export function deepClone(obj: any) {
    let newObj: any
    try {
        //如果obj有push方法则 定义newObj为数组，否则为对象。
        newObj = obj.push ? [] : {}
    } catch (error) {
        newObj = {}
    }
    for (let attr in obj) {
        if (typeof obj[attr] === 'object') {
            newObj[attr] = deepClone(obj[attr]);
        } else {
            newObj[attr] = obj[attr];
        }
    }
    return newObj;
}