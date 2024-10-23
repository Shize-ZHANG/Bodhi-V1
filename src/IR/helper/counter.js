/**
 * @author jojo
 * @Date 2024/10/12
 * @Description 为层级结构中的每个对象分配一个唯一的 ID，
 */
class IdMarker{
    // 存储每个层级的id计数器而创建的键值对
    constructor() {
        this._id = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        };
    }
    // 重置计数器
    reset(beginIndex) {
        for (let level = beginIndex; level <= 6; level++) {
            this._id[level] = 0;
        }
    }

    /**
     * @author jojo
     * @param {children: [obj], level: number} obj
     * @description 主函数，递归分配id
     */
    markId(obj) {
        obj.id = this.allocId(obj.level);
        if (obj.children) {
            this.reset(obj.level + 1);
            for (const child of obj.children) {
                this.markId(child)
            }
        }
    }

    allocId(level) {
        const res = this._id[level];
        this._id[level] = res + 1;
        return res
    }

}
export {
    IdMarker
}
