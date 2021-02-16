/* ===== 7. Separate Chaining Hash Map =====
Write another hash map implementation as above, but use separate chaining as the collision resolution mechanism.
Test your hash map with the same values from the lotr hash map.
*/

class _Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}
class HashMap {
    constructor() {
        this._hashTable = []
    }
    set(value) {
        let key = HashMap._hashString(value)
        let node = new _Node(value)
        if (this._hashTable[key]) {
            node.next = this._hashTable[key]
        }
        this._hashTable[key] = node;
    }
    get(key) {
        let hash = HashMap._hashString(key)
        let chain = this._hashTable[hash]
        if (!this._hashTable[hash]) {
            return null
        }
        if (chain.hasOwnProperty(key)) {
            return chain[key]
        }
        return null
    }
    delete(item) {
        let key = HashMap._hashString(item)
        if (this._hashTable[key]) {
            console.log(this._hashTable[key])
            if (this._hashTable[key].value === item) {
                this._hashTable[key] = this._hashTable[key].next
            } else {
                return null
            }
        }
    }
    static _hashString(string) {
        let hash = 5381
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i)
            hash = hash & hash
        }
        return hash >>> 0
    }
}

HashMap.MAX_LOAD_RATIO = 0.5
HashMap.SIZE_RATIO = 3

function main() {
    const lotr = new HashMap()
    lotr.set("Hobbit", "Bilbo")
    lotr.set("Hobbit", "Frodo")
    lotr.set("Wizard", "Gandalf")
    lotr.set("Human", "Aragorn")
    lotr.set("Elf", "Legolas")
    lotr.set("Maiar", "The Necromancer")
    lotr.set("Maiar", "Sauron")
    lotr.set("RingBearer", "Gollum")
    lotr.set("LadyOfLight", "Galadriel")
    lotr.set("HalfElven", "Arwen")
    lotr.set("Ent", "TreeBeard")
    lotr.delete("Maiar")
    console.log(lotr)
    return lotr
}
main()