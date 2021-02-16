/* ===== 1. Create a Hashmap class =====
Walk through the HashMap implementation in the curriculum and understand it well. Then write a HashMap class and its core functions with open addressing as the collision resolution mechanism.
Export your HashMap module
*/
class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0
        this._hashTable = []
        this._capacity = initialCapacity
        this._deleted = 0
    }
    static _hashString(string) {
        let hash = 5381
        for(let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i)
            hash = hash & hash
        }
        return hash >>> 0
    }
    get(key) {
        const index = this._findSlot(key) 
        if(this._hashTable[index] === undefined) {
            throw new Error('key error')
        }
        return this._hashTable[index].value
    }
    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity
        if(loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO)
        }
        const index = this._findSlot(key)
        if(!this._hashTable[index]) {
            this.length++
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        }
    }
    _findSlot(key) {
        const hash = HashMap._hashString(key)
        const start = hash % this._capacity
        for(let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity
            const slot = this._hashTable[index]
            if(slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index
            }
        }
    }
    _resize(size) {
        const oldSlots = this._hashTable
        this._capacity = size
        this.length = 0
        this._deleted = 0
        this._hashTable = []
        for(const slot of oldSlots) {
            if(slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value)
            }
        }
    }
    delete(key) {
        const index = this._findSlot(key)
        const slot = this._hashTable[index]
        if(slot === undefined) {
            throw new Error('key error')
        }
        slot.DELETED = true
        this.length--
        this._deleted++
    }
}



module.exports = {HashMap}