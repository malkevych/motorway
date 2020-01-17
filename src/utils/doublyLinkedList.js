/* eslint-disable max-classes-per-file */
/**
 * @fileoverview Doubly linked list implementation in JavaScript
 */

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
const head = Symbol('head');
const tail = Symbol('tail');

/**
 * Represents a single node in a DoublyLinkedList.
 * @class DoublyLinkedListNode
 */
class DoublyLinkedListNode {
    /**
     * Creates a new instance of DoublyLinkedListNode.
     * @param {*} data The data to store in the node. 
     */
    constructor(data) {
        /**
         * The data that this node stores.
         * @property data
         * @type *
         */
        this.data = data;

        /**
         * A pointer to the next node in the DoublyLinkedList.
         * @property next
         * @type ?DoublyLinkedListNode
         */
        this.next = null;

        /**
         * A pointer to the previous node in the DoublyLinkedList.
         * @property previous
         * @type ?DoublyLinkedListNode
         */
        this.previous = null;
    }
}

/**
 * A doubly linked list implementation in JavaScript.
 * @class DoublyLinkedList
 */
class DoublyLinkedList {
    /**
     * Creates a new instance of DoublyLinkedList
     */
    constructor() {
        /**
         * Pointer to first node in the list.
         * @property head
         * @type ?DoublyLinkedListNode
         * @private
         */
        this[head] = null;

        /**
         * Pointer to last node in the list.
         * @property tail
         * @type ?DoublyLinkedListNode
         * @private
         */
        this[tail] = null;
    }

    /**
     * Returns head of the list.
     * @returns {DoublyLinkedListNode}
     */
    head() {
        return this[head];
    }

    /**
     * Appends some data to the end of the list.
     * @param {*} data The data to add to the list.
     * @returns {DoublyLinkedListNode}
     */
    add(data) {
        /*
         * Create a new list node object and store the data in it.
         * This node will be added to the end of the existing list.
         */
        const newNode = new DoublyLinkedListNode(data);

        // special case: no nodes in the list yet
        if (this[head] === null) {
            /*
             * Because there are no nodes in the list, just set the
             * `this[head]` pointer to the new node.
             */
            this[head] = newNode;
        } else {
            /*
             * Unlike in a singly linked list, we have a direct reference to
             * the last node in the list. Set the `next` pointer of the
             * current last node to `newNode` in order to append the new data
             * to the end of the list. Then, set `newNode.previous` to the current
             * tail to ensure backwards tracking work.
             */
            this[tail].next = newNode;
            newNode.previous = this[tail];
        }

        /*
         * Last, reset `this[tail]` to `newNode` to ensure we are still
         * tracking the last node correctly.
         */
        this[tail] = newNode;
        return newNode;
    }

    /**
     * Inserts some data into the middle of the list. This method traverses
     * the existing list and places the data in a new node at a specific index.
     * @param {*} data The data to add to the list.
     * @param {int} index The zero-based index at which to insert the data.
     * @returns {DoublyLinkedListNode}
     * @throws {RangeError} If the index doesn't exist in the list.
     */
    insertBefore(data, index) {
        /*
         * Create a new list node object and store the data in it.
         * This node will be inserted into the existing list.
         */
        const newNode = new DoublyLinkedListNode(data);
        // special case: no nodes in the list yet
        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * Special case: if `index` is `0`, then no traversal is needed
         * and we need to update `this[head]` to point to `newNode`.
         */
        if (index === 0) {
            /*
             * Ensure the new node's `next` property is pointed to the current
             * head.
             */
            newNode.next = this[head];

            /*
             * The current head's `previous` property needs to point to the new
             * node to ensure the list is traversable backwards.
             */
            this[head].previous = newNode;

            /*
             * Now it's safe to set `this[head]` to the new node, effectively
             * making the new node the first node in the list.
             */
            this[head] = newNode;
        } else {
            /*
             * The `current` variable is used to track the node that is being
             * used inside of the loop below. It starts out pointing to
             * `this[head]` and is overwritten inside of the loop.
             */
            let current = this[head];

            /*
             * The `i` variable is used to track how deep into the list we've
             * gone. This important because it's the only way to know when
             * we've hit the `index` to insert into.
             */
            let i = 0;

            /*
             * Traverse the list nodes using `next` pointers, and make
             * sure to keep track of how many nodes have been visited. When
             * `i` is the same as `index`, it means we've found the location to
             * insert the new data.
             */
            while ((current.next !== null) && (i < index)) {
                current = current.next;
                i += 1;
            }
            /*
             * At this point, `current` is either the node to insert the new data
             * before, or the last node in the list. The only way to tell is if
             * `i` is still less than `index`, that means the index is out of range
             * and an error should be thrown.
             */
            if (i < index) {
                throw new RangeError(`Index ${index} does not exist in the list.`);
            }

            /*
             * If code continues to execute here, it means `current` is the node
             * to insert new data before.
             * 
             * First, insert `newNode` after `current.previous` by updating
             * `current.previous.next` and `newNode.previous`.
             */
            current.previous.next = newNode;
            newNode.previous = current.previous;

            /*
             * Next, insert `current` after `newNode` by updating `newNode.next` and
             * `current.previous`.
             */
            newNode.next = current;
            current.previous = newNode;
        }
        return newNode;
    }

    /**
     * Inserts some data into the middle of the list. This method traverses
     * the existing list and places the data in a new node after a specific index.
     * @param {*} data The data to add to the list.
     * @param {int} index The zero-based index after which to insert the data.
     * @returns {DoublyLinkedListNodes}
     * @throws {RangeError} If the index doesn't exist in the list.
     */
    insertAfter(data, index) {
        /*
         * Create a new list node object and store the data in it.
         * This node will be inserted into the existing list.
         */
        const newNode = new DoublyLinkedListNode(data);
        // special case: no nodes in the list yet
        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * The `current` variable is used to track the node that is being
         * used inside of the loop below. It starts out pointing to
         * `this[head]` and is overwritten inside of the loop.
         */
        let current = this[head];

        /*
         * The `i` variable is used to track how deep into the list we've
         * gone. This important because it's the only way to know when
         * we've hit the `index` to insert into.
         */
        let i = 0;

        /*
         * Traverse the list nodes similar to the `add()` method, but make
         * sure to keep track of how many nodes have been visited and update
         * the `previous` pointer in addition to `current`. When
         * `i` is the same as `index`, it means we've found the location to
         * insert the new data.
         */
        while ((current !== null) && (i < index)) {
            current = current.next;
            i += 1;
        }

        /*
         * At this point, `current` is either the node to insert the new data
         * before, or the last node in the list. The only way to tell is if
         * `i` is still less than `index`, that means the index is out of range
         * and an error should be thrown.
         */
        if (i < index) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * If code continues to execute here, it means `current` is the node
         * to insert new data after.
         */
        // special case: `current` is the tail, so reset `this[tail]`
        if (this[tail] === current) {
            this[tail] = newNode;
        } else {
            /* 
             * Otherwise, insert `newNode` before `current.next` by updating
             * `current.next.previous` and `newNode.node`.
             */
            current.next.previous = newNode;
            newNode.next = current.next;
        }

        /*
         * Next, insert `newNode` after `current` by updating `newNode.previous` and
         * `current.next`.
         */
        newNode.previous = current;
        current.next = newNode;
        return newNode;
    }

    /**
     * Retrieves the data in the given position in the list.
     * @param {int} index The zero-based index of the node whose data 
     *      should be returned.
     * @returns {*} The data in the "data" portion of the given node
     *      or undefined if the node doesn't exist.
     */
    getData(index) {
        // ensure `index` is a positive value
        if (index > -1) {
            /*
             * The`current` variable is used to track the node that is being
             * used inside of the loop below. It starts out pointing to
             * `this[head]` and is overwritten inside of the loop.
             */
            let current = this[head];

            /*
             * The `i` variable is used to track how deep into the list we've
             * gone. This is important because it's the only way to know when
             * we've hit the `index` to insert into.
             */
            let i = 0;

            /*
             * Traverse the list nodes, but make sure to keep track of how many
             * nodes have been visited and update the `previous` pointer in
             * addition to `current`. When `i` is the same as `index`, it means
             * we've found the location to insert the new data.
             */
            while ((current !== null) && (i < index)) {
                current = current.next;
                i += 1;
            }

            /*
             * At this point, `current` might be null if we've gone past the
             * end of the list. In that case, we return `undefined` to indicate
             * that the node at `index` was not found. If `current` is not
             * `null`, then it's safe to return `current.data`.
             */
            return current !== null ? current.data : undefined;
        }
        return undefined;
    }

    /**
     * Retrieves the index of the data in the list.
     * @param {*} data The data to search for.
     * @returns {int} The index of the first instance of the data in the list
     *      or -1 if not found.
     */
    indexOfData(data) {
        /*
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this[head];

        /*
         * The `index` variable is used to track how deep into the list we've
         * gone. This is important because this is the value that is returned
         * from this method.
         */
        let index = 0;

        /*
         * This loop checks each node in the list to see if it matches `data`.
         * If a match is found, it returns `index` immediately, exiting the
         * loop because there's no reason to keep searching. The search
         * continues until there are no more nodes to search (when `current` is `null`).
         */
        while (current !== null) {
            if (current.data === data) {
                return index;
            }

            // traverse to the next node in the list
            current = current.next;

            // keep track of where we are
            index += 1;
        }

        /*
         * If execution gets to this point, it means we reached the end of the
         * list and didn't find `data`. Just return -1 as the "not found" value.
         */
        return -1;
    }

    /**
     * Removes all nodes from the list.
     * @returns {void}
     */
    clear() {
        // just reset both the head and tail pointer to null
        this[head] = null;
        this[tail] = null;
    }

    /**
     * Returns the number of nodes in the list.
     * @returns {int} The number of nodes in the list.
     */
    get size() {
        // special case: the list is empty
        if (this[head] === null) {
            return 0;
        }

        /*
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this[head];

        /*
         * The `count` variable is used to keep track of how many nodes have
         * been visited inside the loop below. This is important because this
         * is the value to return from this method.
         */
        let count = 0;

        /*
         * As long as `current` is not `null`, that means we're not yet at the
         * end of the list, so adding 1 to `count` and traverse to the next node.
         */
        while (current !== null) {
            count += 1;
            current = current.next;
        }

        /*
         * When `current` is `null`, the loop is exited at the value of `count`
         * is the number of nodes that were counted in the loop.
         */
        return count;
    }

    /**
     * The default iterator for the class.
     * @returns {Iterator} An iterator for the class.
     */
    [Symbol.iterator]() {
        return this.values();
    }

    /**
     * Create an iterator that returns each node in the list.
     * @returns {Iterator} An iterator on the list. 
     */
    * values() {
        /*
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this[head];

        /*
         * As long as `current` is not `null`, there is a piece of data
         * to yield.
         */
        while (current !== null) {
            yield current.data;
            current = current.next;
        }
    }

    /**
     * Create an iterator that returns each node in the list in reverse order.
     * @returns {Iterator} An iterator on the list. 
     */
    * reverse() {
        /*
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the tail and is overwritten inside
         * of the loop below.
         */
        let current = this[tail];

        /*
         * As long as `current` is not `null`, there is a piece of data
         * to yield.
         */
        while (current !== null) {
            yield current.data;
            current = current.previous;
        }
    }

    /**
     * Converts the list into a string representation.
     * @returns {String} A string representation of the list.
     */
    toString() {
        return [...this].toString();
    }
}

module.exports = DoublyLinkedList;
