const {HashMap} = require('./hashmap')

/* ===== 1. Create a HashMap class ===== 
Create a .js file called HashMaps_drills. In the file import the HashMap module. 
Create a function called main()
Inside your main() function, create a hash map called lotr.
For your hash map that you have created, set the MAX_LOAD_RATIO = 0.5 and SIZE_RATIO = 3.
Add the following items to your hash map: {"Hobbit": "Bilbo"}, {"Hobbit": "Frodo"},
{"Wizard": "Gandalf"}, {"Human": "Aragorn"}, {"Elf": "Legolas"}, {"Maiar": "The Necromancer"},
{"Maiar": "Sauron"}, {"RingBearer": "Gollum"}, {"LadyOfLight": "Galadriel"}, {"HalfElven": "Arwen"},
{"Ent": "Treebeard"}
*/
HashMap.MAX_LOAD_RATIO = 0.5
HashMap.SIZE_RATIO = 3

function main() {
    const lotr = new HashMap()
    lotr.set('Hobbit', 'Bilbo')
    lotr.set('Hobbit', 'Frodo')
    lotr.set('Wizard', 'Gandalf')
    lotr.set('Human', 'Aragorn')
    lotr.set('Elf', 'Legolas')
    lotr.set('Maiar', 'The Necromancer')
    lotr.set('Maiar', 'Sauron')
    lotr.set('RingBearer', 'Gollum')
    lotr.set('LadyOfLight', 'Galadriel')
    lotr.set('HalfElven', 'Arwen')
    lotr.set('Ent', 'Treebeard')
    console.log(lotr)
    //length: 9
    //my length is less than the number of key/values that I set because some of the keys were not unique which just replaced the values.
    console.log(lotr.get('Maiar'))//output: 'Sauron'. This is the most recent value set for the key of 'Maiar'
    console.log(lotr.get('Hobbit'))//output: 'Frodo'. This is the most recent value set for the key of 'Hobbit'
    //capacity: 24 (We set more than 4 key/value pairs (8(capacity) * 50%) so 8(capacity) * 3(size_ratio) = 24)
}
main()

/* ===== 2. WhatDoesThisDo =====
DO NOT run the following code before solving the problem.
What is the output of the following code? explain your answer.
const WhatDoesThisDo = function(){

    //create a new hashmap and set 2 key/value pairs
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);

    //create a second new hashmap and set 2 key/value pairs
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    //print out str1 key/value from the first hashmap
    console.log(map1.get(str1));//output: "Hello World.": 20 >> str1 & str2 are the same, so the value will be the most recent assignment

    //print out str3 key/value from the second hashmap
    console.log(map2.get(str3));//output: "Hello World.": 10 >> str3 & str4 are the same, so the valeu will be the most recent assignment
}
*/

/* ===== 3. Demonstrate understanding of Hash maps =====
*You don't need to write code for the following two drills. use any drawing app or simple pen and paper *

1) Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 into a hash map of length 11 using open addressing and a hash function k mod m, where k is the key and m is the length.           
10 mod 11 = 1
22 mod 11 = 0
31 mod 11 = 9
4 mod 11 = 4
15 mod 11 = 4
28 mod 11 = 6
17 mod 11 = 6
88 mod 11 = 0
59 mod 11 = 4
i: 0   1   2   3   4   5   6   7   8   9   10
k: 22  10  88 Null 4   15  28  17  59  null 31        

2) Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with collisions resolved by separate chaining. Let the hash table have a length m = 9, and let the hash function be k mod m.
5 % 9 = 5
28 % 9 = 1
19 % 9 = 1
15 % 9 = 6
20 % 9 = 2
33 % 9 = 6
12 % 9 = 3
17 % 9 = 8
10 % 9 = 1
i: 0   1   2   3   4   5   6   7   8   
k:null     20  12 null 5      null 17  
       28                  15
       19                  33
       10
*/

/* ===== 4. Remove duplicates =====
Implement a function to delete all duplicated characters in a string and keep only the first occurrence of each character. For example, if the input is string “google”, the result after deletion is “gole”. Test your program with a sentence as well such as "google all that you think can think of".
*/
function removeDuplicates(string) {
    const newMap = new HashMap()
    let newString = ''
    for(let i = 0; i < string.length; i++) {
        try {
            newMap.get(string[i])
        } catch (e) {
            newMap.set(string[i], '')
            newString = newString + string[i]
        }
    }
    console.log(newString)
    return newString
}
removeDuplicates('google all that you think can think of')//output: 'gole athyuinkcf'

/* ===== 5. Any permutation a palindrome =====
Write an algorithm to check whether any anagram of some string is a palindrome. Given some string, "acecarr", the algorithm should return true, because the letters in "acecarr" can be rearranged to the anagram "racecar", which itself is a palindrome. In contrast, given the word "north", the algorithm should return false, because there's no anagram for "north" that would be a palindrome.
*/
function palindrome(string) {
    let newMap = new HashMap()
    let str = string.toLowerCase()
    for(let i = 0; i < str.length; i++) {
        try {
            newMap.delete(str[i])
        } catch (e) {
            newMap.set(str[i], '')
        }
    } 
    // string will be a palindrome if 1 or 0 letters are unique
    if(newMap.length <= 1) {
        console.log(true)
        return true
    } else {
        console.log(false)
        return false
    }
}
palindrome('acecarr')//output: true
palindrome('north')//output: false

/* ===== 6. Anagram grouping =====
Write an algorithm to group a list of words into anagrams. For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].
*/
function anagramGrouping(array) {
    let newMap = new HashMap()
    let results = []
    array.forEach(word => {
        //alphabetize each individual word
        let sorted = word.split('').sort().join('')
        try {
            let index = newMap.get(sorted)
            results[index].push(word)
        } catch (e) {
            newMap.set(sorted, results.length)
            results.push([word])
        }
    })
    console.log(results)
    return results
}
anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'])//[ [ 'east', 'teas', 'eats' ], [ 'cars', 'arcs' ], [ 'acre', 'race' ] ]



